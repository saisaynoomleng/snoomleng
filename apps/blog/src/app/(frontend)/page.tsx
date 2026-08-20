import { HomePageFilter } from '@/components/HomePageFilter';
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
  searchParams: Promise<{ page?: string; filter?: 'latest' | 'oldest' }>;
}) {
  const { page, filter } = await searchParams;
  const isLatest = filter === 'latest';

  const blogPerPage = 8;
  const currentPage = Number(page ?? '1');
  const startIndex = (currentPage - 1) * blogPerPage;
  const endIndex = startIndex + blogPerPage;

  const { data } = await sanityFetch({
    query: isLatest ? ALL_BLOGS_QUERY_DESC : ALL_BLOGS_QUERY_ASC,
    params: { startIndex, endIndex },
  });

  const { blogs, total } = data;
  const totalPages = Math.ceil(total / blogPerPage);

  return (
    <Bounded
      className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-8 md:pb-12 py-4"
      padding="none"
    >
      <div className="col-span-full place-self-end">
        <HomePageFilter />
      </div>

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
                  ...(filter && { filter }),
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
                      ...(filter && { filter }),
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
                  ...(filter && { filter }),
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
