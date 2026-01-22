import { prisma } from './prisma';

/**
 * Email Verification Repository - Data Access Layer
 */
export const emailVerificationRepository = {
  /**
   * Create email verification token
   */
  create: (userId: string, token: string, expiresAt: Date) =>
    prisma.emailVerificationToken.create({
      data: { userId, token, expiresAt }
    }),

  /**
   * Find token by value
   */
  findByToken: (token: string) =>
    prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true }
    }),

  /**
   * Mark token as used
   */
  markAsUsed: (token: string) =>
    prisma.emailVerificationToken.update({
      where: { token },
      data: { used: true }
    }),

  /**
   * Delete expired tokens
   */
  deleteExpired: () =>
    prisma.emailVerificationToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    }),

  /**
   * Delete all tokens for user
   */
  deleteByUserId: (userId: string) =>
    prisma.emailVerificationToken.deleteMany({
      where: { userId }
    })
};
