import { Request, Response, NextFunction } from 'express';
import { pricingService } from '../services/pricingService';

/**
 * Pricing Controller - HTTP Request/Response Layer
 */
export const pricingController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await pricingService.getPrice(req.params.productId);
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  setBase: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, basePrice, currency } = req.body;
      const item = await pricingService.setBasePrice({
        productId,
        basePrice,
        currency
      });
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  discount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, percent, startsAt, endsAt } = req.body;
      const item = await pricingService.addDiscount({
        productId,
        percent,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt)
      });
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  coupon: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, percent, startsAt, endsAt } = req.body;
      const item = await pricingService.addCoupon({
        code,
        percent,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt)
      });
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
};
