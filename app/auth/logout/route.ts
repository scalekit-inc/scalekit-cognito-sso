import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    // Clear all session data
    session.isLoggedIn = false;
    session.username = undefined;
    session.userId = undefined;
    session.userInfo = undefined;
    session.nonce = undefined;
    session.state = undefined;

    await session.save();

    // Get Cognito logout URL
    // Cognito logout URL format:
    // https://[domain].auth.[region].amazoncognito.com/logout?client_id=[app client id]&logout_uri=[redirect URI]
    const clientId =
      process.env.COGNITO_CLIENT_ID || 'k6tana1l8b0bvhk9gfijkurr6';
    const redirectUri = encodeURIComponent(
      new URL('/', request.url).toString()
    );

    // Using the domain name format from the Cognito console
    // Usually domain-prefix.auth.region.amazoncognito.com
    const cognitoDomain =
      process.env.COGNITO_DOMAIN ||
      'scalekit-cognito-demo.auth.eu-north-1.amazoncognito.com';

    const logoutUrl = `https://${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${redirectUri}`;

    // Redirect to Cognito logout endpoint
    return NextResponse.redirect(logoutUrl);
  } catch (error) {
    console.error('Logout error:', error);
    // If there's an error, still clear the session but redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
}
