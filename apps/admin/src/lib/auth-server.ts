import { createAuthClient } from 'better-auth/client';
import { env } from './env/server';
import { env as clientEnv } from './env/client';

export const { signIn, signOut, signUp, getSession, useSession } =
  createAuthClient({
    baseURL: env.API_URL,
    fetchOptions: {
      headers: {
        'content-type': 'application/json',
        Origin: clientEnv.NEXT_PUBLIC_APP_URL,
      },
    },
  });
