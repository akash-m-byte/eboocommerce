import { ProductModel } from '../models/product';

export const productRepository = {
  findAll: (limit: number, offset: number, search?: string, categoryId?: string) => {
    const query: any = {};
    if (categoryId) query.categoryId = categoryId;
    if (search) query.$text = { $search: search };
    return ProductModel.find(query).skip(offset).limit(limit).lean();
  },
  findById: (id: string) => ProductModel.findById(id).lean(),
  create: (data: any) => ProductModel.create(data),
  update: (id: string, data: any) => ProductModel.findByIdAndUpdate(id, data, { new: true }),
  remove: (id: string) => ProductModel.findByIdAndDelete(id)
};
