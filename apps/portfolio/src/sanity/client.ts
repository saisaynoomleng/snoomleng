import { env } from '@/lib/env/client';
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-07-09',
  useCdn: false,
});
