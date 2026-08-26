import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { HERO_QUERY } from '@/sanity/query';
import {
  Bounded,
  PortableTextBlock,
  PortableTextRenderer,
  SectionTitle,
  Separator,
} from '@snoomleng/ui';
import { formatTitle } from '@snoomleng/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EditForm } from './EditForm';

const HeroDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: page } = await sanityFetch({
    query: HERO_QUERY,
    params: await params,
  });

  if (!page) return notFound();

  const { name, position, title, body, imageUrl, imageAlt, actions } = page;

  const SPAN_CLASSES = 'font-semibold text-primary';

  return (
    <Bounded centered={false} size="full" spacing="sm">
      <SectionTitle label={`${name}'s Hero Page`} />

      <div className="grid grid-cols-2 justify-between">
        {imageUrl && imageAlt && (
          <div className="overflow-hidden relative max-w-150 aspect-square">
            <Image
              src={urlFor(imageUrl).width(600).height(600).format('webp').url()}
              alt={imageAlt || ''}
              fill
              priority
              className="min-w-full object-cover"
              sizes="(max-width: 400px) 100vw, 44vw"
            />
          </div>
        )}

        <div className="flex flex-col gap-y-3">
          <p>
            <span>Name: </span>
            <span className={SPAN_CLASSES}>{name}</span>
          </p>

          <p>
            <span>Positions: </span>

            {position?.map((p, i) => {
              if (i !== 0)
                return (
                  <span key={i} className={SPAN_CLASSES}>
                    {' '}
                    • {p}
                  </span>
                );

              return (
                <span key={i} className={SPAN_CLASSES}>
                  {p}
                </span>
              );
            })}
          </p>

          <p>
            <span>Hero Title: </span>
            {title && (
              <span className="font-semibold text-primary">
                {formatTitle(title)}
              </span>
            )}
          </p>

          <div className="border-l-2 border-primary pl-2 space-y-2">
            <p className={SPAN_CLASSES}>Text Content</p>
            {body && (
              <PortableTextRenderer value={body as PortableTextBlock[]} />
            )}
          </div>

          <div className="border-l-2 border-primary pl-2 space-y-2">
            <p className={SPAN_CLASSES}>Actions</p>
            {actions?.map((a) => (
              <p key={a._key}>
                <span className={SPAN_CLASSES}>{a.label}</span>
                <span> {'=>'} </span>
                <span className={SPAN_CLASSES}>{a.href}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <EditForm data={page} />
    </Bounded>
  );
};

export default HeroDetailPage;
