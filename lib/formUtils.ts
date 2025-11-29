export interface FormData {
  identity: 'school' | 'company' | null
  experienceTypes: string[]
  groupSize: number
  dates: {
    start: string
    end: string
  }
  duration: number
  themes: string[]
  objectives: string[]
  budget: string | null
  contact: {
    name: string
    companyName: string
    email: string
    phone: string
    message: string
  }
}

export const defaultFormData: FormData = {
  identity: null,
  experienceTypes: [],
  groupSize: 20,
  dates: {
    start: '',
    end: '',
  },
  duration: 0,
  themes: [],
  objectives: [],
  budget: null,
  contact: {
    name: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  },
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateStep = (step: number, data: FormData): boolean => {
  switch (step) {
    case 1:
      return data.identity !== null
    case 2:
      return data.experienceTypes.length > 0
    case 3:
      return (
        data.groupSize > 0 &&
        data.dates.start !== '' &&
        data.duration > 0
      )
    case 4:
      return data.themes.length > 0 && data.objectives.length > 0
    case 5:
      return (
        data.budget !== null &&
        data.contact.name.trim() !== '' &&
        data.contact.email.trim() !== '' &&
        isValidEmail(data.contact.email) &&
        // Phone is optional, so we don't validate it
        true
      )
    default:
      return false
  }
}

import { EXPERIENCE_TYPES, THEMES, OBJECTIVES, BUDGET_RANGES } from '@/lib/constants'

export const submitForm = async (data: FormData): Promise<boolean> => {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://rusker.lucasaibot.uk/webhook/f1e97fe9-ce31-4e6f-8d59-6b75c2715480'

  // Transform IDs to human-readable labels
  const experienceTypesLabels = data.experienceTypes
    .map(id => EXPERIENCE_TYPES.find(exp => exp.id === id)?.title || id)
    .filter(Boolean)

  const themesLabels = data.themes
    .map(id => THEMES.find(theme => theme.id === id)?.label || id)
    .filter(Boolean)

  const objectivesLabels = data.objectives
    .map(id => OBJECTIVES.find(obj => obj.id === id)?.label || id)
    .filter(Boolean)

  const budgetLabel = data.budget
    ? BUDGET_RANGES.find(range => range.id === data.budget)?.label || data.budget
    : null

  // Format the payload
  const payload = {
    // Identity
    identity: data.identity === 'school' ? 'École/Université' : data.identity === 'company' ? 'Entreprise/Organisation' : null,
    
    // Experience types (max 2)
    experienceTypes: experienceTypesLabels,
    experienceTypesCount: experienceTypesLabels.length,
    
    // Group details
    groupSize: data.groupSize,
    groupSizeDisplay: data.groupSize === 200 ? '200+' : data.groupSize.toString(),
    
    // Dates
    startDate: data.dates.start,
    endDate: data.dates.end || null, // Calculated from start + duration
    duration: data.duration,
    durationDisplay: `${data.duration} jour${data.duration > 1 ? 's' : ''}`,
    
    // Themes (max 2)
    themes: themesLabels,
    themesCount: themesLabels.length,
    
    // Objectives (max 2)
    objectives: objectivesLabels,
    objectivesCount: objectivesLabels.length,
    
    // Budget
    budget: budgetLabel,
    budgetId: data.budget,
    
    // Contact information
    contact: {
      name: data.contact.name,
      companyName: data.contact.companyName || null,
      email: data.contact.email,
      phone: data.contact.phone || null,
      message: data.contact.message || null,
    },
    
    // Metadata
    submittedAt: new Date().toISOString(),
    timestamp: Date.now(),
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload, null, 2), // Pretty print for readability
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

