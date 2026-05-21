import createMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const filtered = cookieHeader
    .split(';')
    .filter(c => !c.trim().startsWith('NEXT_LOCALE='))
    .join(';')
    .trim();

  const headers = new Headers(request.headers);
  if (filtered) headers.set('cookie', filtered);
  else headers.delete('cookie');

  return intlMiddleware(new NextRequest(request.url, { headers, method: request.method }));
}

export const config = {
  matcher: ['/((?!api|_next|_bin|.*\\..*).*)'],
};
