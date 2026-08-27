'use client';

import { Button } from '#components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormInputSchema, SignUpFormSchema } from '@snoomleng/utils';
import clsx from 'clsx';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type SignUpFormProps = {
  className?: string;
  onSubmit: SubmitHandler<SignUpFormInputSchema>;
};

export const SignUpForm = ({
  className,
  onSubmit,
}: SignUpFormProps): React.JSX.Element => {
  const form = useForm<SignUpFormInputSchema>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={twMerge(clsx('min-w-100 aspect-square', className))}
    >
      <Card className="">
        <CardHeader>
          <CardTitle>Welcome to snoomleng</CardTitle>
          <CardDescription>snoomleng Admin Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex flex-col justify-between">
          <Field orientation="horizontal">
            <Button variant="outline">Sign Up</Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
};
