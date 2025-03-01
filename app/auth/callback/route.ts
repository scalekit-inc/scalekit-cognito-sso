import { NextRequest, NextResponse } from 'next/server';
import { getOidcClient } from '@/lib/auth';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const client = await getOidcClient();
    const session = await getSession();
    const params = client.callbackParams(request.url);
    const tokenSet = await client.callback(
      process.env.REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
      params
    );
    const userInfo = await client.userinfo(tokenSet);

    session.isLoggedIn = true;
    session.username = userInfo.preferred_username;
    session.userId = userInfo.sub;
    await session.save();

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(
      new URL('/auth?error=authentication_failed', request.url)
    );
  }
}
