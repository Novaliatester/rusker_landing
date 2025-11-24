'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations'
import UniverseModal from '@/components/ui/UniverseModal'
import { TravelIcon, EventsIcon, NetworkIconAlt } from '@/components/ui/Icons'

const services = [
  {
    icon: TravelIcon,
    title: 'RUSKER TRAVEL',
    description: 'Séjours étudiants et séminaires d\'entreprise à Barcelone. Entre culture, apprentissage et rencontres inspirantes.',
    image: '/images/service-travel.jpg',
    content: {
      about: {
        title: 'À PROPOS DE RUSKER TRAVEL',
        description: `De simples voyages à de vraies expériences de transformation.

Chez Rusker Travel, nous concevons des séjours qui allient apprentissage, découverte et émotions.

Née à Barcelone, notre agence réinvente la manière dont les étudiants et les entreprises explorent le monde : en les connectant à un écosystème local vivant, créatif et inspirant.

Nous organisons des Learning Expeditions pour écoles et universités, ainsi que des séminaires d'entreprise à fort contenu humain et professionnel.

Chaque séjour est une rencontre : entre une ville, des acteurs, et une ambition collective.`,
      },
      process: [
        {
          title: 'Analyse de vos besoins',
          description: 'Nous échangeons avec vous pour comprendre vos objectifs pédagogiques, vos contraintes et votre public.',
        },
        {
          title: 'Conception du programme',
          description: 'Nous construisons un parcours cohérent mêlant visites, rencontres, conférences et moments de partage.',
        },
        {
          title: 'Sélection des partenaires',
          description: 'Entreprises, incubateurs, speakers, lieux d\'exception : tout est choisi pour créer de la valeur.',
        },
        {
          title: 'Gestion logistique complète',
          description: 'Transport, hébergement, restauration, coordination : nos équipes s\'occupent de tout, sur place, à Barcelone.',
        },
        {
          title: 'Suivi & accompagnement',
          description: 'Un chef de projet Rusker vous accompagne avant, pendant et après le séjour, pour garantir fluidité et impact.',
        },
      ],
      services: [
        {
          title: 'Visites & accompagnement local',
          description: 'Découvrez l\'écosystème barcelonais aux côtés de nos guides et coordinateurs experts.',
        },
        {
          title: 'Hébergement',
          description: 'Sélection d\'hôtels, résidences étudiantes ou appartements adaptés à vos besoins.',
        },
        {
          title: 'Transport',
          description: 'Transferts privés, autocars ou trains : nous gérons toute la mobilité du groupe.',
        },
        {
          title: 'Restauration & expériences culinaires',
          description: 'Dîners catalans, tapas authentiques, restaurants de sélection. La convivialité au cœur du séjour.',
        },
        {
          title: 'Soirées & networking',
          description: 'Moments informels et rencontres avec des entrepreneurs et acteurs locaux.',
        },
        {
          title: 'Keynotes, workshops & conférences',
          description: 'L\'expérience complète : apprentissage, inspiration et échanges avec les leaders de l\'écosystème.',
        },
      ],
    },
  },
  {
    icon: EventsIcon,
    title: 'RUSKER EVENTS',
    description: 'Événements sur mesure pour les entreprises. De la salle à la scène, nous concevons des expériences à impact.',
    image: '/images/events-hero.jpg',
    content: {
      about: {
        title: 'À PROPOS DE RUSKER EVENTS',
        description: `Faire de Barcelone votre scène.

Rusker Events est la division événementielle de Rusker, née pour transformer vos idées en expériences à fort impact.

Nous concevons et produisons des événements sur mesure pour les entreprises, qu'ils soient internes, externes ou publics. De la stratégie à la scénographie, de la logistique à la communication, nous vous accompagnons à chaque étape pour créer un moment inspirant, fluide et mémorable.

Notre mission : faire rayonner vos projets au cœur de Barcelone, capitale européenne de la créativité et de l'innovation.`,
      },
      process: [
        {
          title: 'Comprendre votre vision.',
          description: 'Chaque événement a une histoire, nous la faisons émerger avec vous.',
        },
        {
          title: 'Concevoir une expérience cohérente.',
          description: 'Lieu, ton, intervenants, rythme, ambiance : tout est pensé pour créer une émotion collective.',
        },
        {
          title: 'Orchestrer la logistique avec précision.',
          description: 'Nous coordonnons chaque détail : signalétique, accueil, timing, production technique, sécurité.',
        },
        {
          title: 'Amplifier votre impact.',
          description: 'Nos équipes communication et média s\'assurent que votre événement rayonne — sur place et en ligne.',
        },
        {
          title: 'Faire vivre une émotion partagée.',
          description: 'Nous créons des moments forts qui rassemblent : une atmosphère, une énergie, un détail inattendu. C\'est ce qui transforme un événement en expérience mémorable.',
        },
      ],
      features: [
        {
          title: 'Anniversaires d\'entreprise & inaugurations',
          description: 'Célébrez vos réussites dans des lieux d\'exception, au cœur de Barcelone.',
        },
        {
          title: 'Lancements de produit',
          description: 'Mettez vos innovations en scène avec créativité et impact.',
        },
        {
          title: 'Conférences & tables rondes',
          description: 'Rassemblez les leaders, créez du contenu inspirant et fédérateur.',
        },
        {
          title: 'Workshops & ateliers internes',
          description: 'Stimulez la collaboration et l\'innovation au sein de vos équipes.',
        },
        {
          title: 'Soirées & teambuildings',
          description: 'Partagez des moments de cohésion, dans des cadres authentiques et festifs.',
        },
        {
          title: 'Événements publics à impact',
          description: 'AI Summit Barcelona, French Tech Nights, Retail Tech Talks… Des événements qui font rayonner les communautés et les idées.',
        },
      ],
    },
  },
  {
    icon: NetworkIconAlt,
    title: 'RUSKER NETWORK',
    description: 'Un réseau vivant de talents et d\'entreprises innovantes à Barcelone connectés à la French Tech. Rencontrez, collaborez, évoluez.',
    image: '/images/barcelona-feature.jpg',
    content: {
      about: {
        title: 'À PROPOS DE RUSKER NETWORK',
        description: `Une communauté francophone au cœur de l'écosystème tech barcelonais.

Rusker Network, c'est la passerelle entre la French Tech Barcelona et les talents venus de France et d'Europe.

Notre mission : connecter, faire circuler et inspirer les étudiants, entrepreneurs et entreprises qui choisissent Barcelone pour grandir.

Nous collaborons avec la French Tech Barcelona, les grandes écoles et les entreprises locales pour créer des moments de rencontre concrets : soirées, panels, recrutements, et learning expeditions professionnelles. Parce qu'à Barcelone, les connexions créent les opportunités.`,
      },
      features: [
        {
          title: 'LE TALENTBOARD BARCELONA',
          description: `L'outil qui connecte les talents aux entreprises innovantes de Barcelone.

Développé avec la French Tech Barcelona, le Talentboard est une plateforme simple et intelligente qui met en relation : les étudiants et jeunes diplômés à la recherche d'un stage, VIE ou premier emploi, et les entreprises locales à la recherche de profils francophones et internationaux.`,
        },
        {
          title: 'LA FRENCH TECH BARCELONA',
          description: `Nos prochains rendez-vous à Barcelone.

Chaque mois, nous organisons des événements de networking et d'inspiration avec nos partenaires. Conférences, afterworks, French Tech Nights, AI Summit, Retail Tech Talks… Des moments pensés pour connecter les talents, provoquer des rencontres, partager des idées et faire découvrir les dynamiques qui animent l'écosystème barcelonais.`,
        },
      ],
    },
  },
]

