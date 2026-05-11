export type SupportedLocale = 'en' | 'hi'

export const formatDate = (
  isoDate: string,
  locale: SupportedLocale = 'en',
  options?: Intl.DateTimeFormatOptions
): string => {
  const date = new Date(isoDate)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  const localeMap: Record<SupportedLocale, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
  }
  return new Intl.DateTimeFormat(localeMap[locale], defaultOptions).format(date)
}

export const formatTime = (
  isoDate: string,
  locale: SupportedLocale = 'en'
): string => {
  const date = new Date(isoDate)
  const localeMap: Record<SupportedLocale, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
  }
  return new Intl.DateTimeFormat(localeMap[locale], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

export const getDaysUntil = (isoDate: string): number => {
  const target = new Date(isoDate)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
