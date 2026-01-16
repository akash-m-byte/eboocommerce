import { inventoryRepository } from '../repositories/inventoryRepository';

export const inventoryService = {
  getStock: (productId: string) => inventoryRepository.getStock(productId),
  reserve: (productId: string, quantity: number, orderId: string) =>
    inventoryRepository.reserve(productId, quantity, orderId),
  release: (orderId: string) => inventoryRepository.release(orderId)
};
