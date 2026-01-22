import { sellerRepository } from '../repositories/sellerRepository';
import { ValidationError, NotFoundError } from '../../../../shared/utils/errors';

export interface OnboardInput {
  userId: string;
  storeName: string;
}

/**
 * Seller Service - Business Logic Layer
 */
export class SellerService {
  async onboard(input: OnboardInput) {
    if (!input.userId || !input.storeName) {
      throw new ValidationError('UserId and StoreName are required');
    }
    if (input.storeName.trim().length === 0) {
      throw new ValidationError('StoreName cannot be empty');
    }
    return sellerRepository.onboard(input.userId, input.storeName);
  }

  async getById(id: string) {
    if (!id) {
      throw new ValidationError('Seller ID is required');
    }
    const seller = await sellerRepository.findById(id);
    if (!seller) {
      throw new NotFoundError('Seller');
    }
    return seller;
  }

  async analytics(id: string) {
    const seller = await this.getById(id);
    return seller.metrics || null;
  }
}

// Export singleton instance
export const sellerService = new SellerService();
