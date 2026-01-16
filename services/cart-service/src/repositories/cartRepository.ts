import { prisma } from './prisma';

export const cartRepository = {
  findOrCreateCart: async (userId?: string, guestId?: string) => {
    if (!userId && !guestId) throw new Error('userId or guestId is required');
    const where = userId ? { userId } : { guestId };
    const existing = await prisma.cart.findFirst({ where, include: { items: true } });
    if (existing) return existing;
    return prisma.cart.create({ data: { userId, guestId } });
  },
  addItem: (cartId: string, productId: string, quantity: number) =>
    prisma.cartItem.upsert({
      where: { cartId_productId: { cartId, productId } },
      update: { quantity: { increment: quantity } },
      create: { cartId, productId, quantity }
    }),
  updateItem: (cartId: string, productId: string, quantity: number) =>
    prisma.cartItem.update({ where: { cartId_productId: { cartId, productId } }, data: { quantity } }),
  removeItem: (cartId: string, productId: string) =>
    prisma.cartItem.delete({ where: { cartId_productId: { cartId, productId } } }),
  getCart: (userId: string) => prisma.cart.findFirst({ where: { userId }, include: { items: true } })
};
