import { Request, Response, NextFunction } from 'express';
import { shippingService } from '../services/shippingService';

/**
 * Shipping Controller - HTTP Request/Response Layer
 */
export const shippingController = {
  cost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { weight, distance } = req.body;
      const result = await shippingService.calculateCost({ weight, distance });
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  ship: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, carrier } = req.body;
      const shipment = await shippingService.ship({ orderId, carrier });
      res.status(201).json(shipment);
    } catch (error) {
      next(error);
    }
  },

  track: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shipment = await shippingService.track(req.params.trackingId);
      res.json(shipment);
    } catch (error) {
      next(error);
    }
  }
};
