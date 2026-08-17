import { env } from '@/lib/env/server';
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: env.SANITY_STUDIO_PROJECT_ID,
  dataset: env.SANITY_STUDIO_DATASET,
  apiVersion: env.SANITY_API_VERSION,
  useCdn: true,
});
