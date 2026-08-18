'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { env } from '@/lib/env/client';
import Form from 'next/form';
import { Button } from '@snoomleng/ui';
import { IoClose } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  {
    name: 'About me',
    href: env.NEXT_PUBLIC_PORTFOLIO_URL ?? 'http://localhost:3000',
  },
];

export const DesktopNav = (): React.JSX.Element => {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="main menu"
      className="font-heading flex gap-x-4 md:gap-x-6 items-center max-md:hidden"
    >
      {NAV_LINKS.map((l) => {
        const target = l.href.startsWith('http') ? '_blank' : undefined;

        return (
          <Link
            href={l.href}
            key={l.href}
            className={twMerge(
              clsx(
                'font-bold hover:underline underline-offset-4 decoration-wavy decoration-primary',
                pathname === l.href && 'underline ',
              ),
            )}
            rel={target && 'noreferrer noindex'}
            target={target}
          >
            {l.name}
          </Link>
        );
      })}

      {/* search bar */}
      <Form action="" className="flex gap-x-2">
        <input type="text" className="border" />
        <button onClick={() => console.log('search')}>Search</button>
      </Form>
    </nav>
  );
};

export const MobileNav = (): React.JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : '';

    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);

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
        {NAV_LINKS.map((n) => {
          const target = n.href.startsWith('http') ? '_blank' : undefined;

          return (
            <Link
              key={n.href}
              href={n.href as string}
              className={twMerge(
                clsx(
                  'hover:underline underline-offset-4 decoration-wavy decoration-primary font-semibold',
                  pathname === n.href && 'underline',
                ),
              )}
              rel={target && 'noreferrer noindex'}
              target={target}
              onClick={() => setOpen(false)}
            >
              {n.name}
            </Link>
          );
        })}

        {/* search bar */}
      </nav>
    </>
  );
};
