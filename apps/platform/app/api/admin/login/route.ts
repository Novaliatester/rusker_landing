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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl}/admin/auth/confirm` },
  })
  if (error) {
    console.error('magic link send failed', error)
    return NextResponse.json({ error: 'Could not send link' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
