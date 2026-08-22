import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { env } from '@/lib/env/server';

const token = env.SANITY_READ_TOKEN;

if (!token) {
  throw new Error('Error Browser Token');
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
