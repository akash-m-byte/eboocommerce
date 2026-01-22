import { prisma } from './prisma';

/**
 * User Repository - Data Access Layer
 */
export const userRepository = {
  /**
   * Create new user
   */
  createUser: (email: string, passwordHash: string, role: 'ADMIN' | 'SELLER' | 'CUSTOMER') =>
    prisma.user.create({ data: { email, passwordHash, role } }),

  /**
   * Find user by email
   */
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  /**
   * Find user by ID
   */
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),

  /**
   * Update user password
   */
  updatePassword: (id: string, passwordHash: string) =>
    prisma.user.update({
      where: { id },
      data: { passwordHash }
    }),

  /**
   * Mark email as verified
   */
  verifyEmail: (id: string) =>
    prisma.user.update({
      where: { id },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date()
      }
    })
};
