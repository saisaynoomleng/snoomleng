'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionResponse,
  TechStackFormInputSchema,
  TechstackFormOutputSchema,
  TechStackFormSchema,
} from '@snoomleng/utils';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { TechStackForm } from './TechStackForm';

type CreateTechStackFormProps = {
  action: (
    data: TechStackFormInputSchema,
  ) => Promise<ActionResponse<TechstackFormOutputSchema>>;
};

export const CreateTechStackForm = ({
  action,
}: CreateTechStackFormProps): React.JSX.Element => {
  const form = useForm<TechStackFormInputSchema>({
    resolver: zodResolver(TechStackFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      iconText: '',
      type: 'frontend',
    },
  });

  const onSubmit: SubmitHandler<TechStackFormInputSchema> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);

      return form.setError(result.field as keyof TechStackFormInputSchema, {
        message: result.message,
      });
    }

    toast.success(result.message);
  };

  return <TechStackForm form={form} onSubmit={onSubmit} submitLabel="Create" />;
};
