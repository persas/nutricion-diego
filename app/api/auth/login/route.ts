import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, signToken, COOKIE_NAME, getCookieOptions } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: 'Password incorrecto' }, { status: 401 });
    }

    const token = signToken(Date.now());
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, getCookieOptions());

    return response;
  } catch {
    return NextResponse.json({ error: 'Error en login' }, { status: 500 });
  }
}
