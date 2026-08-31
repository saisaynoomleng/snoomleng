import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db, {
  AccountTable,
  SessionTable,
  UserTable,
  VerificationTable,
} from '../db/index.js';
import env from './env.js';
import { admin, oAuthProxy } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { sendVerificationEmail } from './helper.js';

export const auth = betterAuth({
  appName: 'snoomleng api',

  plugins: [
    admin({
      defaultRole: 'user',
      adminRoles: ['admin'],
      adminUserIds: ['68b1a43f-e392-49d0-9819-56938cb0e1b2'],
    }),
    oAuthProxy(),
    nextCookies(),
  ],

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
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
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
    requireEmailVerification: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendVerificationEmail({ user, url });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },

  secret: env.BETTER_AUTH_SECRET,

  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
});
