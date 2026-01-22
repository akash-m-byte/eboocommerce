import { prisma } from './prisma';

/**
 * Cart Repository - Data Access Layer
 * Handles all database operations for carts
 * NO business logic - only database queries
 */
export const cartRepository = {
  /**
   * Find cart by userId or guestId
   */
  findByUserId: (userId: string) =>
    prisma.cart.findFirst({
      where: { userId },
      include: { items: true }
    }),

  findByGuestId: (guestId: string) =>
    prisma.cart.findFirst({
      where: { guestId },
      include: { items: true }
    }),

  /**
   * Create new cart
   */
  create: (data: { userId?: string; guestId?: string }) =>
    prisma.cart.create({
      data,
      include: { items: true }
    }),

  /**
   * Add item to cart
   */
  addItem: (cartId: string, productId: string, quantity: number) =>
    prisma.cartItem.upsert({
      where: { cartId_productId: { cartId, productId } },
      update: { quantity: { increment: quantity } },
      create: { cartId, productId, quantity }
    }),

  /**
   * Update item quantity
   */
  updateItem: (cartId: string, productId: string, quantity: number) =>
    prisma.cartItem.update({
      where: { cartId_productId: { cartId, productId } },
      data: { quantity }
    }),

  /**
   * Remove item from cart
   */
  removeItem: (cartId: string, productId: string) =>
    prisma.cartItem.delete({
      where: { cartId_productId: { cartId, productId } }
    }),

  /**
   * Get cart with items
   */
  findById: (cartId: string) =>
    prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true }
    })
};
