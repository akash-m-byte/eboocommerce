import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { ConflictError } from '../../../shared/utils/errors';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, role } = req.body;
      const result = await authService.register(email, password, role || 'CUSTOMER');
      res.status(201).json(result);
    } catch (error: any) {
      if (error.message === 'Email already registered') {
        throw new ConflictError('Email already registered');
      }
      throw error;
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  },

  refresh: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json(result);
  },

  me: async (req: Request, res: Response) => {
    res.json({ user: req.user });
  }
};
