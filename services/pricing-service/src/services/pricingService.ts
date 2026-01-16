import { pricingRepository } from '../repositories/pricingRepository';

export const pricingService = {
  async setBasePrice(productId: string, basePrice: number, currency: string) {
    const price = await pricingRepository.upsertPrice(productId, basePrice, currency);
    await pricingRepository.addHistory(productId, basePrice);
    return price;
  },
  getPrice: (productId: string) => pricingRepository.getPrice(productId),
  addDiscount: (productId: string, percent: number, startsAt: Date, endsAt: Date) =>
    pricingRepository.addDiscount(productId, percent, startsAt, endsAt),
  addCoupon: (code: string, percent: number, startsAt: Date, endsAt: Date) =>
    pricingRepository.addCoupon(code, percent, startsAt, endsAt)
};
