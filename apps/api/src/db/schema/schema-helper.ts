import * as t from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const ContactStauts = t.pgEnum('contactStatus', [
  'new',
  'replied',
  'spam',
  'important',
]);

export const userRole = t.pgEnum('userRole', ['admin', 'user']);
