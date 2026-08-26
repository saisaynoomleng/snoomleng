'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { HeroForm } from './HeroForm';
import {
  ActionResponse,
  HeroFormInputSchema,
  HeroFormOutputSchema,
  HeroFormSchema,
} from '@snoomleng/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type EditHeroFormProps = {
  data: HeroFormOutputSchema;
  action: (
    data: HeroFormInputSchema,
  ) => Promise<ActionResponse<HeroFormOutputSchema>>;
  imageUploadAction: (file: File) => Promise<string>;
};

export const EditHeroForm = ({
  data,
  action,
  imageUploadAction,
}: EditHeroFormProps) => {
  const form = useForm<HeroFormInputSchema>({
    resolver: zodResolver(HeroFormSchema),
    defaultValues: {
      name: data.name ?? '',
      slug: data.slug ?? '',
      positions: data.positions ?? [],
      title: data.title ?? '',
      imageAssetId: data.imageAssetId ?? '',
      imageAlt: data.imageAlt ?? '',
      callToActions: data.callToActions ?? [],
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
      submitLabel="Edit"
      title="Edit Hero Form"
      imageUploadAction={imageUploadAction}
    />
  );
};
