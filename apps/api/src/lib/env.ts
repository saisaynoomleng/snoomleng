import dotenv from 'dotenv';
import * as z from 'zod';

const appStage = process.env.APP_STAGE ?? 'dev';

dotenv.config({
  path: appStage === 'test' ? '.env.test' : '.env',
});

const schema = z.object({
  // APP
  NODE_ENV: z
    .enum(['production', 'development', 'testing'])
    .default('development'),
  APP_STAGE: z.enum(['dev', 'prod', 'test']).default('dev'),

  // Server
  PORT: z.coerce.number().default(8000),

  // CORS
  ALLOW_ORIGINS: z.string(),

  // Database
  DATABASE_URL: z.string().startsWith('postgresql://'),

  // Auth
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),

  // Security
  BCRYPT_SALT_ROUNDS: z.coerce.number().min(10).max(20).default(12),

  // Logging
  LOG_LEVEL: z.string(),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number(),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number(),
});

type Env = z.infer<typeof schema>;

let env: Env;

try {
  env = schema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('Invalid env var');

    error.issues.forEach((e) => {
      const message = e.message;
      const path = e.path.join('.');

      console.log(`${path}: ${message}`);
    });
  }

  process.exit(1);
}

export const isProd = () => env.APP_STAGE === 'prod';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTest = () => env.APP_STAGE === 'test';

export default env;
