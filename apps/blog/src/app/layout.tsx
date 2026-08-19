import type { Metadata } from 'next';
import { Josefin_Slab, Open_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { SanityLive } from '@/sanity/live';

export const metadata: Metadata = {
  title: {
    default: 'Snoom Leng Blog',
    template: '%s | Snoom Leng',
  },
  description:
    'Explore articles on web development, JavaScript, TypeScript, React, Next.js, backend architecture, and modern software engineering.',
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
      className={`${heading} ${body} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">
        <Header />
        {children}

        <SanityLive />
      </body>
    </html>
  );
}
