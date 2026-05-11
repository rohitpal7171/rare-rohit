import type { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variants?: Variants
  stagger?: boolean
  /** Only pass delay when > 0 — passing 0 would override variant transitions */
  delay?: number
  threshold?: number
}

export const AnimatedSection = ({
  children,
  className,
  variants = fadeInUp,
  stagger = false,
  delay = 0,
  threshold = 0.15,
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={stagger ? staggerContainer : variants}
      // Only set transition prop when delay is specified — otherwise it
      // would override the `transition` defined inside the variant itself.
      {...(delay > 0 ? { transition: { delay } } : {})}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
