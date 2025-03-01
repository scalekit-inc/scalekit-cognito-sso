import { Issuer, Client, generators } from 'openid-client';

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
