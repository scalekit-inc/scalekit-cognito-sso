import { SessionOptions } from 'iron-session';

export interface SessionData {
  isLoggedIn: boolean;
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    'complex_password_at_least_32_characters_long',
  cookieName: 'cognito-scalekit-session',
  cookieOptions: {
    // secure should be enabled in production
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
  },
};

// For type safety
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionData;
  }
}
