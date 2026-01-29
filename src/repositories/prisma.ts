import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Set it in your environment or .env.');
}

// Use SSL for remote DBs when supported. Auto-detect Render: internal = no SSL, external = SSL with self-signed OK.
const sslInsecure = process.env.DATABASE_SSL_INSECURE?.trim().toLowerCase() === 'true';
const sslDisabled = process.env.DATABASE_SSL_DISABLE?.trim().toLowerCase() === 'true';
const urlForParse = connectionString.replace(/^postgresql:\/\//, 'https://');
let ssl: { rejectUnauthorized: boolean } | undefined;
try {
  const url = new URL(urlForParse);
  const host = url.hostname || '';
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === 'host.docker.internal';
  const explicitDisable = sslDisabled || connectionString.includes('sslmode=disable');
  const explicitRequire = connectionString.includes('sslmode=require');

  // Render: external URL (*.render.com) uses TLS with certs that may be self-signed; internal URL = no SSL.
  const isRenderExternal = host.endsWith('.render.com');
  const isRenderInternal = (host.includes('dpg') || host.includes('render')) && !host.endsWith('.render.com');

  if (explicitDisable || isRenderInternal) {
    ssl = undefined;
  } else if (isRenderExternal) {
    ssl = { rejectUnauthorized: false };
  } else if (explicitRequire || !isLocal) {
    ssl = { rejectUnauthorized: !sslInsecure };
  }
} catch {
  const explicitDisable = sslDisabled || connectionString.includes('sslmode=disable');
  if (!explicitDisable && connectionString.includes('sslmode=require')) {
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
