import { RenderMedia } from '@/components/RenderMedia';
import { sanityFetch } from '@/sanity/live';
import { SEARCH_QUERY } from '@/sanity/query';
import { BlogCard, Bounded } from '@snoomleng/ui';
import Link from 'next/link';
import React from 'react';

const BlogSearch = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}): Promise<React.JSX.Element> => {
  const { search } = await searchParams;

  const toSearchKey = (value: string) => {
    return value
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}]+/gu, ' ')
      .trim();
  };

  const { data: blogs } = await sanityFetch({
    query: SEARCH_QUERY,
    params: {
      search: search ? `*${toSearchKey(search)}*` : null,
    },
  });

  return (
    <Bounded padding="none" className="min-h-screen py-6 px-3" spacing="sm">
      <p className="font-semibold md:text-fs-500">
        <span>Search results for </span>
        <span className="text-brand-primary-600">
          {search ? search : 'All'}
        </span>
      </p>

      <div className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-8 md:pb-12">
        {blogs.map((b) => (
          <Link href={`/blogs/${b.slug}`} key={b._id}>
            <BlogCard
              name={b.name || ''}
              excerpt={b.excerpt || ''}
              publishedAt={b.publishedAt || ''}
              focus={b.focus || ''}
              category={b.category || ''}
              media={{ src: b.imageUrl || '', alt: b.imageAlt || '' }}
              renderMedia={({ src, alt }) => RenderMedia({ src, alt })}
              className="min-w-full"
            />
          </Link>
        ))}
      </div>
    </Bounded>
  );
};

export default BlogSearch;
