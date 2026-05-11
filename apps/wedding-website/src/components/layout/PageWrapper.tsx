import { type ReactNode, useEffect } from 'react'

import { motion } from 'framer-motion'

import { useLocation } from 'react-router-dom'

import { pageTransition } from '@shared/utils'

export interface PageWrapperProps {
  children: ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash !== '') {
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el !== null) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      // Always return cleanup — fixes TS7030 "not all code paths return a value"
      return () => {
        clearTimeout(timer)
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Explicit return undefined so all code paths return
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
      {children}
    </motion.div>
  )
}
