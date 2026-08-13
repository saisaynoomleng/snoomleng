import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type BoundedProps<T extends React.ElementType> = {
  as?: T;
  size?: Size;
  padding?: Padding;
  spacing?: Spacing;
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

type Size = 'sm' | 'md' | 'full';

type Padding = 'none' | 'sm' | 'md' | 'lg';

type Spacing = 'none' | 'sm' | 'md' | 'lg';

const sizeVariants: Record<Size, string> = {
  sm: 'max-w-4xl',
  md: 'max-w-7xl',
  full: 'max-w-none',
};

const paddingVariants: Record<Padding, string> = {
  none: '',
  sm: 'px-4 md:px-6 lg:px-8 py-4',
  md: 'px-6 md:px-8 lg:px-10 py-6',
  lg: 'px-8 md:px-10 lg:px-12 py-8',
};

const spacingVariants: Record<Spacing, string> = {
  none: '',
  sm: 'space-y-4 md:space-y-6 lg:space-y-8',
  md: 'space-y-6 md:space-y-8 lg:space-y-10',
  lg: 'space-y-8 md:space-y-10 lg:space-y-12',
};

export const Bounded = <T extends React.ElementType>({
  as,
  size = 'md',
  padding = 'md',
  spacing = 'none',
  centered = true,
  className,
  children,
  ...props
}: BoundedProps<T>): React.JSX.Element => {
  const Comp = as ?? 'section';

  return (
    <Comp
      className={twMerge(
        clsx(
          sizeVariants[size],
          paddingVariants[padding],
          spacingVariants[spacing],
          centered && 'mx-auto',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
