import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['ko', 'en'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) return NextResponse.next();
  const has = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (has) return NextResponse.next();
  const cookie = req.cookies.get('locale')?.value;
  const accept = req.headers.get('accept-language') || '';
  const locale = cookie && LOCALES.includes(cookie) ? cookie : accept.toLowerCase().startsWith('en') ? 'en' : 'ko';
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next|api|admin|images|favicon.ico).*)'] };
