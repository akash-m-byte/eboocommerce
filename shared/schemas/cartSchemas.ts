import { z } from 'zod';

export const addToCartSchema = z.object({
  userId: z.string().uuid().optional(),
  guestId: z.string().optional(),
  productId: z.string().min(1),
  quantity: z.number().int().positive()
});

export const updateCartSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().min(1),
  quantity: z.number().int().positive()
});

export const removeFromCartSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().min(1)
});
