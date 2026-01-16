import { sellerRepository } from '../repositories/sellerRepository';

export const sellerService = {
  onboard: (userId: string, storeName: string) => sellerRepository.onboard(userId, storeName),
  get: (id: string) => sellerRepository.findById(id),
  analytics: (id: string) => sellerRepository.findById(id)
};
