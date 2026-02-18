import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, isAdminFromCookies } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isAdmin = isAdminFromCookies(token);
  return NextResponse.json({ isAdmin });
}
