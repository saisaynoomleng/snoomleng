import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  UserTable: {
    sessions: r.many.SessionTable({
      from: r.UserTable.id,
      to: r.SessionTable.userId,
    }),
    accounts: r.many.AccountTable({
      from: r.UserTable.id,
      to: r.AccountTable.userId,
    }),
  },
  BlogTable: {
    comments: r.many.CommentTable({
      from: r.BlogTable.id,
      to: r.CommentTable.blogId,
    }),
  },
}));
