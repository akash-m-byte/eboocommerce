import { Request, Response } from 'express';
import { cartService } from '../services/cartService';

export const cartController = {
  get: async (req: Request, res: Response) => {
    const cart = await cartService.getCart(req.params.userId);
    res.json(cart);
  },
  add: async (req: Request, res: Response) => {
    const { userId, guestId, productId, quantity } = req.body;
    const cart = await cartService.add(userId, guestId, productId, quantity);
    res.status(201).json(cart);
  },
  update: async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    const cart = await cartService.update(userId, productId, quantity);
    res.json(cart);
  },
  remove: async (req: Request, res: Response) => {
    const { userId, productId } = req.body;
    const cart = await cartService.remove(userId, productId);
    res.json(cart);
  }
};
