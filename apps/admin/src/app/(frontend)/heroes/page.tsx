import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ALL_HEROES_QUERY } from '@/sanity/query';
import { Bounded, SectionTitle } from '@snoomleng/ui';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const HeroPage = async () => {
  const { data } = await sanityFetch({ query: ALL_HEROES_QUERY });

  if (!data) return notFound();

  const { total } = data;

  return (
    <Bounded centered={false} spacing="sm">
      <SectionTitle label="Page Heroes" />

      <p className="font-semibold">
        <span>Total Pages:</span>
        <span>{total}</span>
      </p>

      <div className="grid grid-cols-2 gap-4">
        {data.heroes.map((h) => (
          <Link
            href={`/heroes/${h.slug}`}
            key={h._id}
            className="max-w-100 border-2 border-border p-2 flex flex-col gap-y-3"
          >
            {h.imageAlt && h.imageUrl && (
              <div className="overflow-hidden relative">
                <Image
                  src={urlFor(h.imageUrl)
                    .format('webp')
                    .width(400)
                    .height(400)
                    .url()}
                  priority
                  alt={h.imageAlt}
                  width={400}
                  height={400}
                  className="min-w-full object-cover"
                />
              </div>
            )}

            <p>
              <span className="font-semibold">Name: </span>
              <span className="text-primary font-bold">{h.name}</span>
            </p>
          </Link>
        ))}
      </div>
    </Bounded>
  );
};

export default HeroPage;
