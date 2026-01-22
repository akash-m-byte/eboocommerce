import { prisma } from './prisma';

export const pricingRepository = {
  getPrice: (productId: string) => prisma.price.findFirst({ where: { productId } }),
  upsertPrice: (productId: string, basePrice: number, currency: string) =>
    prisma.price.upsert({
      where: { productId },
      update: { basePrice, currency },
      create: { productId, basePrice, currency }
    }),
  addHistory: (productId: string, price: number) => prisma.priceHistory.create({ data: { productId, price } }),
  addDiscount: (productId: string, percent: number, startsAt: Date, endsAt: Date) =>
    prisma.discount.create({ data: { productId, percent, startsAt, endsAt } }),
  addCoupon: (code: string, percent: number, startsAt: Date, endsAt: Date) =>
    prisma.coupon.create({ data: { code, percent, startsAt, endsAt } })
};
