// Universe types
export type Universe = 'travel' | 'events' | null

// Identity type
export type Identity = 'school' | 'company' | null

// Travel experience types
export type TravelExperienceType = 'learning-expedition' | 'seminar-offsite' | 'cultural-stay'

// Events experience types
export type EventType = 
  | 'anniversary' 
  | 'inauguration' 
  | 'product-launch' 
  | 'conference' 
  | 'workshop' 
  | 'teambuilding' 
  | 'hackathon'

export type EventScope = 'internal' | 'external' | null

// Duration options for Travel
export type TravelDuration = '2-3' | '4' | '1-week' | 'other' | null

// Form data structures
export interface TravelFormData {
  universe: 'travel'
  identity: Identity
  experienceType: TravelExperienceType | null
  groupSize: number
  dates: {
    start: string
    flexible: boolean
  }
  duration: TravelDuration
  themes: string[]
  objectives: string[]
  budget: string | null
  contact: {
    name: string
    email: string
    establishment: string
    role: string
    phone: string
    message: string
  }
}

export interface EventsFormData {
  universe: 'events'
  identity: Identity
  eventTypes: EventType[]
  eventScope: EventScope
  date: string
  duration: string
  participants: number
  objectiveDescription: string
  budget: string | null
  budgetType: 'per-person' | 'global'
  contact: {
    name: string
    email: string
    establishment: string
    role: string
    phone: string
    message: string
  }
}

export type FormData = TravelFormData | EventsFormData

// Default form data for Travel
export const defaultTravelFormData: TravelFormData = {
  universe: 'travel',
  identity: null,
  experienceType: null,
  groupSize: 20,
  dates: {
    start: '',
    flexible: false,
  },
  duration: null,
  themes: [],
  objectives: [],
  budget: null,
  contact: {
    name: '',
    email: '',
    establishment: '',
    role: '',
    phone: '',
    message: '',
  },
}

// Default form data for Events
export const defaultEventsFormData: EventsFormData = {
  universe: 'events',
  identity: null,
  eventTypes: [],
  eventScope: null,
  date: '',
  duration: '',
  participants: 50,
  objectiveDescription: '',
  budget: null,
  budgetType: 'global',
  contact: {
    name: '',
    email: '',
    establishment: '',
    role: '',
    phone: '',
    message: '',
  },
}

// Travel experience type options
export const TRAVEL_EXPERIENCE_TYPES = [
  {
    id: 'learning-expedition' as TravelExperienceType,
    titleKey: 'form.travel.experiences.learningExpedition.title',
    descriptionKey: 'form.travel.experiences.learningExpedition.description',
    icon: 'compass',
  },
  {
    id: 'seminar-offsite' as TravelExperienceType,
    titleKey: 'form.travel.experiences.seminarOffsite.title',
    descriptionKey: 'form.travel.experiences.seminarOffsite.description',
    icon: 'users',
  },
  {
    id: 'cultural-stay' as TravelExperienceType,
    titleKey: 'form.travel.experiences.culturalStay.title',
    descriptionKey: 'form.travel.experiences.culturalStay.description',
    icon: 'palette',
  },
] as const

// Event type options
export const EVENT_TYPES = [
  {
    id: 'anniversary' as EventType,
    titleKey: 'form.events.types.anniversary.title',
    icon: 'cake',
  },
  {
    id: 'inauguration' as EventType,
    titleKey: 'form.events.types.inauguration.title',
    icon: 'scissors',
  },
  {
    id: 'product-launch' as EventType,
    titleKey: 'form.events.types.productLaunch.title',
    icon: 'rocket',
  },
  {
    id: 'conference' as EventType,
    titleKey: 'form.events.types.conference.title',
    icon: 'mic',
  },
  {
    id: 'workshop' as EventType,
    titleKey: 'form.events.types.workshop.title',
    icon: 'tools',
  },
  {
    id: 'teambuilding' as EventType,
    titleKey: 'form.events.types.teambuilding.title',
    icon: 'heart',
  },
  {
    id: 'hackathon' as EventType,
    titleKey: 'form.events.types.hackathon.title',
    icon: 'code',
  },
] as const

// Travel duration options
export const TRAVEL_DURATIONS = [
  { id: '2-3' as TravelDuration, label: '2-3 jours' },
  { id: '4' as TravelDuration, label: '4 jours' },
  { id: '1-week' as TravelDuration, label: '1 semaine' },
  { id: 'other' as TravelDuration, label: 'Autre' },
] as const

// Travel themes
export const TRAVEL_THEMES = [
  { id: 'innovation', labelKey: 'form.travel.themes.innovation' },
  { id: 'sustainability', labelKey: 'form.travel.themes.sustainability' },
  { id: 'entrepreneurship', labelKey: 'form.travel.themes.entrepreneurship' },
  { id: 'smart-city', labelKey: 'form.travel.themes.smartCity' },
  { id: 'culture', labelKey: 'form.travel.themes.culture' },
  { id: 'gastronomy', labelKey: 'form.travel.themes.gastronomy' },
  { id: 'mobility', labelKey: 'form.travel.themes.mobility' },
  { id: 'tourism', labelKey: 'form.travel.themes.tourism' },
] as const

