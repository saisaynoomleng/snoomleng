import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { BLOG_LOGO_QUERY } from '@/sanity/query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DesktopNav, MobileNav } from './NavMenu';

export const Header = async (): Promise<React.JSX.Element> => {
  const { data: logo } = await sanityFetch({ query: BLOG_LOGO_QUERY });

  return (
    <header className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto w-full shadow">
      {logo?.imageUrl && logo?.imageAlt ? (
        <Link href="/" className="overflow-hidden relative w-30 h-15 block">
          <Image
            src={urlFor(logo.imageUrl)
              .format('webp')
              .width(200)
              .height(100)
              .url()}
            alt={logo.imageAlt}
            fill
            className="min-h-full object-contain"
            sizes="(max-width: 100px) 100vw, 33vw"
            priority
          />
        </Link>
      ) : null}

      {/* DesktopNav */}
      <DesktopNav />

      <MobileNav />
    </header>
  );
};
