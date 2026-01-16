import { categoryRepository } from '../repositories/categoryRepository';

export const categoryService = {
  list: () => categoryRepository.list(),
  create: (data: any) => categoryRepository.create(data)
};
