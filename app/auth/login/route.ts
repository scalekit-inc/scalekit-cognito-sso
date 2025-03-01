import { NextRequest, NextResponse } from 'next/server';
import { getOidcClient } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const client = await getOidcClient();

    // Generate authorization URL
    const authUrl = client.authorizationUrl({
      scope: 'openid email phone',
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
