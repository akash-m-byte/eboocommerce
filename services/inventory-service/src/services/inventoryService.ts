import { inventoryRepository } from '../repositories/inventoryRepository';
import { ValidationError, NotFoundError } from '../../../../shared/utils/errors';

export interface ReserveInput {
  productId: string;
  quantity: number;
  orderId: string;
}

/**
 * Inventory Service - Business Logic Layer
 */
export class InventoryService {
  async getStock(productId: string) {
    if (!productId) {
      throw new ValidationError('ProductId is required');
    }
    return inventoryRepository.getStock(productId);
  }

  async reserve(input: ReserveInput) {
    // Business validation
    if (!input.productId || !input.orderId) {
      throw new ValidationError('ProductId and OrderId are required');
    }
    if (input.quantity <= 0) {
      throw new ValidationError('Quantity must be greater than 0');
    }

    // Check stock availability
    const stock = await inventoryRepository.getStock(input.productId);
    if (!stock || stock.available < input.quantity) {
      throw new ValidationError('Insufficient stock');
    }

    // Reserve inventory
    return inventoryRepository.reserve(
      input.productId,
      input.quantity,
      input.orderId
    );
  }

  async release(orderId: string) {
    if (!orderId) {
      throw new ValidationError('OrderId is required');
    }
    return inventoryRepository.release(orderId);
  }
}

// Export singleton instance
export const inventoryService = new InventoryService();
