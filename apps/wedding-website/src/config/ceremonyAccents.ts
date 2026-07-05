import { CEREMONY_SLUGS } from '@shared/utils'

type CeremonySlug = (typeof CEREMONY_SLUGS)[number]

export interface CeremonyAccent {
  /** medallion ring border (semi-transparent) */
  border: string
  /** card top hairline centre colour (semi-transparent) */
  hairline: string
  /** solid marker — row borders, dots */
  marker: string
}

/**
 * Traditional colour per ceremony — each function has its own colour in
 * Indian wedding tradition. Applied as subtle tints (medallion rings, card
 * hairlines, schedule row markers), never as loud backgrounds, so the
 * saffron/gold/maroon system stays dominant.
 */
export const CEREMONY_ACCENTS: Record<CeremonySlug, CeremonyAccent> = {
  haldi: {
    border: 'rgba(227, 178, 60, 0.65)',
    hairline: 'rgba(227, 178, 60, 0.55)',
    marker: '#E3B23C',
  },
  mehendi: {
    border: 'rgba(91, 140, 81, 0.6)',
    hairline: 'rgba(91, 140, 81, 0.5)',
    marker: '#5B8C51',
  },
  sangeet: {
    border: 'rgba(142, 91, 166, 0.6)',
    hairline: 'rgba(142, 91, 166, 0.5)',
    marker: '#8E5BA6',
  },
  baraat: {
    border: 'rgba(224, 123, 57, 0.6)',
    hairline: 'rgba(224, 123, 57, 0.5)',
    marker: '#E07B39',
  },
  pheras: {
    border: 'rgba(192, 57, 43, 0.6)',
    hairline: 'rgba(192, 57, 43, 0.5)',
    marker: '#C0392B',
  },
  vidaai: {
    border: 'rgba(201, 100, 127, 0.6)',
    hairline: 'rgba(201, 100, 127, 0.5)',
    marker: '#C9647F',
  },
}
