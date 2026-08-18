'use client';

import { HEADER_QUERY_RESULT } from '@/sanity/types';
import { Button } from '@snoomleng/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';

type NavLinksProps = {
  links: NonNullable<HEADER_QUERY_RESULT>['navigation'];
};

export const DesktopNav = ({
  links,
}: NavLinksProps): React.JSX.Element | null => {
  const pathname = usePathname();

  if (!links) return null;

  return (
    <nav
      role="navigation"
      aria-label="main menu"
      className="font-heading flex gap-x-4 md:gap-x-6 items-center max-md:hidden"
    >
      {links.map((n) => (
        <React.Fragment key={n._key}>
          {n.isButton ? (
            <Button type="button" asChild>
              <Link href={n.href as string} className="font-bold!">
                {n.label}
              </Link>
            </Button>
          ) : (
            <Link
              href={n.href as string}
              className={twMerge(
                clsx(
                  'hover:underline underline-offset-4 decoration-wavy decoration-primary font-semibold',
                  pathname === n.href && 'underline',
                ),
              )}
              rel={
                n.href?.startsWith('http') ? 'noreferrer noindex' : undefined
              }
              target={n.href?.startsWith('http') ? '_blank' : ''}
            >
              {n.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export const MobileNav = ({
  links,
}: NavLinksProps): React.JSX.Element | null => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : '';

    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);

  if (!links) return null;

  return (
    <>
      <Button
        variant="outline"
        className="relative z-50 shadow-none! md:hidden"
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        {open ? (
          <span>
            <IoClose />
          </span>
        ) : (
          <span>
            <RxHamburgerMenu />
          </span>
        )}
      </Button>

      <nav
        role="navigation"
        aria-label="main menu"
        className={twMerge(
          clsx(
            'md:hidden flex flex-col fixed bg-primary/10 inset-0 backdrop-blur-2xl transition-transform duration-200 ease-in-out justify-center items-center gap-y-4 z-40',
            open ? 'translate-y-0' : '-translate-y-full',
          ),
        )}
      >
        {links.map((n) => (
          <React.Fragment key={n._key}>
            {n.isButton ? (
              <Button type="button" asChild>
                <Link
                  href={n.href as string}
                  className="font-bold!"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </Button>
            ) : (
              <Link
                href={n.href as string}
                className={twMerge(
                  clsx(
                    'hover:underline underline-offset-4 decoration-wavy decoration-primary font-semibold',
                    pathname === n.href && 'underline',
                  ),
                )}
                rel={
                  n.href?.startsWith('http') ? 'noreferrer noindex' : undefined
                }
                target={n.href?.startsWith('http') ? '_blank' : ''}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};
