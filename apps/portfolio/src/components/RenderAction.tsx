import { CallToAction } from '@snoomleng/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const RenderAction = ({
  className,
  props,
}: {
  props: CallToAction;
  className?: string;
}): React.JSX.Element => {
  return (
    <Link href={props.href} className={twMerge(clsx(className))}>
      {props.label}
    </Link>
  );
};
