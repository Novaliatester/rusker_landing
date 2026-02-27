'use client'

import Link from 'next/link'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export default function NetworkFooter() {
  const { t } = useI18n()
  return (
    <footer className="bg-[#4a0d1c] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <img 
                src={getAssetPath('/images/2026 Rusker/Logos/Rusker NETWORK (white).png')} 
                alt="Rusker Network" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">{t('common.home')}</Link>
            <Link href="/form" className="hover:text-white transition-colors">{t('common.form')}</Link>
            <a href="mailto:info@rusker-travel.com" className="hover:text-white transition-colors">{t('footer.contact')}</a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/40">
            {t('footer.simpleCopyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </div>
    </footer>
  )
}

