'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export default function ProjectsShowcase() {
  const { t } = useI18n()
  
  const projects = useMemo(() => [
  {
    title: t('projects.essec.title'),
    client: t('projects.essec.client'),
    description: t('projects.essec.description'),
    image: getAssetPath('/images/project-essec.jpg'),
    stats: { students: 22, companies: 5, events: 2 },
    details: {
      highlights: [
        t('projects.essec.highlights.0'),
        t('projects.essec.highlights.1'),
        t('projects.essec.highlights.2'),
        t('projects.essec.highlights.3'),
      ],
      companies: [
        {
          name: t('projects.essec.companies.0.name'),
          description: t('projects.essec.companies.0.description'),
        },
        {
          name: t('projects.essec.companies.1.name'),
          description: t('projects.essec.companies.1.description'),
        },
        {
          name: t('projects.essec.companies.2.name'),
          description: t('projects.essec.companies.2.description'),
        },
      ],
      outcomes: t('projects.essec.outcomes'),
    },
  },
  {
    title: t('projects.aiSummit.title'),
    client: t('projects.aiSummit.client'),
    description: t('projects.aiSummit.description'),
    image: getAssetPath('/images/events-hero.jpg'),
    stats: { participants: '1 200', speakers: 80, days: 3 },
    details: {
      highlights: [
        t('projects.aiSummit.highlights.0'),
        t('projects.aiSummit.highlights.1'),
        t('projects.aiSummit.highlights.2'),
        t('projects.aiSummit.highlights.3'),
      ],
      topics: [
        {
          title: t('projects.aiSummit.topics.0.title'),
          description: t('projects.aiSummit.topics.0.description'),
        },
        {
          title: t('projects.aiSummit.topics.1.title'),
          description: t('projects.aiSummit.topics.1.description'),
        },
        {
          title: t('projects.aiSummit.topics.2.title'),
          description: t('projects.aiSummit.topics.2.description'),
        },
      ],
      outcomes: t('projects.aiSummit.outcomes'),
    },
  },
  {
    title: t('projects.shoptalk.title'),
    client: t('projects.shoptalk.client'),
    description: t('projects.shoptalk.description'),
    image: getAssetPath('/images/travel-hero.jpg'),
    stats: { attendees: '100+', format: 'High-level' },
    details: {
      highlights: [
        t('projects.shoptalk.highlights.0'),
        t('projects.shoptalk.highlights.1'),
        t('projects.shoptalk.highlights.2'),
        t('projects.shoptalk.highlights.3'),
      ],
      panels: [
        {
          title: t('projects.shoptalk.panels.0.title'),
          description: t('projects.shoptalk.panels.0.description'),
        },
        {
          title: t('projects.shoptalk.panels.1.title'),
          description: t('projects.shoptalk.panels.1.description'),
        },
        {
          title: t('projects.shoptalk.panels.2.title'),
          description: t('projects.shoptalk.panels.2.description'),
        },
      ],
      outcomes: t('projects.shoptalk.outcomes'),
    },
  },
  ], [t])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden bg-bg-light py-16 md:py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,52,51,0.08),_transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-widest text-neutral-dark">
            {t('projects.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark leading-[1.15]">
            {t('projects.title')}{' '}
            <motion.span
              className="relative inline-block text-neutral-dark"
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {t('projects.transform')}
            </motion.span>{' '}
            et{' '}
            <motion.span
              className="relative inline-block text-neutral-dark"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {t('projects.inspire')}
            </motion.span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => {
            const isSelected = selectedCard === index
            return (
              <div key={index} className="p-2 md:p-4">
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
                    className="relative h-full min-h-[360px] md:min-h-[440px] rounded-card bg-white shadow-soft overflow-hidden transition-all duration-300 border-2 border-transparent group-hover:border-neutral-dark flex flex-col"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isSelected ? 'none' : 'auto',
                    }}
            >
              {/* Image */}
              <div className="relative h-40 md:h-48 overflow-hidden">
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
                    <div className="relative p-4 md:p-6 flex-1 flex flex-col">
                      <div className="flex-1 mb-4 md:mb-8">
                        <h3 className="text-lg md:text-xl font-bold text-text-dark leading-[1.2] break-words">{project.title}</h3>
                <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600">{project.description}</p>
                      </div>
                
                      {/* Stats - aligned at bottom */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-neutral-dark">{value}</div>
                      <div className="text-xs uppercase tracking-wide text-gray-500">
                        {key === 'students' && t('projects.stats.students')}
                        {key === 'companies' && t('projects.stats.companies')}
                        {key === 'events' && t('projects.stats.events')}
                        {key === 'participants' && t('projects.stats.participants')}
                        {key === 'speakers' && t('projects.stats.speakers')}
                        {key === 'days' && t('projects.stats.days')}
                        {key === 'attendees' && t('projects.stats.attendees')}
                        {key === 'format' && t('projects.stats.format')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

                      {/* Arrow hint - bottom right */}
                      <div className="absolute bottom-6 right-6 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-dark font-medium md:hidden">{t('projects.touchForDetails')}</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-2xl text-neutral-dark"
                        >
                          →
                        </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 h-full min-h-[360px] md:min-h-[440px] max-h-[600px] md:max-h-[660px] rounded-card bg-white/95 backdrop-blur-sm shadow-soft border-2 border-neutral-dark transition-all duration-300 flex flex-col overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      pointerEvents: isSelected ? 'auto' : 'none',
                    }}
                  >
                    <div 
                      className="flex flex-col overflow-y-auto h-full overscroll-contain"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: '#2f3433 transparent', WebkitOverflowScrolling: 'touch' }}
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
                        className="absolute right-3 top-3 md:right-4 md:top-4 z-10 flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-900 border border-gray-200"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>

                      {/* Header */}
                      <div className="p-4 md:p-6 pb-3 md:pb-4 border-b border-gray-200">
                        <h3 className="text-lg md:text-xl font-bold text-text-dark leading-[1.2] break-words">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-xs md:text-sm text-gray-600">
                          {project.description}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 md:p-6">
                        {/* Highlights */}
                        <div className="mb-6">
                          <h4 className="mb-3 text-sm font-bold text-text-dark leading-[1.2]">{t('projects.keyPoints')}</h4>
                          <ul className="space-y-2">
                            {project.details.highlights.map((highlight, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 + 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-dark" />
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
                                <h5 className="mb-2 text-sm font-bold text-neutral-dark">
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
                        <div className="rounded-lg bg-neutral-dark/5 p-4 border border-neutral-dark/10">
                          <h4 className="mb-2 text-sm font-bold text-neutral-dark">{t('projects.results')}</h4>
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

