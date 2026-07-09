import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin')) return NextResponse.next() // admin guard lands with the admin auth task
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
}
