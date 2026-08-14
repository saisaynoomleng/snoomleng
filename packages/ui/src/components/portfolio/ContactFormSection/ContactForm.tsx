'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '#components/ui/input-group';
import { Button } from '#components/ui/button';
import { InputContactFormSchema } from '@snoomleng/utils';
import React from 'react';
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type ContactFormProps = {
  form: UseFormReturn<InputContactFormSchema>;
  onSubmit: SubmitHandler<InputContactFormSchema>;
  className?: string;
};

export const ContactForm = ({
  form,
  onSubmit,
  className,
}: ContactFormProps): React.JSX.Element => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={twMerge(
        clsx('p-4 md:p-6 border-2 space-y-6 brand-box-shadow', className),
      )}
    >
      <div>
        <h3 className="font-semibold text-fs-500 font-heading">
          Put it in Writing
        </h3>
        <p className="col-span-full text-fs-300 font-semibold text-muted-foreground">
          Have a project, opportunity, or idea in mind? I'd love to hear about
          it.
        </p>
      </div>

      <FieldGroup className="grid md:grid-cols-2 md:gap-x-4 gap-y-4">
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
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                type="email"
                id="email"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-full">
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                {...field}
                type="text"
                id="subject"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-full">
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <InputGroup className="col-span-full">
                <InputGroupTextarea
                  {...field}
                  id="message"
                  aria-invalid={fieldState.invalid}
                  maxLength={3000}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length.toLocaleString()}/3000
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit">Send a Message</Button>
      </Field>
    </form>
  );
};
