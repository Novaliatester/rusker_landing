'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex gap-1 text-sm">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          className={`rounded px-2 py-1 uppercase ${l === locale ? 'bg-rusker-blue text-white' : 'text-gray-500 hover:text-rusker-blue'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
