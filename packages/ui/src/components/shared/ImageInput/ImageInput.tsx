'use client';

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
} from '#components/ui/attachment';
import { Field, FieldLabel, FieldError } from '#components/ui/field';
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
  onChange: (file: File) => void;
  className?: string;
  errorMessage?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'type'>;

export const ImageInput = ({
  onChange,
  className,
  errorMessage,
  ...props
}: ImageInputProps): React.JSX.Element => {
  const [preview, setPreview] = useState<PreviewProps>();

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview.src);
      }
    };
  }, [preview]);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview({
      file: file,
      src: URL.createObjectURL(file),
    });

    onChange(file);
  };

  return (
    <Field className={twMerge(clsx('flex flex-col gap-y-3', className))}>
      <FieldLabel htmlFor="image">Upload an Image</FieldLabel>

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

      <Input
        type="file"
        accept="image/*"
        id="image"
        onChange={onImageUpload}
        {...props}
      />

      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
};
