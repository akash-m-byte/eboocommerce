import { reviewRepository } from '../repositories/reviewRepository';

export const reviewService = {
  list: (productId: string) => reviewRepository.listByProduct(productId),
  create: (data: any) => reviewRepository.create(data),
  moderate: (id: string, status: string) => reviewRepository.moderate(id, status)
};
