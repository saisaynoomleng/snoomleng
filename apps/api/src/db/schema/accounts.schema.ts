import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { timestamps } from './schema-helper';

export const AccountTable = t.pgTable('accounts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  accountId: t.text('account_id'),
  providerId: t.text('provider_id'),
  accessToken: t.text('access_token'),
  refreshToken: t.text('refresh_token'),
  accessTokenExpiresAt: t.timestamp('access_token_expires_at', {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: t.timestamp('refresh_token_expires_at', {
    withTimezone: true,
  }),
  scope: t.varchar('scope'),
  idToken: t.varchar('id_token'),
  password: t.text('password'),
  ...timestamps,
});
