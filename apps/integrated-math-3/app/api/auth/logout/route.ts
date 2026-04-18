import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME } from '@math-platform/core-auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });

  return NextResponse.json({ ok: true });
}
