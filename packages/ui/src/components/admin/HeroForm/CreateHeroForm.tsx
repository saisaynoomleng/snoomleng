'use client';

import React from 'react';
import { HeroForm } from './HeroForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ActionResponse,
  generateSanityKey,
  HeroFormInputSchema,
  HeroFormOutputSchema,
  HeroFormSchema,
} from '@snoomleng/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type CreateHeroFormProps = {
  action: (
    data: HeroFormInputSchema,
  ) => Promise<ActionResponse<HeroFormOutputSchema>>;
  imageUploadAction: (file: File) => Promise<string>;
};

export const CreateHeroForm = ({
  action,
  imageUploadAction,
}: CreateHeroFormProps): React.JSX.Element => {
  const form = useForm<HeroFormInputSchema>({
    resolver: zodResolver(HeroFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      positions: [
        {
          value: '',
        },
      ],
      title: '',
      body: [],
      imageAlt: '',
      imageAssetId: '',

      callToActions: [
        {
          _key: generateSanityKey(),
          href: '',
          label: '',
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<HeroFormInputSchema> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);

      return form.setError(result.field as keyof HeroFormInputSchema, {
        message: result.message,
      });
    }

    toast.success(result.message);
  };

  return (
    <HeroForm
      form={form}
      onSubmit={onSubmit}
      title="Create Hero Section"
      submitLabel="Create"
      imageUploadAction={imageUploadAction}
    />
  );
};