// Travel objectives
export const TRAVEL_OBJECTIVES = [
  { id: 'learning', labelKey: 'form.travel.objectives.learning' },
  { id: 'networking', labelKey: 'form.travel.objectives.networking' },
  { id: 'team-building', labelKey: 'form.travel.objectives.teamBuilding' },
  { id: 'inspiration', labelKey: 'form.travel.objectives.inspiration' },
  { id: 'partnerships', labelKey: 'form.travel.objectives.partnerships' },
  { id: 'discovery', labelKey: 'form.travel.objectives.discovery' },
] as const

// Budget ranges
export const BUDGET_RANGES = [
  { id: 'under-100', label: 'Moins de 100€/pers' },
  { id: '100-200', label: '100€ - 200€/pers' },
  { id: '200-350', label: '200€ - 350€/pers' },
  { id: '350-500', label: '350€ - 500€/pers' },
  { id: 'over-500', label: 'Plus de 500€/pers' },
  { id: 'custom', label: 'Budget global à préciser' },
] as const

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validation for Travel form
export const validateTravelStep = (step: number, data: TravelFormData): boolean => {
  switch (step) {
    case 1:
      return data.identity !== null
    case 2:
      return data.experienceType !== null
    case 3:
      return (
        data.groupSize > 0 &&
        data.dates.start !== '' &&
        data.duration !== null
      )
    case 4:
      return data.themes.length > 0 && data.objectives.length > 0
    case 5:
      return (
        data.budget !== null &&
        data.contact.name.trim() !== '' &&
        data.contact.email.trim() !== '' &&
        data.contact.establishment.trim() !== '' &&
        isValidEmail(data.contact.email)
      )
    default:
      return false
  }
}

// Validation for Events form
export const validateEventsStep = (step: number, data: EventsFormData): boolean => {
  switch (step) {
    case 1:
      return data.identity !== null
    case 2:
      return data.eventTypes.length > 0 && data.eventScope !== null
    case 3:
      return (
        data.date !== '' &&
        data.duration !== '' &&
        data.participants > 0
      )
    case 4:
      return data.objectiveDescription.trim().length > 10
    case 5:
      return (
        data.budget !== null &&
        data.contact.name.trim() !== '' &&
        data.contact.email.trim() !== '' &&
        data.contact.establishment.trim() !== '' &&
        isValidEmail(data.contact.email)
      )
    default:
      return false
  }
}

// Submit form to webhook
export const submitForm = async (data: FormData): Promise<boolean> => {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://rusker.lucasaibot.uk/webhook/f1e97fe9-ce31-4e6f-8d59-6b75c2715480'

  // Format the payload based on universe
  const payload = data.universe === 'travel' 
    ? formatTravelPayload(data as TravelFormData)
    : formatEventsPayload(data as EventsFormData)

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload, null, 2),
    })

    if (!response.ok) {
      console.error('Webhook response not OK:', response.status, response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error('Form submission error:', error)
    return false
  }
}

// Format Travel form payload
const formatTravelPayload = (data: TravelFormData) => ({
  type: 'travel',
  identity: data.identity === 'school' ? 'École/Université' : 'Entreprise/Organisation',
  experienceType: data.experienceType,
  groupSize: data.groupSize,
  groupSizeDisplay: data.groupSize === 200 ? '200+' : data.groupSize.toString(),
  startDate: data.dates.start,
  datesFlexible: data.dates.flexible,
  duration: data.duration,
  themes: data.themes,
  objectives: data.objectives,
  budget: data.budget,
  contact: {
    name: data.contact.name,
    email: data.contact.email,
    establishment: data.contact.establishment,
    role: data.contact.role || null,
    phone: data.contact.phone || null,
    message: data.contact.message || null,
  },
  submittedAt: new Date().toISOString(),
  timestamp: Date.now(),
})

// Format Events form payload
const formatEventsPayload = (data: EventsFormData) => ({
  type: 'events',
  identity: data.identity === 'school' ? 'École/Université' : 'Entreprise/Organisation',
  eventTypes: data.eventTypes,
  eventScope: data.eventScope === 'internal' ? 'Événement interne (privé)' : 'Événement externe (public)',
  date: data.date,
  duration: data.duration,
  participants: data.participants,
  objectiveDescription: data.objectiveDescription,
  budget: data.budget,
  budgetType: data.budgetType,
  contact: {
    name: data.contact.name,
    email: data.contact.email,
    establishment: data.contact.establishment,
    role: data.contact.role || null,
    phone: data.contact.phone || null,
    message: data.contact.message || null,
  },
  submittedAt: new Date().toISOString(),
  timestamp: Date.now(),
})

// Legacy exports for backwards compatibility
export { THEMES, OBJECTIVES } from '@/lib/constants'

export const defaultFormData = defaultTravelFormData
