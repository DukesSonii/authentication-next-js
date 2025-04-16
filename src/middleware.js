// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const manualToken = req.cookies.get('token')?.value;
  const nextAuthToken =
    req.cookies.get('__Secure-next-auth.session-token')?.value ||
    req.cookies.get('next-auth.session-token')?.value;

  const isLoggedIn = manualToken || nextAuthToken;
  const { pathname } = req.nextUrl;

  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/Userdashboard', req.url));
  }

  if (!isLoggedIn && pathname.startsWith('/Userdashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
