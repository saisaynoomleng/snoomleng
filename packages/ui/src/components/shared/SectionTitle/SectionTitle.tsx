import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Heading = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type SectionTitleProps<T extends Heading> = {
  as?: T;
  className?: string;
  label: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

export const SectionTitle = <T extends Heading>({
  as,
  className,
  label,
  ...props
}: SectionTitleProps<T>): React.JSX.Element => {
  const Comp = as ?? 'h2';

  return (
    <Comp
      className={twMerge(
        clsx(
          'font-heading uppercase font-bold tracking-wider flex gap-x-2 items-baseline',
          className,
        ),
      )}
      {...props}
    >
      <span className="w-2 h-2 bg-primary border border-border"></span>
      {label}
    </Comp>
  );
};
