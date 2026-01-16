import { Request, Response } from 'express';
import { productService } from '../services/productService';

export const productController = {
  list: async (req: Request, res: Response) => {
    const limit = Number(req.query.limit || 20);
    const offset = Number(req.query.offset || 0);
    const search = req.query.search?.toString();
    const categoryId = req.query.categoryId?.toString();
    const items = await productService.list(limit, offset, search, categoryId);
    res.json(items);
  },
  get: async (req: Request, res: Response) => {
    const item = await productService.get(req.params.id);
    res.json(item);
  },
  create: async (req: Request, res: Response) => {
    const item = await productService.create(req.body);
    res.status(201).json(item);
  },
  update: async (req: Request, res: Response) => {
    const item = await productService.update(req.params.id, req.body);
    res.json(item);
  },
  remove: async (req: Request, res: Response) => {
    await productService.remove(req.params.id);
    res.status(204).send();
  }
};
