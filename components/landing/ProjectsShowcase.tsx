'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const projects = [
  {
    title: 'Learning Expedition',
    client: 'Essec Business School',
    description: '22 étudiants, 5 entreprises visitées, 2 soirées networking. Résultat : une immersion concrète dans l\'écosystème entrepreneurial catalan.',
    image: '/images/project-essec.jpg',
    stats: { students: 22, companies: 5, events: 2 },
    details: {
      highlights: [
        'Visites d\'entreprises : TravelPerk, Norrsken House, Station F Barcelona',
        'Rencontres avec des entrepreneurs français et catalans',
        'Soirées networking dans des lieux emblématiques de Barcelone',
        'Immersion dans l\'écosystème tech et innovation catalan',
      ],
      companies: [
        {
          name: 'TravelPerk',
          description: 'Leader européen de la gestion de voyages d\'affaires. Rencontre avec les fondateurs et découverte de leur modèle de croissance.',
        },
        {
          name: 'Norrsken House',
          description: 'Le plus grand hub d\'impact social d\'Europe. Visite guidée et échanges sur l\'entrepreneuriat à impact.',
        },
        {
          name: 'Station F Barcelona',
          description: 'Antenne barcelonaise du plus grand campus de startups au monde. Découverte de l\'écosystème et rencontres avec des startups.',
        },
      ],
      outcomes: 'Les étudiants ont développé une compréhension approfondie de l\'écosystème entrepreneurial barcelonais, créé des connexions durables avec des entrepreneurs locaux, et identifié des opportunités de stage et de carrière dans l\'innovation tech.',
    },
  },
  {
    title: 'AI Summit Barcelona',
    client: 'Évènement Public',
    description: '1 200 participants, 80 intervenants, 3 jours de conférences et d\'expériences tech. Résultat : Barcelone au cœur de l\'intelligence artificielle européenne.',
    image: '/images/events-hero.jpg',
    stats: { participants: '1 200', speakers: 80, days: 3 },
    details: {
      highlights: [
        '80+ speakers internationaux : chercheurs, entrepreneurs, investisseurs',
        'Keynotes sur l\'IA générative, l\'éthique de l\'IA, et l\'innovation',
        'Démos interactives et expériences immersives avec l\'IA',
        'Networking avec les leaders de l\'écosystème tech européen',
      ],
      topics: [
  {
          title: 'IA Générative & Innovation',
          description: 'Sessions sur ChatGPT, Midjourney, et les dernières innovations en IA générative. Impact sur les industries créatives et technologiques.',
        },
        {
          title: 'Éthique & Régulation',
          description: 'Débats sur la régulation européenne de l\'IA, la protection des données, et l\'utilisation responsable de l\'intelligence artificielle.',
        },
        {
          title: 'IA & Business',
          description: 'Cas d\'usage concrets : comment les entreprises intègrent l\'IA pour transformer leurs opérations et créer de la valeur.',
        },
      ],
      outcomes: 'L\'événement a positionné Barcelone comme hub majeur de l\'IA en Europe, facilité des partenariats stratégiques, et inspiré des projets innovants dans le domaine de l\'intelligence artificielle.',
    },
  },
  {
    title: 'Event for Shoptalk Europe 2025',
    client: 'WESHARETRUST',
    description: '100+ décideurs dans le retail et le retail média. Démos et Panels enrichissants et networking high-level sur un des plus beaux rooftops de Barcelone.',
    image: '/images/travel-hero.jpg',
    stats: { attendees: '100+', format: 'High-level' },
    details: {
      highlights: [
        '100+ décideurs : CEOs, CMOs, directeurs innovation du retail',
        'Panels sur l\'avenir du retail, l\'e-commerce, et le retail média',
        'Démos de solutions tech innovantes pour le retail',
        'Networking exclusif sur rooftop avec vue panoramique sur Barcelone',
      ],
      panels: [
        {
          title: 'L\'Avenir du Retail',
          description: 'Discussion sur les tendances du retail : phygital, expérience client, et transformation digitale. Perspectives des leaders du secteur.',
        },
        {
          title: 'Retail Média & Data',
          description: 'Comment les retailers utilisent leurs données pour créer de nouveaux revenus via le retail média. Cas d\'usage et opportunités.',
        },
        {
          title: 'Innovation Tech',
          description: 'Démos de solutions innovantes : AR/VR, IA pour le retail, solutions de paiement, et technologies émergentes qui transforment l\'expérience client.',
        },
      ],
      outcomes: 'L\'événement a créé des connexions stratégiques entre décideurs français et espagnols, facilité des partenariats business, et inspiré des projets d\'innovation dans le retail.',
    },
  },
]

