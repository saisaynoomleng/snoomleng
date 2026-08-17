import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_STUDIO_PROJECT_ID: z
      .string()
      .min(1, 'Sanity Project ID must have at least 1 character'),
    SANITY_STUDIO_DATASET: z
      .enum(['production', 'development'])
      .default('production'),
    API_URL: z.url('Must be a valid URL'),
    SANITY_API_VERSION: z.string(),
    SANITY_READ_TOKEN: z.string(),
  },
  runtimeEnv: {
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    API_URL: process.env.API_URL,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
  },
});
