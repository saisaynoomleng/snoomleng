import { CallToAction } from '@snoomleng/utils';
import Link from 'next/link';

export const RenderAction = ({
  props,
}: {
  props: CallToAction;
}): React.JSX.Element => {
  return <Link href={props.href}>{props.label}</Link>;
};
