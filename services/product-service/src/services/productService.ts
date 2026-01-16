import { productRepository } from '../repositories/productRepository';

export const productService = {
  list: (limit: number, offset: number, search?: string, categoryId?: string) =>
    productRepository.findAll(limit, offset, search, categoryId),
  get: (id: string) => productRepository.findById(id),
  create: (data: any) => productRepository.create(data),
  update: (id: string, data: any) => productRepository.update(id, data),
  remove: (id: string) => productRepository.remove(id)
};
