'use client';

import React from 'react';
import { Bounded, SectionTitle } from '../../shared';
import {
  ActionResponse,
  ContactFormSchema,
  InputContactFormSchema,
  OutputContactFormSchema,
} from '@snoomleng/utils';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
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
import { Separator } from '#components/ui/separator';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '#components/ui/tooltip';

type ContactFormProps = {
  className?: string;
  action: (
    data: InputContactFormSchema,
  ) => Promise<ActionResponse<OutputContactFormSchema>>;
};

const LINKS = [
  {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/sai-say-noom-leng-72a94031a/',
  },
  {
    name: 'GitHub',
    icon: <SiGithub />,
    url: 'https://github.com/saisaynoomleng',
  },
  {
    name: 'LeetCode',
    icon: <SiLeetcode />,
    url: 'https://leetcode.com/u/saisaynoomleng/',
  },
];

export const ContactForm = ({
  className,
  action,
}: ContactFormProps): React.JSX.Element => {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: '',
      name: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<InputContactFormSchema> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);

      return form.setError(result.field as keyof InputContactFormSchema, {
        message: result.message,
      });
    }

    return toast.success(result.message);
  };

  return (
    <Bounded
      className={twMerge(clsx('flex flex-col gap-y-4', className))}
      size="full"
      padding="none"
    >
      <SectionTitle label="Let's Work Together" />

      <div className="grid md:grid-cols-2 md:gap-x-6 gap-y-4 p-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 md:p-6 border-2 space-y-6 brand-box-shadow"
        >
          <div>
            <h3 className="font-semibold text-fs-500 font-heading">
              Put it in Writing
            </h3>
            <p className="col-span-full text-fs-300 font-semibold text-muted-foreground">
              Have a project, opportunity, or idea in mind? I'd love to hear
              about it.
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
                    type="string"
                    id="name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                        {field.value.length}/3000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Send a letter</Button>
          </Field>
        </form>

        <div className="p-4 md:p-6 border-2 brand-box-shadow flex flex-col justify-between gap-y-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Direct Contact</p>
              <a
                href="mailto:saileng9723@gmail.com"
                target="_blank"
                className="hover:underline underline-offset-4 decoration-primary decoration-wavy"
              >
                saileng9723@gmail.com
              </a>
            </div>

            <Separator />

            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Availability</p>
              <p>
                Open to full-time, part-time, freelance, and contract
                opportunities. Always interested in good people, thoughtful
                projects, and interesting problems.
              </p>
            </div>

            <Separator />
          </div>

          <div className="flex items-end gap-x-4">
            {LINKS.map((link) => (
              <Tooltip>
                <TooltipTrigger asChild className="p-1 border">
                  <a key={link.name} target="_blank" href={link.url}>
                    <span className="text-fs-500">{link.icon}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>{link.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Bounded>
  );
};