export default function ServicesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedUniverse, setSelectedUniverse] = useState<typeof services[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-rusker-blue via-[#1f5a75] via-rusker-blue to-[#1a4d66] py-16 md:py-28 lg:py-36 overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.06),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />
      </div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-12 md:mb-16 lg:mb-24 text-center"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="mb-5 text-sm uppercase tracking-[0.4em] text-white/70 font-semibold"
          >
            Nos univers
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-2"
          >
            Trois expertises pour designer votre{' '}
            <motion.span 
              className="relative inline-block cursor-pointer group/emphasis"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              <motion.span 
                className="relative z-10 inline-block"
                whileHover={{
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 30px rgba(255,255,255,0.7)',
                    '0 0 20px rgba(255,255,255,0.5)',
                  ],
                  transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                expérience sur mesure
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-white/20 -z-0 origin-left"
              />
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-3 bg-white/40 -z-0 origin-left opacity-0 group-hover/emphasis:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ 
                  scaleX: 1,
                  transition: { duration: 0.4, ease: 'easeOut' }
                }}
              />
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-lg opacity-0 group-hover/emphasis:opacity-100 blur-xl"
                initial={false}
                whileHover={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
              />
              {/* Pulsing dot indicators */}
              <motion.div
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60 opacity-0 group-hover/emphasis:opacity-100"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60 opacity-0 group-hover/emphasis:opacity-100"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Travel, Events, Network : combinez les formats pour créer une learning expedition unique.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-3"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                onClick={() => {
                  setSelectedUniverse(service)
                  setIsModalOpen(true)
                }}
                className="group relative overflow-hidden rounded-[20px] md:rounded-[24px] border border-white/30 bg-white/95 backdrop-blur-sm p-6 md:p-8 lg:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] hover:border-white/40 transition-all duration-500 cursor-pointer"
              >
                {/* Animated gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-rusker-blue/0 via-rusker-blue/0 to-rusker-blue/0 group-hover:from-rusker-blue/5 group-hover:via-rusker-blue/3 group-hover:to-rusker-blue/8"
                  transition={{ duration: 0.5 }}
                />
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
                
                {/* Background Image with elegant overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)',
                  }}
                />
              
                {/* Animated border glow */}
                <motion.div 
                  className="absolute inset-0 rounded-[24px] border-2 border-transparent group-hover:border-rusker-blue/40"
                  transition={{ duration: 0.5 }}
                  style={{
                    boxShadow: '0 0 0 0 rgba(39, 115, 150, 0)',
                  }}
                  whileHover={{
                    boxShadow: '0 0 0 4px rgba(39, 115, 150, 0.1)',
                  }}
                />

                <div className="relative flex flex-col gap-7 h-full z-10">
                  {/* Enhanced Icon Container */}
                  <motion.div 
                    className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-rusker-blue/20 via-rusker-blue/15 to-rusker-blue/10 group-hover:from-rusker-blue/30 group-hover:via-rusker-blue/20 group-hover:to-rusker-blue/15 transition-all duration-500 text-rusker-blue relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Icon background pattern */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: `radial-gradient(circle, rgba(39,115,150,0.3) 1px, transparent 1px)`,
                      backgroundSize: '8px 8px',
                    }} />
                    <div className="relative z-10">
                      <IconComponent />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-text-dark mb-2 group-hover:text-rusker-blue transition-colors duration-500 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Enhanced CTA */}
                  <motion.div 
                    className="mt-auto flex items-center gap-2 text-sm font-semibold text-rusker-blue group-hover:gap-3 transition-all duration-500"
                    whileHover={{ x: 4 }}
                  >
                    <span className="relative">
                      Explorer
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-rusker-blue origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                    <motion.svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Modal */}
      {selectedUniverse && (
        <UniverseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setTimeout(() => setSelectedUniverse(null), 300)
          }}
          universe={selectedUniverse}
        />
      )}
    </section>
  )
}

