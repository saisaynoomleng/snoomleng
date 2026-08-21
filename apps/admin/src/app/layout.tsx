import type { Metadata } from 'next';
import './globals.css';
import { body, heading } from './lib/fonts';
import {
  SidebarProvider,
  SidebarTrigger,
  Toaster,
  TooltipProvider,
} from '@snoomleng/ui';
import { SidebarNav } from '@/components/SidebarNav';
import { QueryProvider } from '@/components/QueryProvider/QueryProvider';

export const metadata: Metadata = {
  title: 'snoomleng admin',
  description: 'snoomleng.com admin settings',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${heading} ${body} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <SidebarProvider>
            <QueryProvider>
              <SidebarNav />
              <SidebarTrigger className="shadow-none! border-none size-10 translate-none!" />
              {children}

              <Toaster richColors closeButton position="top-center" />
            </QueryProvider>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
