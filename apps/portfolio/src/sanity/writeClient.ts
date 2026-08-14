import { env } from '@/lib/env/server';
import { client } from './client';

const token = env.SANITY_WRITE_TOKEN;

if (!token) {
  throw new Error('Missing Sanity Write Token');
}

export const writeClient = client.withConfig({
  token,
});
