import { shippingRepository } from '../repositories/shippingRepository';
import { ValidationError, NotFoundError } from '../../../../shared/utils/errors';

export interface CalculateCostInput {
  weight: number;
  distance: number;
}

export interface ShipInput {
  orderId: string;
  carrier: string;
}

/**
 * Shipping Service - Business Logic Layer
 */
export class ShippingService {
  async calculateCost(input: CalculateCostInput) {
    if (input.weight <= 0) {
      throw new ValidationError('Weight must be greater than 0');
    }
    if (input.distance <= 0) {
      throw new ValidationError('Distance must be greater than 0');
    }

    // Business logic: calculate shipping cost
    const cost = input.weight * input.distance * 0.05;
    return { cost: Math.round(cost * 100) / 100 }; // Round to 2 decimals
  }

  async ship(input: ShipInput) {
    if (!input.orderId || !input.carrier) {
      throw new ValidationError('OrderId and Carrier are required');
    }

    const trackingId = `TRK-${Date.now()}`;
    return shippingRepository.createShipment({
      orderId: input.orderId,
      carrier: input.carrier,
      trackingId,
      status: 'SHIPPED'
    });
  }

  async track(trackingId: string) {
    if (!trackingId) {
      throw new ValidationError('TrackingId is required');
    }

    const shipment = await shippingRepository.getShipment(trackingId);
    if (!shipment) {
      throw new NotFoundError('Shipment');
    }
    return shipment;
  }
}

// Export singleton instance
export const shippingService = new ShippingService();
