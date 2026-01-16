import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  images: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional()
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),
  search: z.string().optional(),
  categoryId: z.string().optional()
});
