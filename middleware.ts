import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './lib/session';

export async function middleware(request: NextRequest) {
  const session = await getIronSession(request, NextResponse, sessionOptions);

  // Check if user is logged in for protected routes
  if (
    !session.isLoggedIn &&
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
