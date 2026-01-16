import { z } from 'zod';
import { loadEnv } from '../../shared/config/env';

const schema = z.object({
  PORT: z.string(),
  JWT_SECRET: z.string(),
  REDIS_URL: z.string(),
  AUTH_SERVICE_URL: z.string(),
  PRODUCT_SERVICE_URL: z.string(),
  PRICING_SERVICE_URL: z.string(),
  INVENTORY_SERVICE_URL: z.string(),
  CART_SERVICE_URL: z.string(),
  ORDER_SERVICE_URL: z.string(),
  PAYMENT_SERVICE_URL: z.string(),
  SELLER_SERVICE_URL: z.string(),
  SHIPPING_SERVICE_URL: z.string(),
  NOTIFICATION_SERVICE_URL: z.string(),
  REVIEW_SERVICE_URL: z.string()
});

export const env = loadEnv(schema);

