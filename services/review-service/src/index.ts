import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes';
import { requestTracing } from '../../../shared/utils/tracing';
import { logger } from '../../../shared/utils/logger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(requestTracing);

app.use('/api', router);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 4011;
mongoose.connect(process.env.MONGO_URI || '').then(() => {
  app.listen(port, () => {
    logger.info(`Service ${process.env.SERVICE_NAME} listening on port ${port}`);
  });
});
