import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { validateIdUpload, tmpKeyFor, ID_DOCUMENTS_BUCKET } from '@/lib/upload'

export async function POST(request: Request) {
  let file: File | null = null
  try {
    const form = await request.formData()
    const entry = form.get('file')
    if (entry instanceof File) file = entry
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })

  const invalid = validateIdUpload(file.name, file.type, file.size)
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 })

  const key = tmpKeyFor(file.name)
  const { error } = await getSupabase()
    .storage.from(ID_DOCUMENTS_BUCKET)
    .upload(key, Buffer.from(await file.arrayBuffer()), { contentType: file.type })
  if (error) {
    console.error('id upload failed', error)
    return NextResponse.json({ error: 'Upload failed — please try again' }, { status: 502 })
  }
  return NextResponse.json({ key })
}
