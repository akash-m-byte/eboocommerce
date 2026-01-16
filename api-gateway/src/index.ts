import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { requestTracing } from '../../shared/utils/tracing';
import { errorHandler } from '../../shared/middleware/errorHandler';
import { setupGracefulShutdown } from '../../shared/utils/gracefulShutdown';
import { logger } from '../../shared/utils/logger';
import { verifyToken } from './middleware/auth';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(requestTracing);

const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

const limiter = rateLimit({
  windowMs: 60_000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ sendCommand: (...args: string[]) => redis.call(...args) })
});
app.use(limiter);

app.use(errorHandler);

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: verifyToken(req),
      headers: {
        'x-request-id': req.headers['x-request-id'] as string,
        authorization: req.headers.authorization || ''
      }
    }),
    formatError: (err) => {
      logger.error({ error: err }, 'GraphQL error');
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_ERROR'
      };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const port = process.env.PORT || 4000;
  const httpServer = app.listen(port, () => {
    logger.info(`API Gateway running on port ${port}`);
  });

  setupGracefulShutdown(httpServer, async () => {
    await redis.quit();
    await server.stop();
  });
}

start().catch((error) => {
  logger.error({ error }, 'Failed to start server');
  process.exit(1);
});
