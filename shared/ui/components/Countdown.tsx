import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { cn } from '../../utils/cn'
import { useCountdown } from '../../hooks/useCountdown'
import { scaleInBounce, staggerContainerFast, tickIn } from '../../utils/animations'

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
    <div className="relative flex h-[4.25rem] w-16 items-center justify-center overflow-hidden rounded-xl border border-gold/30 bg-divine-dark/90 shadow-inner-gold sm:h-24 sm:w-20 sm:rounded-2xl">
      {/* Ornament star at the crown of each frame */}
      <span className="absolute top-1.5 text-[8px] text-gold/40" aria-hidden="true">
        ✦
      </span>
      {/* key={value} remounts the digit → tickIn plays on every change */}
      <motion.span
        key={value}
        variants={tickIn}
        initial="hidden"
        animate="visible"
        className="font-display text-3xl font-bold tabular-nums text-gradient-gold sm:text-4xl"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </div>
    <span className="mt-2 font-body text-[10px] uppercase tracking-[0.22em] text-ivory/60 sm:text-xs">
      {label}
    </span>
  </motion.div>
)

const UnitSeparator = () => (
  <div className="hidden h-24 items-center sm:flex" aria-hidden="true">
    <span className="text-xs text-gold/40">✦</span>
  </div>
)

export const Countdown = ({ targetDate, className }: CountdownProps) => {
  const { t } = useTranslation('home')
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div
        className={cn(
          'card-ornate inline-block rounded-2xl border border-gold/30 bg-divine-dark/80 px-8 py-4 text-center',
          className
        )}
      >
        <span className="font-display text-2xl font-bold text-gradient-gold sm:text-3xl">
          {t('hero.weddingDay')}
        </span>
      </div>
    )
  }

  return (
    // staggerContainerFast so each unit animates in with a slight delay after the previous
    <motion.div
      variants={staggerContainerFast}
      initial="hidden"
      animate="visible"
      className={cn('flex items-start gap-3 sm:gap-4', className)}
    >
      <TimeUnit value={days} label={t('hero.countdown.days')} />
      <UnitSeparator />
      <TimeUnit value={hours} label={t('hero.countdown.hours')} />
      <UnitSeparator />
      <TimeUnit value={minutes} label={t('hero.countdown.minutes')} />
      <UnitSeparator />
      <TimeUnit value={seconds} label={t('hero.countdown.seconds')} />
    </motion.div>
  )
}
