'use client';

import { Button } from '#components/ui/button';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { Pending } from './Pending';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type SubmitButtonProps = {
  className?: string;
  label: string;
};

export const SubmitButton = ({
  className,
  label,
}: SubmitButtonProps): React.JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={twMerge(clsx('', className))}
    >
      {pending ? <Pending /> : label}
    </Button>
  );
};
