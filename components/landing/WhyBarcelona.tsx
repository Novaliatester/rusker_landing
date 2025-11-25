'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { CreativeIcon, InnovationIcon, NetworkIcon, LifestyleIcon } from '@/components/ui/Icons'
import AnimatedBackground from '@/components/ui/AnimatedBackground'

const features = [
  {
    icon: CreativeIcon,
    title: 'Une énergie créative unique',
    description: 'Architecture, gastronomie, design : Barcelone inspire et connecte.',
    stats: null,
    image: '/images/creative-barcelona.jpg',
    details: {
      highlights: [
        'Architecture moderniste de Gaudí et contemporaine',
        'Gastronomie étoilée et marchés locaux authentiques',
        'Design et mode : capitale européenne du design',
        'Art et culture : musées, galeries et festivals',
      ],
      experience: 'Visites guidées d\'ateliers, rencontres avec des créateurs locaux, expériences culinaires immersives.',
      extendedContent: [
        {
          title: 'Architecture emblématique',
          description: 'Découvrez les chefs-d\'œuvre de Gaudí, les bâtiments modernistes du Passeig de Gràcia, et l\'architecture contemporaine qui façonne la ville. Visites privées de sites classés UNESCO et rencontres avec des architectes locaux.',
        },
        {
          title: 'Gastronomie d\'excellence',
          description: 'Expériences culinaires dans des restaurants étoilés, découverte des marchés locaux comme La Boqueria, ateliers de cuisine avec des chefs renommés, et dégustations de vins catalans.',
        },
        {
          title: 'Design et innovation',
          description: 'Visites de studios de design, showrooms de marques internationales, rencontres avec des designers primés, et exploration des quartiers créatifs comme El Born et Poblenou.',
        },
      ],
    },
  },
  {
    icon: InnovationIcon,
    title: 'Un écosystème tourné vers l\'avenir',
    description: 'Plus de 1 500 startups, 300 000 m² dédiés à l\'innovation, des hubs comme 22@, Norrsken, Pier 01.',
    stats: ['1 500+ startups', '300 000 m² innovation'],
    image: '/images/innovation-hub.jpg',
    details: {
      highlights: [
        '22@ Barcelona : quartier de l\'innovation',
        'Norrsken House : hub d\'impact social',
        'Pier 01 : écosystème tech et startups',
        'Mobile World Capital : leadership technologique',
      ],
      experience: 'Visites de hubs d\'innovation, rencontres avec des entrepreneurs, sessions de networking stratégique.',
      extendedContent: [
        {
          title: '22@ Barcelona Innovation District',
          description: 'Le plus grand quartier d\'innovation d\'Europe avec 200 hectares dédiés à la technologie, la recherche et l\'innovation. Visites guidées des entreprises phares, rencontres avec des fondateurs de startups à succès, et sessions d\'échange sur les tendances tech.',
        },
        {
          title: 'Hubs d\'impact et de technologie',
          description: 'Exploration de Norrsken House, l\'un des plus grands hubs d\'impact social au monde, et de Pier 01, l\'écosystème tech de Barcelone. Rencontres avec des investisseurs, des accélérateurs, et des entrepreneurs en série.',
        },
        {
          title: 'Mobile World Capital',
          description: 'Barcelone est la capitale mondiale du mobile. Accès privilégié aux événements tech, rencontres avec des leaders de l\'industrie, et découverte des dernières innovations en intelligence artificielle, IoT, et 5G.',
        },
      ],
    },
  },
  {
    icon: NetworkIcon,
    title: 'Une communauté francophone engagée',
    description: 'French Tech Barcelona, chambres de commerce, entrepreneurs et talents : un réseau solide qui vous ouvre ses portes.',
    stats: null,
    image: '/images/network-meeting.jpg',
    details: {
      highlights: [
        'French Tech Barcelona : réseau de 200+ startups',
        'Chambre de Commerce Franco-Espagnole',
        'Communauté d\'entrepreneurs et talents',
        'Événements et meetups réguliers',
      ],
      experience: 'Rencontres exclusives avec la communauté francophone, événements de networking, accès privilégié aux réseaux locaux.',
      extendedContent: [
        {
          title: 'French Tech Barcelona',
          description: 'Le réseau officiel des startups françaises à Barcelone. Accès à plus de 200 entreprises membres, événements de networking exclusifs, et rencontres avec des entrepreneurs français ayant réussi leur implantation en Catalogne.',
        },
        {
          title: 'Chambre de Commerce Franco-Espagnole',
          description: 'Connexions stratégiques avec les acteurs économiques majeurs. Sessions de mentoring, accès aux opportunités business, et rencontres avec des décideurs des deux pays pour faciliter vos projets transfrontaliers.',
        },
        {
          title: 'Écosystème entrepreneurial',
          description: 'Intégration dans une communauté dynamique d\'entrepreneurs, de talents et d\'investisseurs. Accès à des événements privés, des masterclasses, et des opportunités de collaboration avec des entreprises locales et internationales.',
        },
      ],
    },
  },
  {
    icon: LifestyleIcon,
    title: 'Un cadre de vie stimulant',
    description: 'Plages urbaines, climat méditerranéen, espaces verts : Barcelone offre un environnement inspirant qui favorise l\'apprentissage et la cohésion.',
    stats: null,
    image: '/images/barcelona-beach.jpg',
    details: {
      highlights: [
        'Plages urbaines accessibles toute l\'année',
        'Climat méditerranéen : 300 jours de soleil',
        'Espaces verts : parcs et jardins emblématiques',
        'Vie nocturne et culturelle dynamique',
      ],
      experience: 'Activités en plein air, découverte des quartiers, expériences de bien-être et de cohésion d\'équipe.',
      extendedContent: [
        {
          title: 'Plages et activités nautiques',
          description: '7 km de plages urbaines accessibles en métro. Activités de team building sur la plage, sports nautiques, et moments de détente qui favorisent la cohésion d\'équipe. Climat méditerranéen avec 300 jours de soleil par an.',
        },
        {
          title: 'Parcs et espaces verts',
          description: 'Découverte du Parc Güell, des jardins de Montjuïc, et des nombreux espaces verts qui ponctuent la ville. Activités de bien-être en plein air, yoga, et moments de réflexion dans un cadre inspirant.',
        },
        {
          title: 'Vie culturelle et nocturne',
          description: 'Une scène culturelle vibrante avec des musées de renommée mondiale, des festivals toute l\'année, et une vie nocturne dynamique. Expériences culinaires, spectacles, et découverte de la culture catalane authentique.',
        },
      ],
    },
  },
]

