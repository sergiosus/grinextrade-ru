import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

const localePathRegex = /^\/(ru|en)(\/|$)/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files, api, admin, and unlocalized app routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard')
  ) {
    return NextResponse.next();
  }

  // Old locale URLs → default (ru), preserve path
  const legacy = pathname.match(/^\/(kz|uz|kg|tj)(\/.*)?$/);
  if (legacy) {
    const rest = legacy[2] ?? '/';
    return NextResponse.redirect(new URL(`/${defaultLocale}${rest}`, request.url));
  }

  const hasLocale = localePathRegex.test(pathname);
  if (hasLocale) {
    return NextResponse.next();
  }

  // Root: always show Russian (default locale for grinextrade.ru)
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // Unknown path without locale: assume default
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
