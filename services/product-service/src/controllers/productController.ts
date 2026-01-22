import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/productService';

/**
 * Product Controller - HTTP Request/Response Layer
 * Handles HTTP requests, extracts data, calls service, returns responses
 */
export const productController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Number(req.query.limit || 20);
      const offset = Number(req.query.offset || 0);
      const search = req.query.search?.toString();
      const categoryId = req.query.categoryId?.toString();
      const items = await productService.list({ limit, offset, search, categoryId });
      res.json(items);
    } catch (error) {
      next(error);
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await productService.getById(req.params.id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await productService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await productService.update(req.params.id, req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await productService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
