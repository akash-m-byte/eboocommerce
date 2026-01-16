import { Request, Response } from 'express';
import { sellerService } from '../services/sellerService';

export const sellerController = {
  onboard: async (req: Request, res: Response) => {
    const { userId, storeName } = req.body;
    const seller = await sellerService.onboard(userId, storeName);
    res.status(201).json(seller);
  },
  get: async (req: Request, res: Response) => {
    const seller = await sellerService.get(req.params.id);
    res.json(seller);
  },
  analytics: async (req: Request, res: Response) => {
    const seller = await sellerService.analytics(req.params.id);
    res.json(seller?.metrics || null);
  }
};