export default function WhyBarcelona() {
  const ref = useRef(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [gridCenter, setGridCenter] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const calculateGridCenter = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect()
        setGridCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }
    }

    calculateGridCenter()
    window.addEventListener('resize', calculateGridCenter)
    window.addEventListener('scroll', calculateGridCenter)

    return () => {
      window.removeEventListener('resize', calculateGridCenter)
      window.removeEventListener('scroll', calculateGridCenter)
    }
  }, [isInView])

  return (
    <section id="why-barcelona" ref={ref} className="relative overflow-hidden py-16 md:py-20 lg:py-32 bg-white">
      {/* Base white background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 50%, #FFFFFF 100%)',
        }}
      />

      {/* Animated background with Rusker Blue cloud blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground blobCount={2} baseOpacity={0.3} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Section - Enhanced */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-rusker-blue/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-rusker-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-rusker-blue" />
              Pourquoi Barcelone ?
            </span>
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-dark leading-tight px-2"
          >
            La capitale européenne des expériences mêlant{' '}
            <motion.span
              className="relative inline-block text-rusker-blue"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              innovation
            </motion.span>
            ,{' '}
            <motion.span
              className="relative inline-block text-rusker-blue"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              créativité
            </motion.span>{' '}
            et{' '}
            <motion.span
              className="relative inline-block text-rusker-blue"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              communautés internationales
            </motion.span>
            .
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-2"
          >
            Chaque immersion est pensée comme une exploration à 360° : rencontres stratégiques,
            lieux iconiques, hubs d&apos;innovation et écosystème francophone engagé.
          </motion.p>
        </motion.div>

        {/* Features Grid - Premium Design */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2"
        >
          {features.map((feature, index) => {
            const isSelected = selectedCard === index
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                onMouseEnter={() => !isSelected && setHoveredIndex(index)}
                onMouseLeave={() => !isSelected && setHoveredIndex(null)}
                onClick={(e) => {
                  // Flip card if clicking on front side, or flip back if clicking on backside
                  if (!isSelected) {
                    setSelectedCard(index)
                  } else {
                    // If card is selected, clicking anywhere (except close button) flips it back
                    setSelectedCard(null)
                  }
                }}
                className="group relative cursor-pointer h-full min-h-[300px] md:min-h-[320px]"
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
                    className="relative h-full min-h-[300px] md:min-h-[320px] rounded-2xl shadow-soft border border-white/40 overflow-hidden transition-all duration-300 group-hover:ring-2 group-hover:ring-rusker-blue group-hover:ring-offset-0 flex flex-col"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      WebkitBackfaceVisibility: 'hidden',
                      backgroundImage: `url(${feature.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      pointerEvents: isSelected ? 'none' : 'auto',
                      transform: 'translateZ(0)',
                    }}
                  >
                    {/* White filter overlay for glassy effect - more opaque on mobile */}
                    <div className="absolute inset-0 bg-white/85 md:bg-white/70 backdrop-blur-sm md:backdrop-blur-sm rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 md:from-white/30 to-white/15 md:to-white/10 rounded-2xl pointer-events-none" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-5 md:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold leading-tight text-text-dark tracking-tight">
                          {feature.title}
                        </h3>
                        <p className="mb-4 md:mb-6 text-sm md:text-base leading-relaxed text-gray-700 font-medium">
                          {feature.description}
                        </p>

                        {/* Stats badges */}
                        {feature.stats && (
                          <div className="mb-4 md:mb-6 flex flex-wrap gap-2">
                            {feature.stats.map((stat, statIndex) => (
                              <span
                                key={statIndex}
                                className="rounded-full bg-rusker-blue/10 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-rusker-blue border border-rusker-blue/20 backdrop-blur-sm"
                              >
                                {stat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Click hint */}
                      <div className="flex items-center gap-2.5 text-xs md:text-sm text-rusker-blue/70 font-medium md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300 mt-auto pt-3 md:pt-4 border-t border-white/20">
                        <span className="hidden sm:inline">Cliquez pour en savoir plus</span>
                        <span className="sm:hidden">Toucher pour en savoir plus</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-rusker-blue"
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 h-full min-h-[300px] md:min-h-[320px] max-h-[550px] md:max-h-[600px] rounded-2xl bg-white/95 md:bg-white/50 backdrop-blur-sm md:backdrop-blur-xl shadow-soft border border-white/40 transition-all duration-300 flex flex-col overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/30 md:before:from-white/20 before:to-transparent before:pointer-events-none"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) translateZ(0)',
                      pointerEvents: isSelected ? 'auto' : 'none',
                    }}
                  >
                    <div 
                      className="flex flex-col overflow-y-auto h-full overscroll-contain"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#277396 transparent', WebkitOverflowScrolling: 'touch' }}
                    onWheel={(e) => {
                      // Prevent page scroll when scrolling inside the card
                      if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) {
                        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
                        const isAtTop = scrollTop === 0
                        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
                        
                        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                          // Allow page scroll when at boundaries
                          return
                        }
                        // Prevent page scroll when scrolling within card
                        e.stopPropagation()
                      }
                    }}
                    onTouchMove={(e) => {
                      // Prevent page scroll when scrolling inside the card on mobile
                      const target = e.currentTarget
                      if (target.scrollHeight > target.clientHeight) {
                        const { scrollTop, scrollHeight, clientHeight } = target
                        const isAtTop = scrollTop === 0
                        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
                        
                        if (!isAtTop && !isAtBottom) {
                          e.stopPropagation()
                        }
                      }
                    }}
                  >
                      {/* Close button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCard(null)
                        }}
                        className="absolute right-3 top-3 md:right-4 md:top-4 z-10 flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-600 shadow-sm transition-colors hover:bg-white/90 hover:text-gray-900"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>

                      {/* Header */}
                      <div className="p-4 md:p-6 pb-3 md:pb-4 border-b border-white/30">
                        <h3 className="text-lg md:text-xl font-bold text-text-dark">
                          {feature.title}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 md:p-6">
                        <p className="mb-3 md:mb-4 text-xs md:text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-4">
                          <h4 className="mb-2 text-sm font-bold text-text-dark">Points clés</h4>
                          <ul className="space-y-1.5">
                            {feature.details.highlights.map((highlight, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 + 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rusker-blue" />
                                <span className="text-xs text-gray-700 leading-relaxed">{highlight}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Extended Content */}
                        {feature.details.extendedContent && (
                          <div className="space-y-3">
                            {feature.details.extendedContent.map((content, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 + 0.5 }}
                                className="rounded-lg border border-gray-200 bg-gray-50/50 p-3"
                              >
                                <h5 className="mb-1.5 text-xs font-bold text-rusker-blue">
                                  {content.title}
                                </h5>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  {content.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Experience */}
                        <div className="mt-4 rounded-lg bg-rusker-blue/5 p-3 border border-rusker-blue/10">
                          <h4 className="mb-1.5 text-xs font-bold text-rusker-blue">Expérience proposée</h4>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {feature.details.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

