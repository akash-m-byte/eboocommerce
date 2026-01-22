import { CategoryModel } from '../models/category';

export const categoryRepository = {
  list: () => CategoryModel.find({}).lean(),
  create: (data: any) => CategoryModel.create(data)
};
