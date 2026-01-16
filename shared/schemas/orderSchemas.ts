import { z } from 'zod';

export const checkoutSchema = z.object({
  userId: z.string().uuid(),
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })).min(1)
});
