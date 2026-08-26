import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db, {
  AccountTable,
  SessionTable,
  UserTable,
  VerificationTable,
} from '../db';
import env from './env';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  appName: 'snoomleng api',

  plugins: [admin()],

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      users: UserTable,
      sessions: SessionTable,
      accounts: AccountTable,
      verifications: VerificationTable,
    },
  }),

  trustedOrigins: env.ALLOW_ORIGINS.split(','),

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
      userId: 'userId',
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  account: {
    modelName: 'accounts',
    fields: {
      userId: 'userId',
    },
    encryptOAuthTokens: true,
    storeStateStrategy: 'database',
    storeAccountCookie: true,
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  secret: env.BETTER_AUTH_SECRET,

  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
});
