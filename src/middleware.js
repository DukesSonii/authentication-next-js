// middleware.js
import { NextResponse } from 'next/server';
import { ROUTES } from './lib/route';

export function middleware(req) {
  const userManualToken = req.cookies.get('token')?.value; 
  const sellerToken = req.cookies.get('seller_token')?.value; 
  const adminToken = req.cookies.get('adminToken')?.value; 
  
  const nextAuthToken =
    req.cookies.get('__Secure-next-auth.session-token')?.value ||
    req.cookies.get('next-auth.session-token')?.value;

  const isUserLoggedIn = !!(userManualToken || nextAuthToken);
  const isSellerLoggedIn = !!sellerToken;
  const isAdminLoggedIn = !!adminToken;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/User')) {
    if (isUserLoggedIn && (pathname === '/user/login' || pathname === '/account/register')) {
      return NextResponse.redirect(new URL('/user-dashboard', req.url));
    }
    if (!isUserLoggedIn && pathname.startsWith('/user-dashboard')) {
      return NextResponse.redirect(new URL('/account/login', req.url));
    }
  }

  if (pathname.startsWith('/seller')) {
    if (isSellerLoggedIn && (pathname === '/seller/login' || pathname === '/seller/register')) {
      return NextResponse.redirect(new URL('/seller-dashboard', req.url));
    }
    if (!isSellerLoggedIn && pathname.startsWith('/seller-dashboard')) {
      return NextResponse.redirect(new URL('/seller/login', req.url));
    }
  }

  if(pathname.startsWith('/admin')) {
    if (isAdminLoggedIn && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin-dashboard', req.url));
    }
    if (!isAdminLoggedIn && pathname.startsWith('/admin-dashboard')) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  return NextResponse.next();
}
