'use client'

import { getAssetPath } from '@/lib/utils'

export default function EventsFooter() {
  return (
    <footer className="bg-[#042a27] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={getAssetPath('/images/2026 Rusker/Logos/Rusker EVENTS (white).png')} 
              alt="Rusker Events" 
              className="h-8 w-auto"
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-white/60">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <a href="/form" className="hover:text-white transition-colors">Formulaire</a>
            <a href="mailto:contact@rusker.com" className="hover:text-white transition-colors">Contact</a>
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

