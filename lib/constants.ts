// Design System Constants

export const COLORS = {
  primary: '#277396', // Rusker Blue
  background: '#FFFFFF',
  backgroundLight: '#F6F6F6',
  textDark: '#333333',
  textLight: '#666666',
  shadow: 'rgba(0, 0, 0, 0.05)',
  shadowHover: 'rgba(0, 0, 0, 0.08)',
} as const

export const SPACING = {
  sectionPaddingDesktop: '120px',
  sectionPaddingMobile: '80px',
  cardPadding: '32px',
  cardGap: '24px',
} as const

export const TYPOGRAPHY = {
  hero: {
    desktop: '60px',
    mobile: '40px',
  },
  sectionTitle: {
    desktop: '42px',
    mobile: '30px',
  },
  subtitle: {
    desktop: '24px',
    mobile: '18px',
  },
  body: '18px',
  cardTitle: '22px',
} as const

export const BORDER_RADIUS = {
  card: '20px',
  button: '16px',
  input: '16px',
} as const

export const TRANSITIONS = {
  default: '0.25s ease',
  fast: '0.2s ease',
  slow: '0.3s ease',
} as const

import { LearningIcon, SeminarIcon, NetworkingIcon, CustomEventIcon, ConferenceIcon } from '@/components/ui/Icons'

export const EXPERIENCE_TYPES = [
  {
    id: 'learning-expedition',
    title: 'Learning Expedition',
    description: 'Séjours étudiants immersifs avec visites d\'entreprises et rencontres professionnelles',
    icon: LearningIcon,
    recommended: 'schools',
  },
  {
    id: 'corporate-seminar',
    title: 'Séminaire d\'Entreprise',
    description: 'Séminaires sur mesure pour équipes et dirigeants',
    icon: SeminarIcon,
    recommended: 'companies',
  },
  {
    id: 'networking-event',
    title: 'Événement Networking',
    description: 'Rencontres professionnelles et connexions dans l\'écosystème barcelonais',
    icon: NetworkingIcon,
    recommended: null,
  },
  {
    id: 'custom-event',
    title: 'Événement Sur Mesure',
    description: 'Création d\'événements uniques selon vos objectifs',
    icon: CustomEventIcon,
    recommended: null,
  },
  {
    id: 'conference',
    title: 'Conférence & Summit',
    description: 'Organisation de conférences et sommets professionnels',
    icon: ConferenceIcon,
    recommended: null,
  },
] as const

export const THEMES = [
  { id: 'innovation', label: 'Innovation & Tech' },
  { id: 'sustainability', label: 'Durabilité' },
  { id: 'entrepreneurship', label: 'Entrepreneuriat' },
  { id: 'smart-city', label: 'Smart City' },
  { id: 'culture', label: 'Culture & Design' },
  { id: 'gastronomy', label: 'Gastronomie' },
  { id: 'mobility', label: 'Mobilité' },
  { id: 'tourism', label: 'Tourisme' },
] as const

export const OBJECTIVES = [
  { id: 'learning', label: 'Apprentissage' },
  { id: 'networking', label: 'Networking' },
  { id: 'team-building', label: 'Team Building' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'partnerships', label: 'Partenariats' },
  { id: 'discovery', label: 'Découverte' },
] as const

export const BUDGET_RANGES = [
  { id: 'under-10k', label: 'Moins de 10 000€', min: 0, max: 10000 },
  { id: '10k-25k', label: '10 000€ - 25 000€', min: 10000, max: 25000 },
  { id: '25k-50k', label: '25 000€ - 50 000€', min: 25000, max: 50000 },
  { id: '50k-100k', label: '50 000€ - 100 000€', min: 50000, max: 100000 },
  { id: 'over-100k', label: 'Plus de 100 000€', min: 100000, max: null },
] as const

