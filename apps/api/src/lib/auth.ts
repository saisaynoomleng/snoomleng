import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '../db';
import env from './env';

export const auth = betterAuth({
  appName: 'snoomleng api',

  baseURL: {
    allowedHosts: env.ALLOW_ORIGINS.split(','),
  },

  basePath: '/api/auth',

  database: drizzleAdapter(db, {
    provider: 'pg',
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  secret: env.BETTER_AUTH_SECRET,

  user: {
    modelName: 'users',
    fields: {
      email: 'email',
      name: 'name',
      emailVerified: 'emailVerified',
    },
  },

  session: {
    modelName: 'sessions',
    fields: {
      userId: 'user_id',
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  account: {
    modelName: 'accounts',
    fields: {
      userId: 'user_id',
    },
    encryptOAuthTokens: true,
    storeStateStrategy: 'database',
    storeAccountCookie: true,
  },
});
