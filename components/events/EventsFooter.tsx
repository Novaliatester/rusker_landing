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
              src={getAssetPath('/images/logos/Logo 2025 (long) (white).png')} 
              alt="Rusker" 
              className="h-8 w-auto"
            />
            <div className="h-5 w-px bg-white/30" />
            <span className="text-white/80 font-medium tracking-wider text-sm">EVENTS</span>
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

