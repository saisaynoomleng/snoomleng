import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ALL_CATEGORIES_QUERY } from '@/sanity/query';
import { Bounded, SectionTitle } from '@snoomleng/ui';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blog Categories',
  description:
    'Browse articles by category covering JavaScript, TypeScript, React, Next.js, backend development, software architecture, and modern web development.',
};
const CategoryPage = async (): Promise<React.JSX.Element> => {
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  return (
    <Bounded className="flex flex-col gap-y-4">
      <SectionTitle
        label="Explore through categories"
        size="sm"
        className="text-center leading-normal"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            href={`/category/${cat.slug}`}
            key={cat._id}
            className="flex flex-col gap-y-2 p-4 border-2 brand-box-shadow hover:-translate-y-1 transition-transform duration-200"
          >
            {cat.imageUrl && (
              <div className="overflow-hidden relative aspect-square w-full">
                <Image
                  src={urlFor(cat.imageUrl).format('webp').url()}
                  alt={cat.imageAlt || ''}
                  fill
                  sizes="(max-width: 150px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            <p className="font-heading font-bold text-center">{cat.name}</p>
          </Link>
        ))}
      </div>
    </Bounded>
  );
};

export default CategoryPage;
