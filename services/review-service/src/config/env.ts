import { z } from 'zod';
import { loadEnv } from '../../../shared/config/env';

type EnvSchema = {
  PORT: string;
  SERVICE_NAME: string;
  LOG_LEVEL?: string;
  REDIS_URL?: string;
  DATABASE_URL?: string;
  MONGO_URI?: string;
};

const schema = z.object({
  PORT: z.string(),
  SERVICE_NAME: z.string(),
  LOG_LEVEL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  MONGO_URI: z.string().optional()
});

export const env = loadEnv(schema) as EnvSchema;

