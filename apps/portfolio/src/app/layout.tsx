import type { Metadata } from 'next';
import './globals.css';
import { SanityLive } from '@/sanity/live';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster, TooltipProvider } from '@snoomleng/ui';
import { Josefin_Slab, Open_Sans } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: {
    template: '%s | snoomleng',
    default: 'snoomleng',
  },
  description: `Portfolio of Sai Say Noom Leng, a software engineer building modern web applications with a focus on frontend development, full-stack architecture, and thoughtful user experiences.`,
};

export const heading = Josefin_Slab({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: 'normal',
});

export const body = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: 'normal',
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={twMerge(
          clsx(`${body} ${heading} antialiased`, 'min-h-full flex flex-col'),
        )}
      >
        <TooltipProvider>
          <Header />
          {children}
          <Footer />
        </TooltipProvider>

        <Toaster richColors position="bottom-center" duration={2} closeButton />
        <SanityLive />
      </body>
    </html>
  );
}
