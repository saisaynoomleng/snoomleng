import { urlFor } from '@/sanity/image';
import { Media } from '@snoomleng/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export const RenderMedia = ({
  className,
  props,
}: {
  className?: string;
  props: Media;
}): React.JSX.Element => {
  return (
    <div
      className={twMerge(
        clsx(
          'aspect-square w-full overflow-hidden relative mx-auto',
          className,
        ),
      )}
    >
      <Image
        src={urlFor(props.src).format('webp').url()}
        alt={props.alt}
        fill
        loading="eager"
        className="min-w-full"
        sizes="(max-width: 500px) 100vw, 66vw"
        priority
      />
    </div>
  );
};
