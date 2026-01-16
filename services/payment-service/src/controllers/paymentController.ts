import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';

export const paymentController = {
  intent: async (req: Request, res: Response) => {
    const { orderId, userId, amount } = req.body;
    const payment = await paymentService.createIntent(orderId, userId, amount);
    res.status(201).json(payment);
  },
  callback: async (req: Request, res: Response) => {
    const { paymentId, status } = req.body;
    const payment = await paymentService.handleCallback(paymentId, status, req.body);
    res.json(payment);
  }
};
