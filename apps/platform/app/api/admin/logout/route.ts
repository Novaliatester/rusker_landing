import { NextResponse } from 'next/server'
import { getAuthClient } from '@/lib/supabase-auth'

export async function POST(request: Request) {
  const supabase = await getAuthClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 })
}
