// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // Main domain — homepage
    {
      url:              'https://aventiaglobal.com',
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         1.0,
    },

    // Aventia Energy — LIVE, most important division
    {
      url:              'https://energy.aventiaglobal.com',
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.9,
    },

    // Coming soon divisions — lower priority
    {
      url:              'https://drones.aventiaglobal.com',
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.8,    // Highest priority coming-soon: Q3 2026
    },
    {
      url:              'https://connect.aventiaglobal.com',
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              'https://ai.aventiaglobal.com',
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              'https://store.aventiaglobal.com',
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
  ]
}
