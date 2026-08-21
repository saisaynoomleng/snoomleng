import * as z from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z
      .string()
      .min(1, 'Sanity Project ID must have at least 1 character'),
    NEXT_PUBLIC_SANITY_DATASET: z
      .enum(['production', 'development'])
      .default('production'),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
});