export default function ProjectsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden bg-bg-light py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(39,115,150,0.08),_transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-widest text-rusker-blue">
            Projets & Événements
          </span>
          <h2 className="text-4xl font-bold text-text-dark md:text-5xl">
            Des expériences qui{' '}
            <motion.span
              className="relative inline-block text-rusker-blue"
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              transforment
            </motion.span>{' '}
            et{' '}
            <motion.span
              className="relative inline-block text-rusker-blue"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              inspirent
            </motion.span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez comment nous avons orchestré des learning expeditions et événements à fort impact.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => {
            const isSelected = selectedCard === index
            return (
              <div key={index} className="p-4">
            <motion.div
              variants={fadeInUp}
                  whileHover={!isSelected ? { y: -8 } : {}}
                  transition={{ type: 'tween', duration: 0.15 }}
                  onClick={() => {
                    if (!isSelected) {
                      setSelectedCard(index)
                    } else {
                      setSelectedCard(null)
                    }
                  }}
                  className="group relative cursor-pointer h-full min-h-[440px]"
                  style={{ perspective: '1000px' }}
                >
                <motion.div
                  className="relative h-full w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: isSelected ? 180 : 0,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  {/* Front of card */}
                  <div
                    className="relative h-full min-h-[440px] rounded-card bg-white shadow-soft overflow-hidden transition-all duration-300 group-hover:border-2 group-hover:border-rusker-blue flex flex-col"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isSelected ? 'none' : 'auto',
                    }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                        className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                    {project.client}
                  </span>
                </div>
              </div>

              {/* Content */}
                    <div className="relative p-6 flex-1 flex flex-col">
                      <div className="flex-1 mb-8">
                        <h3 className="text-xl font-bold text-text-dark whitespace-nowrap">{project.title}</h3>
                <p className="mt-3 text-gray-600">{project.description}</p>
                      </div>
                
                      {/* Stats - aligned at bottom */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-rusker-blue">{value}</div>
                      <div className="text-xs uppercase tracking-wide text-gray-500">
                        {key === 'students' && 'Étudiants'}
                        {key === 'companies' && 'Entreprises'}
                        {key === 'events' && 'Événements'}
                        {key === 'participants' && 'Participants'}
                        {key === 'speakers' && 'Speakers'}
                        {key === 'days' && 'Jours'}
                        {key === 'attendees' && 'Décideurs'}
                        {key === 'format' && 'Format'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

                      {/* Arrow hint - bottom right */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-2xl text-rusker-blue"
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 h-full min-h-[440px] max-h-[660px] rounded-card bg-white/95 backdrop-blur-sm shadow-soft border-2 border-rusker-blue transition-all duration-300 flex flex-col overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      pointerEvents: isSelected ? 'auto' : 'none',
                    }}
                  >
                    <div 
                      className="flex flex-col overflow-y-auto h-full"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#277396 transparent' }}
                      onWheel={(e) => {
                        if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) {
                          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
                          const isAtTop = scrollTop === 0
                          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
                          
                          if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                            return
                          }
                          e.stopPropagation()
                        }
                      }}
                    >
                      {/* Close button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCard(null)
                        }}
                        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-900 border border-gray-200"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>

                      {/* Header */}
                      <div className="p-6 pb-4 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-text-dark whitespace-nowrap">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          {project.description}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        {/* Highlights */}
                        <div className="mb-6">
                          <h4 className="mb-3 text-sm font-bold text-text-dark">Points clés</h4>
                          <ul className="space-y-2">
                            {project.details.highlights.map((highlight, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 + 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rusker-blue" />
                                <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Companies/Topics/Panels */}
                        {(project.details.companies || project.details.topics || project.details.panels) && (
                          <div className="mb-6 space-y-3">
                            {(project.details.companies || project.details.topics || project.details.panels)?.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 + 0.5 }}
                                className="rounded-lg border border-gray-200 bg-gray-50/50 p-4"
                              >
                                <h5 className="mb-2 text-sm font-bold text-rusker-blue">
                                  {'name' in item ? item.name : item.title}
                                </h5>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  {item.description}
                                </p>
            </motion.div>
          ))}
                          </div>
                        )}

                        {/* Outcomes */}
                        <div className="rounded-lg bg-rusker-blue/5 p-4 border border-rusker-blue/10">
                          <h4 className="mb-2 text-sm font-bold text-rusker-blue">Résultats & Impact</h4>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {project.details.outcomes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

