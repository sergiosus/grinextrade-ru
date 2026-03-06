import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

const localePathRegex = /^\/(ru|en|kz|uz|kg|tj)(\/|$)/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files and api
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/admin')
  ) {
    return NextResponse.next();
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
