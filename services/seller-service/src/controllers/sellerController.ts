import { Request, Response, NextFunction } from 'express';
import { sellerService } from '../services/sellerService';

/**
 * Seller Controller - HTTP Request/Response Layer
 */
export const sellerController = {
  onboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, storeName } = req.body;
      const seller = await sellerService.onboard({ userId, storeName });
      res.status(201).json(seller);
    } catch (error) {
      next(error);
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const seller = await sellerService.getById(req.params.id);
      res.json(seller);
    } catch (error) {
      next(error);
    }
  },

  analytics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const metrics = await sellerService.analytics(req.params.id);
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  }
};
