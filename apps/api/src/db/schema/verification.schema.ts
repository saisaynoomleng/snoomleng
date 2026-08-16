import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper';

export const VerificationTable = t.pgTable('verifications', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  identifier: t.text('identifier'),
  value: t.text('value'),
  expiresAt: t.timestamp('expires_at'),
  ...timestamps,
});
