'use client';

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
} from '#components/ui/attachment';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldDescription,
  FieldError,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { formatImageSize, formatImageType } from '@snoomleng/utils';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { FaImages } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type PreviewProps = {
  file: File;
  src: string;
};

type ImageInputProps = {
  legend: string;
  errorMessage?: string;
  onChange: (file: File) => void;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'type'>;

export const ImageInput = ({
  legend,
  errorMessage,
  onChange,
  className,
  ...props
}: ImageInputProps): React.JSX.Element => {
  const [preview, setPreview] = useState<PreviewProps>();

  useEffect(() => {
    return () => {
      if (preview?.src) {
        URL.revokeObjectURL(preview.src);
      }
    };
  }, [preview?.src]);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    if (!file) return;

    setPreview({
      file: file,
      src: URL.createObjectURL(file),
    });

    onChange(file);
  };

  return (
    <FieldGroup className={twMerge(clsx('flex flex-col gap-y-3', className))}>
      <FieldSet>
        <FieldLegend>{legend}</FieldLegend>
        <FieldDescription>All fields are required</FieldDescription>
      </FieldSet>

      <AttachmentGroup className="self-center">
        {preview ? (
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={preview.src} alt="" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentDescription>
                Type: {formatImageType(preview.file.type)}
              </AttachmentDescription>
              <AttachmentDescription>
                Size: {formatImageSize(preview.file.size)}
              </AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ) : (
          <Attachment orientation="vertical">
            <AttachmentMedia variant="icon">
              <FaImages />
            </AttachmentMedia>
          </Attachment>
        )}
      </AttachmentGroup>

      <Field>
        <FieldLabel htmlFor="image">Upload an Image</FieldLabel>
        <Input
          type="file"
          accept="image/*"
          id="image"
          onChange={onImageUpload}
          {...props}
        />
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Field>
    </FieldGroup>
  );
};
