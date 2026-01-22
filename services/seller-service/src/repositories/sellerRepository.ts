import { prisma } from './prisma';

export const sellerRepository = {
  onboard: (userId: string, storeName: string) => prisma.seller.create({ data: { userId, storeName, status: 'ACTIVE' } }),
  findById: (id: string) => prisma.seller.findUnique({ where: { id }, include: { metrics: true } }),
  upsertMetrics: (sellerId: string, totalSales: number, orders: number) =>
    prisma.sellerMetrics.upsert({
      where: { sellerId },
      update: { totalSales, orders },
      create: { sellerId, totalSales, orders }
    })
};
