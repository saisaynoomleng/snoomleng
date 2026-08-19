import { RenderMedia } from '@/components/RenderMedia';
import { sanityFetch } from '@/sanity/live';
import { BLOGS_BY_CATEGORY_QUERY } from '@/sanity/query';
import { BlogCard, Bounded, SectionTitle } from '@snoomleng/ui';
import { formatTitle, replaceDashWithSpace } from '@snoomleng/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const title = replaceDashWithSpace(formatTitle(category));

  return {
    title: `${title} Blogs`,
    description: `Explore ${title} articles, tutorials, and insights covering software development, programming, and modern web technologies.`,
  };
}

export const CategoryDetailPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<React.JSX.Element> => {
  const { category } = await params;
  const title = category.split('-')[0];

  const { data: blogs } = await sanityFetch({
    query: BLOGS_BY_CATEGORY_QUERY,
    params: { category: title },
  });

  return (
    <Bounded spacing="lg">
      <SectionTitle label={title.toUpperCase()} />

      <div className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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

export default CategoryDetailPage;
