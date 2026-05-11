import type { CeremonySlug } from '@shared/utils'

export interface Person {
  name: string
  nameHindi: string
  family: string
  familyHindi: string
  bio?: string
  bioHindi?: string
}

export interface Venue {
  name: string
  nameHindi: string
  address: string
  addressHindi: string
  city: string
  cityHindi: string
  mapUrl: string
}

export interface CeremonyConfig {
  slug: CeremonySlug
  date: string // ISO date string
  time: string // e.g. "11:00 AM"
  timeHindi: string // e.g. "प्रातः ११ बजे"
  venue: Venue
  color: string // Tailwind color token
  icon: string // emoji icon
}

export interface WeddingConfig {
  bride: Person
  groom: Person
  wedding: {
    date: string
    venue: Venue
  }
  ceremonies: Record<CeremonySlug, CeremonyConfig>
  hashtag: string
  socialLinks: {
    instagram?: string
    facebook?: string
  }
}
