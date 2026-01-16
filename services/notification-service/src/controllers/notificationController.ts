import { Request, Response } from 'express';
import { notificationService } from '../services/notificationService';

export const notificationController = {
  send: async (req: Request, res: Response) => {
    const { userId, channel, message } = req.body;
    const result = await notificationService.send(userId || null, channel, message);
    res.status(202).json(result);
  }
};
