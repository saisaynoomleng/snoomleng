import { RenderMedia } from '@/components/RenderMedia';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ALL_BLOGS_QUERY, BLOG_QUERY } from '@/sanity/query';
import {
  BlogCard,
  Bounded,
  PortableTextBlock,
  PortableTextRenderer,
  SectionTitle,
} from '@snoomleng/ui';
import { formatDate } from '@snoomleng/utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

const getBlog = async ({ params }: ParamsProps) => {
  const { data } = await sanityFetch({
    query: BLOG_QUERY,
    params: await params,
  });

  if (!data) return notFound();

  const { seo } = data;

  return { data, seo };
};

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { seo } = await getBlog({ params });

  return {
    title: seo?.metaTitle || 'Blog',
    description: seo?.metaDescription || 'Blog',
    openGraph: {
      images: [...(seo?.ogImage || '')],
    },
  };
}

export async function generateStaticParams({ params }: ParamsProps) {
  const { data: blogs } = await sanityFetch({
    query: ALL_BLOGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return blogs.map((b) => ({ slug: b.slug }));
}

const BlogDetailPage = async ({ params }: ParamsProps) => {
  const { data: blog } = await getBlog({ params });

  const {
    name,
    publishedAt,
    body,
    imageUrl,
    imageAlt,
    focus,
    category,
    categorySlug,
  } = blog;

  return (
    <Bounded spacing="sm">
      {imageAlt && imageUrl && (
        <div className="overflow-hidden relative aspect-square max-w-150 mx-auto">
          <Image
            src={urlFor(imageUrl).format('webp').url()}
            alt={imageAlt}
            fill
            sizes="(max-width: 600px) 100vw, 66vw"
            className="min-w-full object-cover"
            priority
          />
        </div>
      )}

      <h2 className="font-semibold">{name}</h2>

      <div className="flex justify-between items-center font-bold text-muted-foreground text-fs-300">
        {publishedAt && <p>{formatDate(publishedAt)}</p>}
        <p>{focus}</p>
      </div>

      <Link href={`/category/${categorySlug}`}>
        <span>Category: </span>
        <span className="font-semibold underline link-url">{category}</span>
      </Link>

      {body && (
        <PortableTextRenderer
          value={body as PortableTextBlock[]}
          resolveImageUrl={(value) => urlFor(value).format('webp').url()}
        />
      )}

      <div className="space-y-6 md:space-y-8">
        <SectionTitle as="h3" label="Related Blogs" />

        <div className="overflow-x-auto overflow-y-hidden flex gap-x-4 py-4">
          {blog.relatedBlogs.map((b) => (
            <BlogCard
              key={b._id}
              name={b.name || ''}
              excerpt={b.excerpt || ''}
              publishedAt={b.publishedAt || ''}
              focus={b.focus || ''}
              category={b.category || ''}
              media={{ src: b.imageUrl || '', alt: b.imageAlt || '' }}
              renderMedia={({ src, alt }) => RenderMedia({ src, alt })}
              className="w-100 h-auto"
            />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default BlogDetailPage;
