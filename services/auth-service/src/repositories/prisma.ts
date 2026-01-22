import { PrismaClient } from '@prisma/client';

// PrismaClient should use DATABASE_URL from environment
// The datasources config is not needed - Prisma reads from env automatically
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});
