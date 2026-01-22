import { Request, Response, NextFunction } from 'express';
import { reviewService } from '../services/reviewService';

/**
 * Review Controller - HTTP Request/Response Layer
 */
export const reviewController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await reviewService.list(req.params.productId);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await reviewService.create(req.body);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  },

  moderate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await reviewService.moderate(req.params.id, req.body.status);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }
};
