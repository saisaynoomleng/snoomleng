'use client';

import { Field, FieldError, FieldLabel } from '#components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '#components/ui/input-group';
import { Textarea } from '#components/ui/textarea';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaWithCountProps = {
  maxLength: number;
  className?: string;
  label: string;
  errorMessage?: string;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'maxLength'>;

export const TextareaWithCount = ({
  maxLength,
  className,
  label,
  errorMessage,
  onChange,
  ...props
}: TextareaWithCountProps): React.JSX.Element => {
  const [length, setLenghth] = useState<number>(0);

  const isReachedLimit = length === maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLenghth(e.target.value.length);
    onChange?.(e);
  };

  return (
    <Field className={twMerge(clsx('flex flex-col', className))}>
      <FieldLabel htmlFor={label.toLowerCase()}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id={label.toLowerCase()}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="tabular-nums" data-testid="char">
            {length}/{maxLength}
          </InputGroupText>
          {isReachedLimit && (
            <InputGroupText data-testid="max" className="text-brand-error-700">
              Maximum characters reached
            </InputGroupText>
          )}
        </InputGroupAddon>
      </InputGroup>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
};
