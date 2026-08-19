import { env } from '@/lib/env/client';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { BLOG_LOGO_QUERY, FOOTER_QUERY } from '@/sanity/query';
import { Separator } from '@snoomleng/ui';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiLeetcode } from 'react-icons/si';

type FooterProps = {
  className?: string;
};

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/category' },
  {
    label: 'About Me',
    href: env.NEXT_PUBLIC_PORTFOLIO_URL ?? 'http://localhost:3000',
  },
];

const iconMap = {
  gitHub: SiGithub,
  leetcode: SiLeetcode,
  linkedIn: FaLinkedin,
} as const;

const Footer = async ({
  className,
}: FooterProps): Promise<React.JSX.Element> => {
  const { data: footer } = await sanityFetch({ query: FOOTER_QUERY });

  return (
    <footer
      className={clsx(
        'px-4 md:px-6 lg:px-8 py-8 md:py-12 bg-foreground text-background/80 max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr] gap-4 md:gap-6 text-fs-300',
        className,
      )}
    >
      <div>
        <Link href="/" className="block w-fit">
          {footer?.logoUrl && footer.logoAlt && (
            <Image
              src={urlFor(footer.logoUrl).format('webp').url()}
              alt={footer.logoAlt}
              width={100}
              height={100}
              priority
              className="min-w-full object-cover"
            />
          )}
        </Link>
        <p>A place to share what I build, learn, and discover along the way.</p>
      </div>

      <div>
        <p className="font-semibold text-fs-500">Helpful Links</p>
        <div className="flex flex-col gap-y-1">
          {FOOTER_LINKS.map((l) => (
            <Link href={l.href} key={l.href} className="link-url">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <Separator className="col-span-full bg-background/30" />

      <div className="col-span-full flex flex-col gap-y-2 md:justify-between md:flex-row md:items-center">
        <p>
          <span>&copy; {new Date().getFullYear()} Sai Say Noom Leng</span>
          <span> ● </span>
          <span>All rights reserved</span>
        </p>

        <div className="flex gap-x-2 items-center">
          {footer?.socialLinks &&
            footer.socialLinks.map((link) => {
              if (!link.platform || !link.url || !link.icon) return null;
              const Icon =
                iconMap[link.icon as unknown as keyof typeof iconMap];

              return (
                <Link
                  key={link._key}
                  href={link.url}
                  rel="noreferrer noindex"
                  target="_blank"
                  className="text-fs-500 hover:text-primary"
                >
                  <span className="sr-only">{link.platform}</span>
                  <Icon aria-hidden={true} />
                </Link>
              );
            })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
