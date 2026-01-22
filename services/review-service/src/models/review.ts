import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  status: { type: String, default: 'PENDING' }
}, { timestamps: true });

export const ReviewModel = model('Review', reviewSchema);
