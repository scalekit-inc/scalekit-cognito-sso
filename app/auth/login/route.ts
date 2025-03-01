import { NextRequest, NextResponse } from 'next/server';
import { getOidcClient } from '@/lib/auth';
import { generators } from 'openid-client';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const client = await getOidcClient();
    const session = await getSession();

    // Generate nonce and state for security
    const nonce = generators.nonce();
    const state = generators.state();

    // Store nonce and state in session
    session.nonce = nonce;
    session.state = state;
    await session.save();

    // Generate authorization URL with enhanced security
    const authUrl = client.authorizationUrl({
      scope: 'openid email phone',
      state: state,
      nonce: nonce,
    });

    // Redirect to authorization URL
    const response = NextResponse.redirect(authUrl);

    // Set code verifier cookie
    // response.cookies.set('code_verifier', codeVerifier, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 10, // 10 minutes
    //   path: '/',
    // });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.redirect(
      new URL('/auth?error=login_failed', request.url)
    );
  }
}
