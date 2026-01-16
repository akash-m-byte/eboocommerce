import { ReviewModel } from '../models/review';

export const reviewRepository = {
  listByProduct: (productId: string) => ReviewModel.find({ productId }).lean(),
  create: (data: any) => ReviewModel.create(data),
  moderate: (id: string, status: string) => ReviewModel.findByIdAndUpdate(id, { status }, { new: true })
};
