import { productRepository } from '../repositories/productRepository';
import { NotFoundError } from '../../../../shared/utils/errors';

export interface ListProductsInput {
  limit: number;
  offset: number;
  search?: string;
  categoryId?: string;
}

export interface CreateProductInput {
  title: string;
  description?: string;
  categoryId?: string;
  images?: string[];
  metadata?: Record<string, any>;
}

export interface UpdateProductInput {
  title?: string;
  description?: string;
  categoryId?: string;
  images?: string[];
  metadata?: Record<string, any>;
}

/**
 * Product Service - Business Logic Layer
 * Handles product business logic, validation, and data transformation
 */
export class ProductService {
  /**
   * List products with pagination and filters
   */
  async list(input: ListProductsInput) {
    // Business logic: validate pagination
    if (input.limit < 1 || input.limit > 100) {
      input.limit = 20; // Default limit
    }
    if (input.offset < 0) {
      input.offset = 0;
    }

    // Call repository
    return productRepository.findAll(
      input.limit,
      input.offset,
      input.search,
      input.categoryId
    );
  }

  /**
   * Get product by ID
   */
  async getById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product');
    }
    return product;
  }

  /**
   * Create new product
   */
  async create(input: CreateProductInput) {
    // Business validation
    if (!input.title || input.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    // Transform data (add timestamps, generate slug, etc.)
    const productData = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Call repository
    return productRepository.create(productData);
  }

  /**
   * Update product
   */
  async update(id: string, input: UpdateProductInput) {
    // Check if product exists
    const existing = await productRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Product');
    }

    // Transform data
    const updateData = {
      ...input,
      updatedAt: new Date()
    };

    // Call repository
    return productRepository.update(id, updateData);
  }

  /**
   * Delete product
   */
  async delete(id: string) {
    // Check if product exists
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Product');
    }

    // Call repository
    return productRepository.remove(id);
  }
}

// Export singleton instance
export const productService = new ProductService();
