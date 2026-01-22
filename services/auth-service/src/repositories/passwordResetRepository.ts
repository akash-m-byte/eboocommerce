import { prisma } from './prisma';

/**
 * Password Reset Repository - Data Access Layer
 */
export const passwordResetRepository = {
  /**
   * Create password reset token
   */
  create: (userId: string, token: string, expiresAt: Date) =>
    prisma.passwordResetToken.create({
      data: { userId, token, expiresAt }
    }),

  /**
   * Find token by value
   */
  findByToken: (token: string) =>
    prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    }),

  /**
   * Mark token as used
   */
  markAsUsed: (token: string) =>
    prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    }),

  /**
   * Delete expired tokens
   */
  deleteExpired: () =>
    prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    }),

  /**
   * Delete all tokens for user
   */
  deleteByUserId: (userId: string) =>
    prisma.passwordResetToken.deleteMany({
      where: { userId }
    })
};
