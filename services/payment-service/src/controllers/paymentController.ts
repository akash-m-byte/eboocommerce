import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/paymentService';

/**
 * Payment Controller - HTTP Request/Response Layer
 */
export const paymentController = {
  intent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId, userId, amount } = req.body;
      const payment = await paymentService.createIntent({ orderId, userId, amount });
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  },

  callback: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentId, status } = req.body;
      const payment = await paymentService.handleCallback({
        paymentId,
        status,
        payload: req.body
      });
      res.json(payment);
    } catch (error) {
      next(error);
    }
  }
};
