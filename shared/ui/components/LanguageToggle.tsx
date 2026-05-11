import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { cn } from '../../utils/cn'

export interface LanguageToggleProps {
  className?: string
}

export const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const toggle = () => {
    void i18n.changeLanguage(isHindi ? 'en' : 'hi')
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative flex items-center gap-2 rounded-full border-2 border-gold/50 bg-maroon/60',
        'px-4 py-1.5 font-body text-sm font-semibold text-gold backdrop-blur-sm',
        'transition-colors hover:border-gold hover:bg-maroon/80',
        className
      )}
      aria-label="Toggle language"
    >
      <span className={cn('transition-opacity', isHindi ? 'opacity-50' : 'opacity-100')}>EN</span>
      <span className="text-gold/40">|</span>
      <span
        className={cn('font-hindi transition-opacity', !isHindi ? 'opacity-50' : 'opacity-100')}
      >
        हिंदी
      </span>
    </motion.button>
  )
}
