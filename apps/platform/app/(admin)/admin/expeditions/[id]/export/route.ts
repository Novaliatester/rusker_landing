import { getExpeditionManifest } from '@/lib/admin-queries'
import { participantsCsv } from '@/lib/csv'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { title, rows } = await getExpeditionManifest(id)
  const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-participants.csv`
  return new Response(participantsCsv(rows), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
