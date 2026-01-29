import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Set it in your environment or .env.');
}

// Use SSL for remote DBs (required by e.g. Filess.io). Skip for localhost.
const sslInsecure = process.env.DATABASE_SSL_INSECURE?.trim().toLowerCase() === 'true';
let ssl: { rejectUnauthorized: boolean } | undefined;
try {
  const url = new URL(connectionString.replace(/^postgresql:\/\//, 'https://'));
  const host = url.hostname || '';
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === 'host.docker.internal';
  if (!isLocal || connectionString.includes('sslmode=require')) {
    ssl = { rejectUnauthorized: !sslInsecure };
  }
} catch {
  if (connectionString.includes('sslmode=require')) {
    ssl = { rejectUnauthorized: !sslInsecure };
  }
}

const pool = new Pool({
  connectionString,
  ...(ssl !== undefined && { ssl })
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
});
