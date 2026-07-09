import { NextResponse } from 'next/server'
import { getAuthClient } from '@/lib/supabase-auth'
import { isAdminEmail } from '@/lib/admin'

/** Verify the 6-digit email OTP and establish the admin session cookie. */
export async function POST(request: Request) {
  let email: unknown
  let token: unknown
  try {
    ;({ email, token } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (typeof email !== 'string' || typeof token !== 'string' || !isAdminEmail(email, process.env.ADMIN_EMAILS)) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 401 })
  }

  const supabase = await getAuthClient()
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
  if (error) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
