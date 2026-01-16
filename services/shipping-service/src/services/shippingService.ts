import { shippingRepository } from '../repositories/shippingRepository';

export const shippingService = {
  calculateCost: (weight: number, distance: number) => ({ cost: weight * distance * 0.05 }),
  ship: (orderId: string, carrier: string) =>
    shippingRepository.createShipment({ orderId, carrier, trackingId: `TRK-${Date.now()}`, status: 'SHIPPED' }),
  track: (trackingId: string) => shippingRepository.getShipment(trackingId)
};
