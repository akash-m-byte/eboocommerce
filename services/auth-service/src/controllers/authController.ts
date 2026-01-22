import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

/**
 * Auth Controller - HTTP Request/Response Layer
 * Handles HTTP requests, extracts data, calls service, returns responses
 * NO business logic here - only HTTP concerns
 */
export const authController = {
  /**
   * Register endpoint
   */
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, role } = req.body;
      const result = await authService.register({ email, password, role });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Login endpoint
   */
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Refresh token endpoint
   */
  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get current user endpoint
   */
  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      next(error);
    }
  },

  requestPasswordReset: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await authService.requestPasswordReset({ email });
      // Always return success to prevent email enumeration
      res.json({ message: 'If the email exists, a password reset link has been sent' });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      await authService.resetPassword({ token, newPassword });
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;
      await authService.verifyEmail({ token });
      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      next(error);
    }
  },

  resendVerificationEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await authService.resendVerificationEmail(email);
      // Always return success to prevent email enumeration
      res.json({ message: 'If the email exists and is not verified, a verification email has been sent' });
    } catch (error) {
      next(error);
    }
  }
};
