import { urlFor } from '@/sanity/image';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type RenderMediaProps = {
  className?: string;
  src: string;
  alt: string;
};

export const RenderMedia = ({
  className,
  src,
  alt,
}: RenderMediaProps): React.JSX.Element => {
  return (
    <Image
      src={urlFor(src).format('webp').url()}
      className={twMerge(clsx('', className))}
      priority
      alt={alt}
      fill
      sizes="(max-width: 100px) 100vw, 66vw"
    />
  );
};
