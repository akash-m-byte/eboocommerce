import { Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

export const categoryController = {
  list: async (_req: Request, res: Response) => {
    const items = await categoryService.list();
    res.json(items);
  },
  create: async (req: Request, res: Response) => {
    const item = await categoryService.create(req.body);
    res.status(201).json(item);
  }
};
