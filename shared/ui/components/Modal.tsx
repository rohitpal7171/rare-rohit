import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'

import { cn } from '../../utils/cn'
import { scaleIn } from '../../utils/animations'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}

export const Modal = ({ isOpen, onClose, children, title, className }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              'relative z-10 w-full max-w-2xl rounded-2xl border border-gold/20',
              'bg-gradient-to-b from-maroon to-maroon-dark p-6 shadow-2xl',
              className
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              {title !== undefined ? (
                <h2 className="font-display text-xl font-bold text-gold">{title}</h2>
              ) : (
                <span />
              )}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-full p-1 text-gold/60 transition-colors hover:bg-gold/10 hover:text-gold"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
