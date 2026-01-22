import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';
import { authenticate } from './auth';

export type Role = 'ADMIN' | 'SELLER' | 'CUSTOMER';

/**
 * Role-Based Access Control (RBAC) Middleware
 */

/**
 * Require authentication (user must be logged in)
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  return authenticate(req, res, next);
}

/**
 * Require specific role(s)
 * Usage: router.get('/admin', requireRole('ADMIN'), controller.admin)
 * Usage: router.get('/seller', requireRole('ADMIN', 'SELLER'), controller.seller)
 */
export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      throw new ForbiddenError(
        `Access denied. Required role: ${allowedRoles.join(' or ')}`
      );
    }

    next();
  };
}

/**
 * Require admin role
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  return requireRole('ADMIN')(req, res, next);
}

/**
 * Require seller or admin role
 */
export function requireSeller(req: Request, res: Response, next: NextFunction) {
  return requireRole('ADMIN', 'SELLER')(req, res, next);
}

/**
 * Require email verification
 */
export function requireVerifiedEmail(req: Request, res: Response, next: NextFunction) {
  // This assumes user object has emailVerified field
  // You may need to fetch user from database to check this
  // For now, this is a placeholder that can be enhanced
  if (!req.user) {
    throw new UnauthorizedError('Authentication required');
  }

  // Note: You'll need to fetch user from DB to check emailVerified
  // This is a simplified version - enhance as needed
  next();
}

/**
 * Combine multiple requirements
 * Usage: router.get('/admin', combine(requireAuth, requireRole('ADMIN')), controller.admin)
 */
export function combine(...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    let index = 0;

    const runNext = () => {
      if (index >= middlewares.length) {
        return next();
      }

      const middleware = middlewares[index++];
      middleware(req, res, (err?: any) => {
        if (err) return next(err);
        runNext();
      });
    };

    runNext();
  };
}
