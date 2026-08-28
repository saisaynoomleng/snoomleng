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
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { ContactForm } from './ContactForm';
import { ContactDetail } from './ContactDetail';
import { AnimateSlideIn } from '#components/animations/index';

type ContactFormProps = {
  className?: string;
  action: (
    data: InputContactFormSchema,
  ) => Promise<ActionResponse<OutputContactFormSchema>>;
};

export const ContactFormSection = ({
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

      if (result.field) {
        form.setError(result.field as keyof InputContactFormSchema, {
          message: result.message,
        });
      }

      return;
    }

    form.reset();
    toast.success(result.message);
  };

  return (
    <Bounded
      className={twMerge(clsx('flex flex-col gap-y-4', className))}
      size="full"
      padding="none"
      id="contacts"
    >
      <AnimateSlideIn direction="top">
        <SectionTitle label="Let's Work Together" />
      </AnimateSlideIn>

      <div className="grid md:grid-cols-2 md:gap-x-6 gap-y-4 p-4">
        <AnimateSlideIn direction="left" className="h-full">
          <ContactForm form={form} onSubmit={onSubmit} />
        </AnimateSlideIn>

        <AnimateSlideIn direction="right" className="h-full">
          <ContactDetail />
        </AnimateSlideIn>
      </div>
    </Bounded>
  );
};
