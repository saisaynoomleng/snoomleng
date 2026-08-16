import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { timestamps } from './schema-helper';

export const SessionTable = t.pgTable('sessions', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  token: t.text('token'),
  expiresAt: t.timestamp('expires_at', { withTimezone: true }).notNull(),
  ipAddress: t.varchar('ip_address', { length: 255 }),
  userAgent: t.varchar('user_agent', { length: 255 }),
  ...timestamps,
});
