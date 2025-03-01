import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

// GET handler to retrieve session data
export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  return NextResponse.json({
    isLoggedIn: session.isLoggedIn,
    username: session.username,
    userId: session.userId,
  });
}

// POST handler to update session data
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  const data = await request.json();

  // Update session with data from request
  Object.assign(session, data);

  // Save the session
  await session.save();

  return NextResponse.json({
    isLoggedIn: session.isLoggedIn,
    username: session.username,
    userId: session.userId,
  });
}
