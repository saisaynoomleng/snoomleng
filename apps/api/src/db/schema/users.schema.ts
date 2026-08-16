import * as t from 'drizzle-orm/pg-core';
import { timestamps, userRole } from './schema-helper';

export const UserTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: t.boolean('email_verified').default(false),
  imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
  role: userRole('role').notNull().default('user'),
  ...timestamps,
});
