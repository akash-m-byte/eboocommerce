import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import router from './routes';
import { requestTracing } from '../../../shared/utils/tracing';
import { errorHandler } from '../../../shared/middleware/errorHandler';
import { setupGracefulShutdown } from '../../../shared/utils/gracefulShutdown';
import { logger } from '../../../shared/utils/logger';
import { docsAggregator, type ServiceConfig } from './services/docsAggregator';


const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(requestTracing);

// Serve aggregated docs UI
app.get('/docs', async (_req, res) => {
  const services = docsAggregator.getServices();
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>E-boo API Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .service { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
          .service h3 { margin-top: 0; }
          a { color: #007bff; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>E-boo API Documentation</h1>
        <p>Select a service to view its API documentation:</p>
        ${services.map((s: ServiceConfig) => `
          <div class="service">
            <h3>${s.name}</h3>
            <p><a href="/docs/${s.name}" target="_blank">View Documentation</a></p>
            <p><a href="/docs/${s.name}/swagger.json" target="_blank">OpenAPI JSON</a></p>
          </div>
        `).join('')}
        <div class="service">
          <h3>All Services</h3>
          <p><a href="/api/docs/all" target="_blank">View All Services</a></p>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

app.use('/api', router);

app.use(errorHandler);

const port = process.env.PORT || 4012;
const server = app.listen(port, () => {
  logger.info(`Documentation service listening on port ${port}`);
});

setupGracefulShutdown(server, async () => {
  // Cleanup if needed
});