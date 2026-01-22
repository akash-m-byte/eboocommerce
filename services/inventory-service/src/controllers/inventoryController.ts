import { Request, Response, NextFunction } from 'express';
import { inventoryService } from '../services/inventoryService';

/**
 * Inventory Controller - HTTP Request/Response Layer
 */
export const inventoryController = {
  stock: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await inventoryService.getStock(req.params.productId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  },

  reserve: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, quantity, orderId } = req.body;
      const item = await inventoryService.reserve({ productId, quantity, orderId });
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  release: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.body;
      await inventoryService.release(orderId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
