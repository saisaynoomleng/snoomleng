import { RenderMedia } from '@/components/RenderMedia';
import { sanityFetch } from '@/sanity/live';
import { ALL_BLOGS_QUERY_ASC, ALL_BLOGS_QUERY_DESC } from '@/sanity/query';
import { BlogCard, Bounded, Button } from '@snoomleng/ui';
import clsx from 'clsx';
import Link from 'next/link';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; latest?: boolean }>;
}) {
  const { page, latest } = await searchParams;

  const isLatest = latest ? 'true' : 'false';

  const blogPerPage = 8;
  const currentPage = Number(page ?? '1');
  const startIndex = (currentPage - 1) * blogPerPage;
  const endIndex = startIndex + blogPerPage;

  const { data } = await sanityFetch({
    query: latest ? ALL_BLOGS_QUERY_DESC : ALL_BLOGS_QUERY_ASC,
    params: { startIndex, endIndex },
  });

  const { blogs, total } = data;
  const totalPages = Math.ceil(total / blogPerPage);

  return (
    <Bounded className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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

      {totalPages > 1 && (
        <div className="col-span-full flex gap-x-2 items-center justify-center">
          <Button variant="pagination" asChild disabled={currentPage === 1}>
            <Link
              href={{
                pathname: '/',
                query: {
                  ...(latest && { latest }),
                  page: currentPage > 1 ? currentPage - 1 : currentPage,
                },
              }}
              className={twMerge(
                clsx(
                  'border-none',
                  currentPage === 1 &&
                    'pointer-events-none text-muted-foreground',
                ),
              )}
            >
              <span>
                <MdKeyboardDoubleArrowLeft />
              </span>
              <span>Prev</span>
            </Link>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button key={pageNum} asChild variant="pagination">
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      ...(latest && { latest }),
                      page: pageNum,
                    },
                  }}
                  className={twMerge(
                    clsx(
                      currentPage === pageNum
                        ? 'border-primary text-primary'
                        : 'border-border text-black',
                    ),
                  )}
                >
                  {pageNum}
                </Link>
              </Button>
            ),
          )}

          <Button
            variant="pagination"
            asChild
            disabled={currentPage === totalPages}
          >
            <Link
              href={{
                pathname: '/',
                query: {
                  ...(latest && { latest }),
                  page:
                    currentPage === totalPages ? currentPage : currentPage + 1,
                },
              }}
              className={twMerge(
                clsx(
                  'border-none',
                  currentPage === totalPages &&
                    'pointer-events-none text-muted-foreground',
                ),
              )}
            >
              <span>Next</span>
              <span>
                <MdKeyboardDoubleArrowRight />
              </span>
            </Link>
          </Button>
        </div>
      )}
    </Bounded>
  );
}
