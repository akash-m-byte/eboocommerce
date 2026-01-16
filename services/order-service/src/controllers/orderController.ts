import { Request, Response } from 'express';
import { orderService } from '../services/orderService';

export const orderController = {
  checkout: async (req: Request, res: Response) => {
    const { userId, items } = req.body;
    const order = await orderService.checkout(userId, items || []);
    res.status(201).json(order);
  },
  get: async (req: Request, res: Response) => {
    const order = await orderService.get(req.params.id);
    res.json(order);
  },
  listByUser: async (req: Request, res: Response) => {
    const orders = await orderService.listByUser(req.params.userId);
    res.json(orders);
  },
  cancel: async (req: Request, res: Response) => {
    const order = await orderService.cancel(req.params.id);
    res.json(order);
  }
};
