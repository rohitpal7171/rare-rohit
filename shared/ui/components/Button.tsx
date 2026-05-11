import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  className?: string
  children?: ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  'aria-label'?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-saffron text-ivory hover:bg-saffron-dark border-2 border-saffron-dark shadow-lg shadow-saffron/20',
  secondary:
    'bg-maroon text-ivory hover:bg-maroon-light border-2 border-maroon-dark shadow-lg shadow-maroon/20',
  ghost:
    'bg-transparent text-gold border-2 border-gold hover:bg-gold/10',
  gold:
    'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-ivory border-0 shadow-lg shadow-gold/30',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      disabled={disabled ?? isLoading}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full font-body font-semibold',
        'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </motion.button>
  )
}
