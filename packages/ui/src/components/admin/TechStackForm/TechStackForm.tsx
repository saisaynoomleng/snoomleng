'use client';

import { Button } from '#components/ui/button';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { NativeSelect, NativeSelectOption } from '#components/ui/native-select';
import { nameToSlug, TechStackFormInputSchema } from '@snoomleng/utils';
import clsx from 'clsx';
import React from 'react';
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type TechStackFormProps = {
  className?: string;
  submitLabel: string;
  onSubmit: SubmitHandler<TechStackFormInputSchema>;
  form: UseFormReturn<TechStackFormInputSchema>;
};

const TECH_TYPES = [
  'frontend',
  'backend',
  'ai',
  'tooling',
  'devops',
  'badge',
  'cloud-and-infrastructure',
] as const;

export const TechStackForm = ({
  className,
  submitLabel,
  onSubmit,
  form,
}: TechStackFormProps): React.JSX.Element => {
  const generateSlug = () => {
    const name = form.watch('name');

    if (!name) {
      return form.setError('slug', {
        message: 'Input name first!',
      });
    }

    const slug = nameToSlug(name);

    if (!slug) {
      return form.setError('slug', {
        message: 'Invalid Slug!',
      });
    }

    form.setValue('slug', slug, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={twMerge(clsx('flex flex-col gap-y-6', className))}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              {...field}
              type="text"
              id="name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>
            <FieldDescription>
              Slug is required to generate a page on the website
            </FieldDescription>
            <div className="flex gap-x-2">
              <Input
                {...field}
                type="text"
                id="slug"
                aria-invalid={fieldState.invalid}
              />
              <Button
                type="button"
                variant="outline"
                className="shadow-none! translate-none!"
                onClick={generateSlug}
              >
                Generate
              </Button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="iconText"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="iconText">Icon Text</FieldLabel>
            <FieldDescription>
              Icon Text is required to generate an icon on the website
            </FieldDescription>
            <Input
              {...field}
              type="text"
              id="iconText"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="type"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="type">Tech Type</FieldLabel>
            <NativeSelect
              id="type"
              value={field.value}
              name={field.name}
              onChange={field.onChange}
            >
              {TECH_TYPES.map((type) => (
                <NativeSelectOption key={type} value={type}>
                  {type.toUpperCase()}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
        )}
      />

      <Field orientation="horizontal">
        <Button className="shadow-none! translate-none! self-start">
          {submitLabel}
        </Button>
      </Field>
    </form>
  );
};
