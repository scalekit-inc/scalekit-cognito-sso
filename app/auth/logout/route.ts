import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  const session = await getSession();

  // Clear session data
  session.isLoggedIn = false;
  session.username = undefined;
  session.userId = undefined;

  await session.save();

  // Redirect to home page after logout
  return NextResponse.redirect(new URL('/', request.url));
}
