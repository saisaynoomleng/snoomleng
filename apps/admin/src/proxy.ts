import { NextRequest, NextResponse } from 'next/server';
import { env } from './lib/env/server';

export async function proxy(request: NextRequest) {
  const publicRoutes = ['/sign-in', '/sign-up'];

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const response = await fetch(`${env.API_URL}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get('cookie') ?? '',
    },
  });

  const session = await response.json();

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
