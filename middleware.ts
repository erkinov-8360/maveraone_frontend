import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

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
  '/oauth/callback',
  '/blog',
];

const authRoutes = ['/login', '/register', '/forgot-password'];

function getLocale(request: NextRequest): string {
  // Get locale from pathname (e.g., /en/about -> en)
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) return pathnameLocale;

  // Get locale from cookie
  const localeCookie = request.cookies.get('locale')?.value;
  if (localeCookie && locales.includes(localeCookie as any)) {
    return localeCookie;
  }

  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(browserLocale as any)) {
      return browserLocale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale in pathname, redirect to the same pathname with locale prefix
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // Preserve search params
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
  }

  // Extract locale and path without locale
  const locale = pathname.split('/')[1];
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const token = request.cookies.get('maveraone_auth_token')?.value;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route === pathWithoutLocale) return true;
    if (pathWithoutLocale.startsWith('/tours/')) return true;
    if (pathWithoutLocale.startsWith('/destinations/')) return true;
    if (pathWithoutLocale.startsWith('/blog/')) return true;
    return false;
  });

  // Redirect authenticated users away from auth pages
  if (token && authRoutes.includes(pathWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Redirect unauthenticated users to login (except for public routes)
  if (!token && !isPublicRoute) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
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
