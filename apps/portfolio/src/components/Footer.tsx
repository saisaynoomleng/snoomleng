import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { FOOTER_QUERY } from '@/sanity/query';
import { Separator } from '@snoomleng/ui';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

type FooterProps = {
  className?: string;
};

const iconMap = {
  gitHub: <SiGithub aria-hidden={true} />,
  leetcode: <SiLeetcode aria-hidden={true} />,
  linkedIn: <FaLinkedin aria-hidden={true} />,
} as const;

export const Footer = async ({
  className,
}: FooterProps): Promise<React.JSX.Element> => {
  const { data: footer } = await sanityFetch({ query: FOOTER_QUERY });

  if (!footer) return <footer>...</footer>;

  const {
    footerColumns,
    footerText,
    logoAlt,
    logoUrl,
    contactInfo,
    socialLinks,
  } = footer;

  console.log(socialLinks);

  return (
    <footer
      className={twMerge(
        clsx(
          'px-4 md:px-6 lg:px-8 py-8 md:py-12 bg-foreground text-background/80 max-w-7xl mx-auto grid md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-6',
          className,
        ),
      )}
    >
      <div className="flex flex-col gap-y-2">
        <div className="overflow-hidden relative aspect-square w-20">
          {logoUrl && (
            <Image
              src={urlFor(logoUrl).format('webp').url()}
              alt={logoAlt || ''}
              fill
              sizes="(maxwidth: 100px) 100vw, 66vw"
            />
          )}
        </div>
        <p>{footerText}</p>
      </div>

      {footerColumns?.map((col) => (
        <div key={col._key} className="flex flex-col gap-y-2">
          <p className="font-bold text-muted-foreground uppercase">
            {col.columnTitle}
          </p>

          <div className="flex flex-col gap-y-1">
            {col.columnLinks?.map((link) => (
              <Link
                key={link._key}
                href={link.href as string}
                className="hover:underline underline-offset-4 decoration-wavy decoration-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-y-2">
        <p className="font-bold text-muted-foreground uppercase">the desk</p>
        {contactInfo && (
          <address className="flex gap-y-1 flex-col">
            <p className="flex gap-x-1 items-center">
              <span>{contactInfo.city},</span>
              <span>{contactInfo.state}</span>
            </p>

            <Link href={`mailto:${contactInfo.email}`} className="link-url">
              {contactInfo.email}
            </Link>
          </address>
        )}
      </div>

      <Separator className="col-span-full bg-background" />

      <div className="col-span-full flex flex-col gap-y-2 md:justify-between md:flex-row md:items-center">
        <p>
          <span>&copy; {new Date().getFullYear()} Sai Say Noom Leng</span>
          <span> ● </span>
          <span>All rights reserved</span>
        </p>

        <div className="flex gap-x-2 items-center">
          {socialLinks &&
            socialLinks.map((link) => {
              if (!link.platform || !link.url || !link.icon) return null;

              return (
                <Link
                  key={link._key}
                  href={link.url}
                  rel="noreferrer noindex"
                  target="_blank"
                  className="text-fs-500 hover:text-primary"
                >
                  {iconMap[link.icon]}
                </Link>
              );
            })}
        </div>
      </div>
    </footer>
  );
};
