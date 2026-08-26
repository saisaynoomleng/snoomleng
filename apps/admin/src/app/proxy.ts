import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../lib/auth-server';
import { headers } from 'next/headers';

export async function proxy(request: NextRequest) {
  const publicRoutes = ['/sign-in', '/sign-up'];

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
