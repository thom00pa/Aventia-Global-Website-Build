// lib/constants.ts

export const SITE_NAME = 'Aventia Global'
export const SITE_URL = 'https://aventiaglobal.com'

export const DIVISIONS = [
  {
    id: 'energy',
    name: 'Aventia Energy',
    subdomain: 'energy',
    url: 'https://energy.aventiaglobal.com',
    status: 'live' as const,
    color: '#D97706',
    colorVar: '--energy-color',
    tagline: 'Power your home or business for less.',
    taglineEs: 'Ahorra en tu factura de electricidad.',
    icon: 'Zap',
  },
  {
    id: 'connect',
    name: 'Aventia Connect',
    subdomain: 'connect',
    url: 'https://connect.aventiaglobal.com',
    status: 'coming-soon' as const,
    color: '#0891B2',
    colorVar: '--connect-color',
    tagline: 'Reliable internet for work and life.',
    taglineEs: 'Internet confiable para trabajo y vida.',
    icon: 'Wifi',
  },
  {
    id: 'store',
    name: 'Aventia Store',
    subdomain: 'store',
    url: 'https://store.aventiaglobal.com',
    status: 'coming-soon' as const,
    color: '#7C3AED',
    colorVar: '--store-color',
    tagline: 'Premium tech hardware, delivered fast.',
    taglineEs: 'Hardware tecnológico premium, entregado rápido.',
    icon: 'ShoppingBag',
  },
  {
    id: 'ai',
    name: 'Aventia AI',
    subdomain: 'ai',
    url: 'https://ai.aventiaglobal.com',
    status: 'coming-soon' as const,
    color: '#059669',
    colorVar: '--ai-color',
    tagline: 'Training data services for AI teams.',
    taglineEs: 'Servicios de datos de entrenamiento para equipos de IA.',
    icon: 'Brain',
  },
  {
    id: 'drones',
    name: 'Aventia Drones',
    subdomain: 'drones',
    url: 'https://drones.aventiaglobal.com',
    status: 'coming-soon' as const,
    color: '#DC2626',
    colorVar: '--drones-color',
    tagline: 'Aerial imaging. Precision surveys. Event coverage.',
    taglineEs: 'Imágenes aéreas. Levantamientos de precisión. Cobertura de eventos.',
    icon: 'Navigation',
  },
] as const

export type DivisionId = (typeof DIVISIONS)[number]['id']
export type DivisionStatus = 'live' | 'coming-soon'

export const SUPPORTED_LOCALES = ['en', 'es'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const CONTACT_EMAIL = 'hello@aventiaglobal.com'
export const SUPPORT_EMAIL = 'support@aventiaglobal.com'
export const WHATSAPP_NUMBER = '+12145550000' // Replace with real number before launch
