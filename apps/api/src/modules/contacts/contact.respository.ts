import { eq } from 'drizzle-orm';
import db, { ContactTable } from '../../db';
import { InputContactFormSchema } from '@snoomleng/utils';

export const contactRepository = () => {
  return {
    findAll: async () => {
      return db.query.ContactTable.findMany();
    },

    findById: async (id: string) => {
      return db.select().from(ContactTable).where(eq(ContactTable.id, id));
    },

    create: async (data: InputContactFormSchema) => {
      return db.insert(ContactTable).values(data);
    },
  };
};
