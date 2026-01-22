import { pricingRepository } from '../repositories/pricingRepository';
import { ValidationError, NotFoundError } from '../../../../shared/utils/errors';

export interface SetBasePriceInput {
  productId: string;
  basePrice: number;
  currency: string;
}

export interface AddDiscountInput {
  productId: string;
  percent: number;
  startsAt: Date;
  endsAt: Date;
}

export interface AddCouponInput {
  code: string;
  percent: number;
  startsAt: Date;
  endsAt: Date;
}

/**
 * Pricing Service - Business Logic Layer
 */
export class PricingService {
  async getPrice(productId: string) {
    if (!productId) {
      throw new ValidationError('ProductId is required');
    }

    const price = await pricingRepository.getPrice(productId);
    if (!price) {
      throw new NotFoundError('Price');
    }

    return price;
  }

  async setBasePrice(input: SetBasePriceInput) {
    // Business validation
    if (!input.productId) {
      throw new ValidationError('ProductId is required');
    }
    if (input.basePrice < 0) {
      throw new ValidationError('Base price cannot be negative');
    }
    if (!input.currency) {
      throw new ValidationError('Currency is required');
    }

    // Upsert price
    const price = await pricingRepository.upsertPrice(
      input.productId,
      input.basePrice,
      input.currency
    );

    // Add to history
    await pricingRepository.addHistory(input.productId, input.basePrice);

    return price;
  }

  async addDiscount(input: AddDiscountInput) {
    // Business validation
    if (!input.productId) {
      throw new ValidationError('ProductId is required');
    }
    if (input.percent < 0 || input.percent > 100) {
      throw new ValidationError('Discount percent must be between 0 and 100');
    }
    if (input.endsAt <= input.startsAt) {
      throw new ValidationError('End date must be after start date');
    }

    return pricingRepository.addDiscount(
      input.productId,
      input.percent,
      input.startsAt,
      input.endsAt
    );
  }

  async addCoupon(input: AddCouponInput) {
    // Business validation
    if (!input.code || input.code.trim().length === 0) {
      throw new ValidationError('Coupon code is required');
    }
    if (input.percent < 0 || input.percent > 100) {
      throw new ValidationError('Discount percent must be between 0 and 100');
    }
    if (input.endsAt <= input.startsAt) {
      throw new ValidationError('End date must be after start date');
    }

    return pricingRepository.addCoupon(
      input.code,
      input.percent,
      input.startsAt,
      input.endsAt
    );
  }
}

// Export singleton instance
export const pricingService = new PricingService();
