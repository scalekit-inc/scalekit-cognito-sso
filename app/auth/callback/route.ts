import { NextRequest, NextResponse } from 'next/server';
import { getOidcClient } from '@/lib/auth';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const client = await getOidcClient();
    const session = await getSession();
    const params = client.callbackParams(request.url);

    // Call the callback method with nonce and state verification options
    const tokenSet = await client.callback(
      process.env.REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
      params,
      {
        nonce: session.nonce,
        state: session.state,
      }
    );

    // Get user info from the token
    const userInfo = await client.userinfo(tokenSet);

    // Clear state and nonce from session
    session.state = undefined;
    session.nonce = undefined;

    // Store complete userInfo in session
    session.isLoggedIn = true;
    session.userInfo = userInfo;
    session.username = userInfo.preferred_username;
    session.userId = userInfo.sub;
    await session.save();

    // Redirect to home page like in Express example
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
