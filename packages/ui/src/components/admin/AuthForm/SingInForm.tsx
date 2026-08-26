'use client';

import { Button } from '#components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionResponse,
  SignInFormInputSchema,
  SignInFormOutputSchema,
  SignInFormSchema,
} from '@snoomleng/utils';
import clsx from 'clsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type SignInFormProps = {
  className?: string;
  action: (
    data: SignInFormInputSchema,
  ) => Promise<ActionResponse<SignInFormOutputSchema>>;
};

export const SignInForm = ({ className, action }: SignInFormProps) => {
  const form = useForm<SignInFormInputSchema>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormInputSchema> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      return form.setError(result.field as keyof SignInFormOutputSchema, {
        message: result.message,
      });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={twMerge(clsx('min-w-100', className))}
    >
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
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
              control={form.control}
              name="password"
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
          </FieldGroup>
        </CardContent>

        <CardFooter>
          <CardAction>
            <Field>
              <Button variant="outline">Sign In</Button>
            </Field>
          </CardAction>
        </CardFooter>
      </Card>
    </form>
  );
};
