import { Request, Response } from 'express';
import { shippingService } from '../services/shippingService';

export const shippingController = {
  cost: async (req: Request, res: Response) => {
    const { weight, distance } = req.body;
    const result = shippingService.calculateCost(weight, distance);
    res.json(result);
  },
  ship: async (req: Request, res: Response) => {
    const { orderId, carrier } = req.body;
    const shipment = await shippingService.ship(orderId, carrier);
    res.status(201).json(shipment);
  },
  track: async (req: Request, res: Response) => {
    const shipment = await shippingService.track(req.params.trackingId);
    res.json(shipment);
  }
};
