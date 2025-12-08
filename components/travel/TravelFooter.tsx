'use client'

import Link from 'next/link'
import { getAssetPath } from '@/lib/utils'

export default function TravelFooter() {
  return (
    <footer className="bg-[#0a3a4a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <img 
                src={getAssetPath('/images/2026 Rusker/Logos/Rusker TRAVEL (white).png')} 
                alt="Rusker Travel" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/form" className="hover:text-white transition-colors">Formulaire</Link>
            <a href="mailto:info@rusker-travel.com" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} Rusker. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}

