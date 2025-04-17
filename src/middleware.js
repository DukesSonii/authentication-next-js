// middleware.js
import { NextResponse } from 'next/server';

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
    if (isUserLoggedIn && (pathname === '/User/login' || pathname === '/User/register')) {
      return NextResponse.redirect(new URL('/Userdashboard', req.url));
    }
    if (!isUserLoggedIn && pathname.startsWith('/Userdashboard')) {
      return NextResponse.redirect(new URL('/User/login', req.url));
    }
  }

  if (pathname.startsWith('/Seller')) {
    if (isSellerLoggedIn && (pathname === '/Seller/login' || pathname === '/Seller/register')) {
      return NextResponse.redirect(new URL('/SellerDashboard', req.url));
    }
    if (!isSellerLoggedIn && pathname.startsWith('/SellerDashboard')) {
      return NextResponse.redirect(new URL('/Seller/login', req.url));
    }
  }

  if(pathname.startsWith('/Admin')) {
    if (isAdminLoggedIn && pathname === '/Admin/login') {
      return NextResponse.redirect(new URL('/AdminDashboard', req.url));
    }
    if (!isAdminLoggedIn && pathname.startsWith('/AdminDashboard')) {
      return NextResponse.redirect(new URL('/Admin/login', req.url));
    }
  }
  return NextResponse.next();
}
