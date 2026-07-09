import { NextResponse } from 'next/server'
import { getAuthClient } from '@/lib/supabase-auth'
import { isAdminEmail } from '@/lib/admin'

export async function POST(request: Request) {
  let email: unknown
  try {
    ;({ email } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  // Always answer 200 so the form can't be used to probe the allowlist.
  if (typeof email !== 'string' || !isAdminEmail(email, process.env.ADMIN_EMAILS)) {
    return NextResponse.json({ ok: true })
  }
  const supabase = await getAuthClient()
  // No emailRedirectTo → Supabase sends a one-time code (email template must render {{ .Token }}).
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) {
    console.error('OTP send failed', error)
    const rateLimited = error.status === 429 || error.code === 'over_email_send_rate_limit'
    return NextResponse.json(
      { error: rateLimited ? 'rate_limited' : 'send_failed' },
      { status: rateLimited ? 429 : 502 }
    )
  }
  return NextResponse.json({ ok: true })
}
