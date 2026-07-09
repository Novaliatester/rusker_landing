import { NextResponse } from 'next/server'
import { isRequestFromAdmin } from '@/lib/admin-guard'
import { adminDeleteExpedition } from '@/lib/admin-queries'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

/** Admin-only: hard-delete an expedition and all its orders (test cleanup). */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isRequestFromAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  await adminDeleteExpedition(id)
  return NextResponse.redirect(new URL('/admin', SITE), { status: 303 })
}
