import clsx from 'clsx';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { SITE_SETTINGS_QUERY } from '@/sanity/query';
import React from 'react';
import { Button } from '@snoomleng/ui';
import { DesktopNav, MobileNav } from './Nav';

type HeaderProps = {
  className?: string;
};

export const Header = async ({
  className,
}: HeaderProps): Promise<React.JSX.Element> => {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  if (!settings) return <>Loading...</>;

  return (
    <header
      className={twMerge(
        clsx(
          'flex items-center justify-between p-2 max-w-7xl mx-auto w-full',
          className,
        ),
      )}
    >
      <Link
        href="/"
        className="overflow-hidden relative w-10 aspect-square block"
      >
        <Image
          src={urlFor(settings.logoUrl || '')
            .format('webp')
            .url()}
          alt={settings.logoAlt || ''}
          fill
          loading="eager"
          sizes="(max-width: 50px) 100vw, 33vw"
          className="min-w-full"
        />
      </Link>

      <DesktopNav links={settings.navigation} />

      <MobileNav links={settings.navigation} />
    </header>
  );
};
