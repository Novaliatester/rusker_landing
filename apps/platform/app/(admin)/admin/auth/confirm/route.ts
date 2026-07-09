import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { getAuthClient } from '@/lib/supabase-auth'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const tokenHash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type') as EmailOtpType | null
  if (tokenHash && type) {
    const supabase = await getAuthClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) return NextResponse.redirect(new URL('/admin', url.origin))
  }
  return NextResponse.redirect(new URL('/admin/login', url.origin))
}
