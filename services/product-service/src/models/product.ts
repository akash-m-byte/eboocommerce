import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  categoryId: { type: String },
  images: { type: [String], default: [] },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

productSchema.index({ title: 'text', description: 'text' });

export const ProductModel = model('Product', productSchema);
