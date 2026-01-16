import { Request, Response } from 'express';
import { pricingService } from '../services/pricingService';

export const pricingController = {
  get: async (req: Request, res: Response) => {
    const item = await pricingService.getPrice(req.params.productId);
    res.json(item);
  },
  setBase: async (req: Request, res: Response) => {
    const { productId, basePrice, currency } = req.body;
    const item = await pricingService.setBasePrice(productId, basePrice, currency);
    res.status(201).json(item);
  },
  discount: async (req: Request, res: Response) => {
    const { productId, percent, startsAt, endsAt } = req.body;
    const item = await pricingService.addDiscount(productId, percent, new Date(startsAt), new Date(endsAt));
    res.status(201).json(item);
  },
  coupon: async (req: Request, res: Response) => {
    const { code, percent, startsAt, endsAt } = req.body;
    const item = await pricingService.addCoupon(code, percent, new Date(startsAt), new Date(endsAt));
    res.status(201).json(item);
  }
};
