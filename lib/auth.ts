import { Issuer, Client, generators } from 'openid-client';
import { getSession } from './session';

let client: Client | null = null;

export async function getOidcClient(): Promise<Client> {
  if (client) return client;

  // Initialize OpenID Client
  const issuer = await Issuer.discover(
    'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_6m0O668r5'
  );

  client = new issuer.Client({
    client_id: process.env.COGNITO_CLIENT_ID || 'k6tana1l8b0bvhk9gfijkurr6',
    client_secret: process.env.COGNITO_CLIENT_SECRET || '',
    redirect_uris: [
      process.env.REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
    ],
    response_types: ['code'],
  });

  return client;
}

// Get user info from session
export async function getUserInfo() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return null;
  }

  return {
    username: session.username,
    userId: session.userId,
    // Add other user info from session
  };
}
