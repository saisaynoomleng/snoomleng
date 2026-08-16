import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper';

export const BlogTable = t.pgTable('blogs', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  ...timestamps,
});
