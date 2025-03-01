import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Log the requested path for debugging
  console.log(`Middleware processing request for: ${request.nextUrl.pathname}`);

  // Get the ID token from cookies
  const idToken = request.cookies.get('id_token')?.value;
  const tokenExpiresAt = request.cookies.get('token_expires_at')?.value;

  // Log cookie state for debugging
  console.log(
    `Auth state - ID Token exists: ${!!idToken}, Expires At: ${
      tokenExpiresAt || 'N/A'
    }`
  );

  // Check if user is trying to access a protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Protected route detected, checking authentication...');

    // If no token exists, redirect to auth page
    if (!idToken) {
      console.log('No ID token found, redirecting to auth page');
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    try {
      // Check if token is expired
      if (tokenExpiresAt && parseInt(tokenExpiresAt) * 1000 < Date.now()) {
        console.log('Token is expired, redirecting to auth page');
        return NextResponse.redirect(new URL('/auth', request.url));
      }

      // For additional security, you could verify the token signature here
      // This is a basic check that the token is properly formatted
      const tokenParts = idToken.split('.');
      if (tokenParts.length !== 3) {
        console.log('Invalid token format, redirecting to auth page');
        throw new Error('Invalid token format');
      }

      // Decode token payload for debugging (do not log in production)
      if (process.env.NODE_ENV !== 'production') {
        try {
          const payload = JSON.parse(
            Buffer.from(tokenParts[1], 'base64').toString()
          );
          console.log('Token payload:', JSON.stringify(payload, null, 2));

          // Check the expiration time from the token itself
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            console.log(
              'Token claims it is expired (from payload), redirecting to auth page'
            );
            return NextResponse.redirect(new URL('/auth', request.url));
          }
        } catch (e) {
          console.error('Error decoding token payload:', e);
        }
      }

      console.log('Authentication successful, proceeding to protected route');
      // Continue to the protected route
      return NextResponse.next();
    } catch (error) {
      console.error('Token validation error:', error);
      // If token validation fails, redirect to auth page
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  // For non-protected routes, continue normally
  console.log('Non-protected route, continuing normally');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
