import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Heading = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type SectionTitleProps<T extends Heading> = {
  as?: T;
  className?: string;
  label: string;
  size?: Size;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

type Size = 'sm' | 'md' | 'lg';

const sizeVariants: Record<Size, string> = {
  sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
  md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
  lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
};

export const SectionTitle = <T extends Heading>({
  as,
  className,
  label,
  size = 'sm',
  ...props
}: SectionTitleProps<T>): React.JSX.Element => {
  const Comp = as ?? 'h2';

  return (
    <Comp
      className={twMerge(
        clsx(
          'font-heading uppercase font-bold tracking-wider flex gap-x-2 items-baseline',
          sizeVariants[size],
          className,
        ),
      )}
      {...props}
    >
      <span className="w-2 md:w-3 lg:w-4 aspect-square bg-primary border border-border"></span>
      {label}
    </Comp>
  );
};
