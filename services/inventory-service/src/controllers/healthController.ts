import { Request, Response } from 'express';

export const healthController = {
  status: (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: process.env.SERVICE_NAME });
  }
};
