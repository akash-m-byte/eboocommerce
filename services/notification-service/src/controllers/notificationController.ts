import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notificationService';

/**
 * Notification Controller - HTTP Request/Response Layer
 */
export const notificationController = {
  send: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, channel, message } = req.body;
      const result = await notificationService.send({
        userId: userId || null,
        channel,
        message
      });
      res.status(202).json(result);
    } catch (error) {
      next(error);
    }
  }
};
