import { prisma } from './prisma';

export const inventoryRepository = {
  getStock: (productId: string) => prisma.inventoryItem.findMany({ where: { productId } }),
  reserve: (productId: string, quantity: number, orderId: string) =>
    prisma.reservation.create({
      data: { productId, quantity, orderId, expiresAt: new Date(Date.now() + 15 * 60 * 1000) }
    }),
  release: (orderId: string) => prisma.reservation.deleteMany({ where: { orderId } })
};
