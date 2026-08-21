import type { Metadata } from 'next';
import './globals.css';
import { body, heading } from '../lib/fonts';
import {
  SidebarProvider,
  SidebarTrigger,
  Toaster,
  TooltipProvider,
} from '@snoomleng/ui';
import { SidebarNav } from '@/components/SidebarNav';
import { QueryProvider } from '@/components/QueryProvider/QueryProvider';
import { sanityFetch, SanityLive } from '@/sanity/live';
import { LOGO_QUERY } from '@/sanity/query';

export const metadata: Metadata = {
  title: 'snoomleng admin',
  description: 'snoomleng.com admin settings',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const { data: logo } = await sanityFetch({ query: LOGO_QUERY });

  return (
    <html
      lang="en"
      className={`${heading} ${body} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <SidebarProvider>
            <QueryProvider>
              <SidebarNav
                media={{ src: logo?.imageUrl || '', alt: logo?.imageAlt || '' }}
              />
              <SidebarTrigger className="shadow-none! border-none size-10 translate-none!" />
              {children}

              <SanityLive />
              <Toaster richColors closeButton position="top-center" />
            </QueryProvider>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
