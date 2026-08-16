import * as t from 'drizzle-orm/pg-core';
import { ContactStauts, timestamps } from './schema-helper';

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  email: t.varchar('email', { length: 255 }).notNull(),
  subject: t.text('subject').notNull(),
  message: t.text('message').notNull(),
  status: ContactStauts('status').default('new').notNull(),
  ...timestamps,
});
