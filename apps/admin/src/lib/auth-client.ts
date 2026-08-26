import { createAuthClient } from 'better-auth/react';
import { env } from './env/server';

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: env.API_URL,
});
