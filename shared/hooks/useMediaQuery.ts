import { useEffect, useState } from 'react'

import { BREAKPOINTS } from '../utils/constants'

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export const useIsMobile = (): boolean =>
  useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`)

export const useIsTablet = (): boolean =>
  useMediaQuery(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`)

export const useIsDesktop = (): boolean =>
  useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`)
