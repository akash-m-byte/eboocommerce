export const appConfig = {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
  },
  bodyParser: {
    limit: process.env.BODY_SIZE_LIMIT || '10mb'
  },
  database: {
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000', 10)
  },
  service: {
    timeout: parseInt(process.env.SERVICE_TIMEOUT || '5000', 10),
    retries: parseInt(process.env.SERVICE_RETRIES || '3', 10)
  }
};
