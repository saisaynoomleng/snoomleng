import 'dotenv/config';

import { relations } from './relations';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import env, { isProd } from '../lib/env';
import { remember } from '@epic-web/remember';

const createPool = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    min: 0,
    max: 10,
  });

  pool.on('error', (err) => {
    console.error('PG Pool Error:', err);
  });

  return pool;
};

let client: Pool;

if (isProd()) {
  client = createPool();
} else {
  client = remember('dbPool', () => createPool());
}

const db = drizzle({ client, relations, logger: true });
export default db;
export * from './schema';
