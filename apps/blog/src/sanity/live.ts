import { env } from '@/lib/env/server';
import { client } from './client';
import { defineLive } from 'next-sanity/live';

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: env.SANITY_READ_TOKEN,
  browserToken: env.SANITY_READ_TOKEN,
});
