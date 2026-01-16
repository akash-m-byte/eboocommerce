import { Request, Response } from 'express';
import { reviewService } from '../services/reviewService';

export const reviewController = {
  list: async (req: Request, res: Response) => {
    const reviews = await reviewService.list(req.params.productId);
    res.json(reviews);
  },
  create: async (req: Request, res: Response) => {
    const review = await reviewService.create(req.body);
    res.status(201).json(review);
  },
  moderate: async (req: Request, res: Response) => {
    const review = await reviewService.moderate(req.params.id, req.body.status);
    res.json(review);
  }
};
