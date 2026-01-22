import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import router from './routes';
import { requestTracing } from '../../../shared/utils/tracing';
import { logger } from '../../../shared/utils/logger';
import { errorHandler } from '../../../shared/middleware/errorHandler';
import { setupGracefulShutdown } from '../../../shared/utils/gracefulShutdown';
import { setupSwagger } from '../../../shared/utils/swagger';
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(requestTracing);
// Setup Swagger documentation
setupSwagger(app, 'product-service');
app.use('/api', router);
app.use(errorHandler);
const port = process.env.PORT || 4002;
mongoose.connect(process.env.MONGO_URI || '').then(() => {
  const server = app.listen(port, () => {
    logger.info(`Service ${process.env.SERVICE_NAME} listening on port ${port}`);
    logger.info(`API Documentation available at http://localhost:${port}/api/docs`);
  });
  setupGracefulShutdown(server, async () => {
    await mongoose.disconnect();
  });
});