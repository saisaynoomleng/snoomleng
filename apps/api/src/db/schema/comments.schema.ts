import * as t from 'drizzle-orm/pg-core';
import { BlogTable } from './blogs.schema';
import { timestamps } from './schema-helper';

export const CommentTable = t.pgTable('comments', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  blogId: t
    .uuid('blog_id')
    .references(() => BlogTable.id, { onDelete: 'cascade' })
    .notNull(),
  body: t.text('body').notNull(),
  ...timestamps,
});
