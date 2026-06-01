// lib/types.ts

export interface NavItem {
  label: string
  labelEs: string
  href: string
  external?: boolean
}

export interface DivisionCard {
  id: string
  name: string
  url: string
  status: 'live' | 'coming-soon'
  color: string
  tagline: string
  taglineEs: string
  iconName: string
}

export interface WaitlistFormData {
  email: string
  firstName: string
  division: string
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message: string
  locale: 'en' | 'es'
}

export interface EnergyPlan {
  id: string
  name: string
  nameEs: string
  pricePerKwh: number
  contractMonths: number
  features: string[]
  featuresEs: string[]
  recommended: boolean
  badge?: string
  badgeEs?: string
}
