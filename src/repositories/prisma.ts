import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

let connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Set it in your environment or .env.');
}

// Use SSL for remote DBs when supported. Auto-detect Render: internal = no SSL, external = SSL with self-signed OK.
const sslInsecure = process.env.DATABASE_SSL_INSECURE?.trim().toLowerCase() === 'true';
const sslDisabled = process.env.DATABASE_SSL_DISABLE?.trim().toLowerCase() === 'true';
const explicitDisable = sslDisabled || connectionString.includes('sslmode=disable');
const explicitRequire = connectionString.includes('sslmode=require');

// Extract host without full URL parse (passwords can contain @, #, :, etc. and break new URL()).
const hostMatch = connectionString.match(/@([^/]+)\//);
const rawHost = hostMatch ? hostMatch[1] : '';
const host = rawHost.includes(':') ? rawHost.slice(0, rawHost.indexOf(':')).toLowerCase() : rawHost.toLowerCase();

const isLocal = host === 'localhost' || host === '127.0.0.1' || host === 'host.docker.internal';
const isRenderExternal = host.endsWith('.render.com');
const isRenderInternal = (host.includes('dpg') || host.includes('render')) && !host.endsWith('.render.com');

let ssl: { rejectUnauthorized: boolean } | undefined;
if (explicitDisable || isRenderInternal) {
  ssl = undefined;
} else if (isRenderExternal) {
  ssl = { rejectUnauthorized: false };
} else if (explicitRequire || !isLocal) {
  ssl = { rejectUnauthorized: !sslInsecure };
}

// Strip sslmode/ssl from URL so pg's parser doesn't override our ssl config (e.g. sslmode=require → empty ssl object → rejectUnauthorized stays true).
connectionString = connectionString
  .replace(/[?&]sslmode=[^&]*/g, '')
  .replace(/[?&]ssl=[^&]*/g, '')
  .replace(/\?&+/, '?')
  .replace(/\?$/, '');

const pool = new Pool({
  connectionString,
  ...(ssl !== undefined && { ssl })
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
});
