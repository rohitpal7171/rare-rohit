import { type ReactNode, useEffect } from 'react'

import { motion } from 'framer-motion'

import { useLocation } from 'react-router-dom'

import { pageTransition } from '@shared/utils'

export interface PageWrapperProps {
  children: ReactNode
  /** Optional ceremony color token — triggers a brief color flash on enter */
  accentColor?: string
}

// Maps weddingConfig color tokens to hex values
// Must mirror the design system in tailwind.config.ts
const COLOR_MAP: Record<string, string> = {
  marigold: '#FFBE00',
  saffron: '#FF6B00',
  maroon: '#800020',
  gold: '#C9A84C',
  divine: '#2D1B4E',
  ivory: '#FDF6EC',
}

export const PageWrapper = ({ children, accentColor }: PageWrapperProps) => {
  const { pathname, hash } = useLocation()
  const flashColor = accentColor !== undefined ? (COLOR_MAP[accentColor] ?? '#C9A84C') : null

  useEffect(() => {
    if (hash !== '') {
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el !== null) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return () => {
        clearTimeout(timer)
      }
    }
    // Only scroll to top on ceremony pages — Home manages its own scroll position
    if (pathname.startsWith('/ceremony/')) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return undefined
  }, [pathname, hash])

  return (
    <motion.div
      key={pathname}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Ceremony color flash — only on ceremony pages, fades out on enter */}
      {flashColor !== null && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60]"
          initial={{ opacity: 0.18 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ backgroundColor: flashColor }}
        />
      )}
      {children}
    </motion.div>
  )
}
