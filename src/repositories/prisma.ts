import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Set it in your environment or .env.');
}
// Use Node pg driver so we can control SSL (e.g. accept self-signed certs for Filess.io)
const ssl = connectionString.includes('sslmode=require')
  ? { rejectUnauthorized: process.env.DATABASE_SSL_INSECURE !== 'true' }
  : undefined;

const pool = new Pool({
  connectionString,
  ...(ssl !== undefined && { ssl })
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
});
