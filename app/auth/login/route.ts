import { NextRequest, NextResponse } from 'next/server';
import { getOidcClient } from '@/lib/auth';
import { generators } from 'openid-client';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const client = await getOidcClient();
    const session = await getSession();

    // Get email from search params
    const searchParams = new URL(request.url).searchParams;
    const email = searchParams.get('email') || '';

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
      identity_provider: 'ScalekitOIDC123',
      login_hint: email,
    });
    const response = NextResponse.redirect(authUrl);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.redirect(
      new URL('/auth?error=login_failed', request.url)
    );
  }
}
