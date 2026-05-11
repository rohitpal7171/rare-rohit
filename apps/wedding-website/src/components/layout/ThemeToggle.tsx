import { motion } from 'framer-motion'

import { useTheme } from '@shared/hooks'

export const ThemeToggle = () => {
  const { isDiya, toggleTheme, isTransitioning } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      aria-label={isDiya ? 'Switch to Night mode' : 'Switch to Diya mode'}
      title={isDiya ? 'Night Mode 🌙' : 'Diya Mode 🪔'}
      className="relative flex h-9 w-16 items-center rounded-full border border-gold/30 bg-divine/60 px-1 backdrop-blur-sm transition-colors duration-300 hover:border-gold/60"
    >
      {/* Track */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full text-base shadow-md transition-colors duration-300 ${
          isDiya
            ? 'left-1 bg-gradient-to-br from-marigold to-saffron'
            : 'left-8 bg-gradient-to-br from-divine to-divine-light'
        }`}
      >
        <span aria-hidden="true">{isDiya ? '🪔' : '🌙'}</span>
      </motion.div>

      {/* Static opposite icon */}
      <span
        aria-hidden="true"
        className={`absolute text-xs opacity-50 ${isDiya ? 'right-1.5' : 'left-2'}`}
      >
        {isDiya ? '🌙' : '🪔'}
      </span>
    </button>
  )
}
