export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const Z_INDEX = {
  base: 0,
  raised: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
} as const

// Reception removed — no reception in this wedding
export const CEREMONY_SLUGS = ['haldi', 'mehendi', 'sangeet', 'baraat', 'pheras', 'vidaai'] as const

export type CeremonySlug = (typeof CEREMONY_SLUGS)[number]

export const SUPPORTED_LANGUAGES = ['en', 'hi'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
