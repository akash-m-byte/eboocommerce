import { Request, Response } from 'express';
import { inventoryService } from '../services/inventoryService';

export const inventoryController = {
  stock: async (req: Request, res: Response) => {
    const items = await inventoryService.getStock(req.params.productId);
    res.json(items);
  },
  reserve: async (req: Request, res: Response) => {
    const { productId, quantity, orderId } = req.body;
    const item = await inventoryService.reserve(productId, quantity, orderId);
    res.status(201).json(item);
  },
  release: async (req: Request, res: Response) => {
    const { orderId } = req.body;
    await inventoryService.release(orderId);
    res.status(204).send();
  }
};
