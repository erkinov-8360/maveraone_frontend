import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/tours',
  '/destinations',
  '/about',
  '/contact',
  '/auth/google/callback',
  '/auth/facebook/callback',
];

const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('maveraone_auth_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route === pathname) return true;
    if (pathname.startsWith('/tours/')) return true;
    if (pathname.startsWith('/destinations/')) return true;
    return false;
  });

  // Redirect authenticated users away from auth pages
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login (except for public routes)
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
