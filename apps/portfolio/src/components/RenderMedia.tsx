import { urlFor } from '@/sanity/image';
import { Media } from '@snoomleng/utils';
import Image from 'next/image';

export const RenderMedia = ({ props }: { props: Media }): React.JSX.Element => {
  return (
    <div className="aspect-square w-full overflow-hidden relative mx-auto">
      <Image
        src={urlFor(props.src).format('webp').url()}
        alt={props.alt}
        fill
        loading="eager"
        className="min-w-full"
      />
    </div>
  );
};
