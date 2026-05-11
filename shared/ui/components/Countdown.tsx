import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { cn } from '../../utils/cn'
import { useCountdown } from '../../hooks/useCountdown'
import { scaleInBounce, staggerContainerFast } from '../../utils/animations'

export interface CountdownProps {
  targetDate: string
  className?: string
}

interface TimeUnitProps {
  value: number
  label: string
}

const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <motion.div variants={scaleInBounce} className="flex flex-col items-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gold/40 bg-maroon/80 backdrop-blur-sm sm:h-20 sm:w-20">
      <span className="font-display text-3xl font-bold text-gold sm:text-4xl">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="mt-1 font-body text-xs uppercase tracking-widest text-ivory/70 sm:text-sm">
      {label}
    </span>
  </motion.div>
)

export const Countdown = ({ targetDate, className }: CountdownProps) => {
  const { t } = useTranslation('home')
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div className={cn('text-center font-display text-2xl text-gold', className)}>
        {t('hero.weddingDay')}
      </div>
    )
  }

  return (
    // staggerContainerFast so each unit animates in with a slight delay after the previous
    <motion.div
      variants={staggerContainerFast}
      initial="hidden"
      animate="visible"
      className={cn('flex gap-3 sm:gap-6', className)}
    >
      <TimeUnit value={days} label={t('hero.countdown.days')} />
      <TimeUnit value={hours} label={t('hero.countdown.hours')} />
      <TimeUnit value={minutes} label={t('hero.countdown.minutes')} />
      <TimeUnit value={seconds} label={t('hero.countdown.seconds')} />
    </motion.div>
  )
}
