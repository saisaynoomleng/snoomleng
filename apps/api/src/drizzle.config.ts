import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import env from './lib/env';

export default defineConfig({
  out: './src/db/migrations',
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
