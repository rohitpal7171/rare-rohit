import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { pageTransition } from '@shared/utils'

export interface PageWrapperProps {
  children: ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const { pathname } = useLocation()

  // Scroll to top on every route change.
  // `pathname` is intentionally in deps — the effect body reads it indirectly
  // via the route change trigger, not as a value. ESLint exhaustive-deps is
  // satisfied: pathname IS the dependency that drives the scroll.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
