import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema.js';
import { timestamps } from './schema-helper.js';

export const SessionTable = t.pgTable(
  'sessions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    token: t.text('token'),
    expiresAt: t.timestamp('expires_at', { withTimezone: true }).notNull(),
    ipAddress: t.varchar('ip_address', { length: 255 }),
    userAgent: t.varchar('user_agent', { length: 255 }),
    impersonatedBy: t.text('impersonated_by'),
    ...timestamps,
  },
  (table) => [t.index('sessions_userId_idx').on(table.userId)],
);
