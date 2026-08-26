'use client';

import React from 'react';
import { ImageInput, PortableTextEditInput, SectionTitle } from '../../shared';
import {
  generateSanityKey,
  HeroFormInputSchema,
  nameToSlug,
  validateImage,
} from '@snoomleng/utils';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { Button } from '#components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';

type HeroFormProps = {
  title: string;
  submitLabel: string;
  form: UseFormReturn<HeroFormInputSchema>;
  onSubmit: SubmitHandler<HeroFormInputSchema>;
  className?: string;
  imageUploadAction: (file: File) => Promise<string>;
};

export const HeroForm = ({
  title,
  submitLabel,
  form,
  onSubmit,
  imageUploadAction,
  className,
}: HeroFormProps): React.JSX.Element => {
  const { register } = form;
  const { errors } = form.formState;

  const generateSlug = () => {
    const name = form.getValues('name');

    if (!name) {
      return form.setError('slug', {
        message: 'Input Name field first!',
      });
    }

    const slug = nameToSlug(name);

    if (!slug) {
      return form.setError('slug', {
        message: 'Invalid Slug',
      });
    }

    form.setValue('slug', slug, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const {
    fields: actionFields,
    append: appendAction,
    remove: removeAction,
  } = useFieldArray({
    control: form.control,
    name: 'callToActions',
  });

  const {
    fields: positionFields,
    append: appendPosition,
    remove: removePosition,
  } = useFieldArray({
    control: form.control,
    name: 'positions',
  });

  const onImageUpload =
    (onChange: (value: string) => void) => async (file: File) => {
      const result = validateImage(file);

      if (!result.success) {
        return form.setError('imageAssetId', {
          message: result.message,
        });
      }

      const assetId = await imageUploadAction(result.file);

      if (!assetId) {
        return form.setError('imageAssetId', {
          message: 'Upload Fail',
        });
      }

      onChange(assetId);

      form.clearErrors('imageAssetId');
    };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={twMerge(clsx('flex flex-col gap-y-6', className))}
    >
      <SectionTitle label={title} />

      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              {...field}
              id="name"
              type="text"
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
            <div className="flex gap-x-2 items-center">
              <Input
                {...field}
                type="text"
                id="slug"
                aria-invalid={fieldState.invalid}
              />
              <Button type="button" variant="toolbar" onClick={generateSlug}>
                Generate
              </Button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle>Positions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-1">
          {positionFields.map((f, i) => (
            <Controller
              key={f.id}
              name={`positions.${i}.value`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={`positions.${i}.value`}>
                    Value {i + 1}
                  </FieldLabel>
                  <div className="flex gap-x-1 items-center">
                    <Input
                      {...field}
                      type="text"
                      id={`positions.${i}.value`}
                      aria-invalid={fieldState.invalid}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      className="shadow-none! translate-none!"
                      onClick={() => removePosition(i)}
                    >
                      Remove
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => appendPosition({ value: '' })}
            type="button"
            variant="toolbar"
          >
            Add New Position
          </Button>
        </CardFooter>
      </Card>

      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              {...field}
              type="text"
              id="title"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="body"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="body">Text Content</FieldLabel>
            <PortableTextEditInput
              value={field.value}
              onChange={field.onChange}
            />
          </Field>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle>Call to Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          {actionFields.map((f, i) => (
            <FieldGroup key={f.id} className="border p-2 gap-x-2">
              <FieldSet>
                <FieldLegend>Action {i + 1}</FieldLegend>
              </FieldSet>

              <Field>
                <FieldLabel className={`callToActions.${i}.label`}>
                  Label
                </FieldLabel>
                <Input
                  id={`callToActions.${i}.label`}
                  {...form.register(`callToActions.${i}.label`)}
                />
                {errors.callToActions?.[i]?.label && (
                  <FieldError>
                    {errors.callToActions[i].label.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel className={`callToActions.${i}.href`}>
                  URL
                </FieldLabel>
                <Input
                  id={`f.${i}.href`}
                  {...form.register(`callToActions.${i}.href`)}
                />
                {errors.callToActions?.[i]?.href && (
                  <FieldError>
                    {errors.callToActions[i].href.message}
                  </FieldError>
                )}
              </Field>

              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="destructive"
                  className="shadow-none! translate-none!"
                  onClick={() => removeAction(i)}
                >
                  Remove
                </Button>
              </Field>
            </FieldGroup>
          ))}
        </CardContent>

        <CardFooter>
          <Button
            type="button"
            variant="toolbar"
            onClick={() =>
              appendAction({
                _key: generateSanityKey(),
                href: '',
                label: '',
              })
            }
          >
            Add new
          </Button>
        </CardFooter>
      </Card>

      <Controller
        name="imageAssetId"
        control={form.control}
        render={({ field, fieldState }) => (
          <ImageInput
            onChange={onImageUpload(field.onChange)}
            errorMessage={fieldState.error?.message || ''}
            aria-invalid={fieldState.invalid}
          />
        )}
      />

      <Controller
        name="imageAlt"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="imageAlt">Image Alternative Text</FieldLabel>
            <FieldDescription>
              Image Alternative Text is required for Screen Reader
            </FieldDescription>
            <Input
              {...field}
              id="imageAlt"
              aria-invalid={fieldState.invalid}
              type="text"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Field orientation="horizontal">
        <Button>{submitLabel}</Button>
      </Field>
    </form>
  );
};
