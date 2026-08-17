import { InputContactFormSchema } from '@snoomleng/utils';
import { contactRepository } from './contact.respository';

export const contactService = () => {
  const repository = contactRepository();

  return {
    getAll: async () => {
      return repository.findAll();
    },
    getById: async (id: string) => {
      return repository.findById(id);
    },
    create: async (data: InputContactFormSchema) => {
      return repository.create(data);
    },
  };
};
