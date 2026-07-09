import createMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { isAdminEmail } from './lib/admin'

const intlMiddleware = createMiddleware(routing)
const PUBLIC_ADMIN_PATHS = ['/admin/login']

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin')) return intlMiddleware(request)

  let response = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  const isPublic = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))
  const isAdmin = isAdminEmail(user?.email ?? null, process.env.ADMIN_EMAILS)

  if (!isAdmin && !isPublic) return NextResponse.redirect(new URL('/admin/login', request.url))
  if (isAdmin && pathname === '/admin/login') return NextResponse.redirect(new URL('/admin', request.url))
  return response
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
}
