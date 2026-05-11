import { AnimatePresence, motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

export interface MobileNavProps {
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
  className?: string
}

export const MobileNav = ({ isOpen, onToggle, children, className }: MobileNavProps) => {
  return (
    <>
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold lg:hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'fixed right-0 top-0 z-50 h-full w-80 bg-maroon/95 px-6 py-8 backdrop-blur-md lg:hidden',
                'border-l border-gold/20 shadow-2xl shadow-black/50',
                className
              )}
            >
              {children}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
