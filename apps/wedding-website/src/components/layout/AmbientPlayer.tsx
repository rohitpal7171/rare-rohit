import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX, X } from 'lucide-react'

import { useAudioPlayer } from '@shared/hooks'
import { cn } from '@shared/utils'

const AMBIENT_SRC = '/audio/sangeet.mp3'
const TRIGGERS = ['click', 'scroll', 'keydown', 'touchstart', 'mousemove'] as const

export const AmbientPlayer = () => {
  const audio = useAudioPlayer(AMBIENT_SRC, {
    startMuted: false,
    loop: true,
    initialVolume: 0.6,
  })

  const { isPlaying, isMuted, isLoaded, hasError, play, toggle, toggleMute } = audio
  const [dismissed, setDismissed] = useState(false)
  const startedRef = useRef(false)

  // Start audio on: any interaction OR 3 seconds after load — whichever first
  useEffect(() => {
    if (!isLoaded || startedRef.current) return undefined

    const start = (): void => {
      if (startedRef.current) return
      startedRef.current = true
      play()
      TRIGGERS.forEach((evt) => {
        document.removeEventListener(evt, start)
      })
    }

    const timer = window.setTimeout(start, 3000)
    TRIGGERS.forEach((evt) => {
      document.addEventListener(evt, start, { passive: true, once: true })
    })

    return () => {
      window.clearTimeout(timer)
      TRIGGERS.forEach((evt) => {
        document.removeEventListener(evt, start)
      })
    }
  }, [isLoaded, play])

  // If we ended up muted (browser forced it), unmute on next interaction
  useEffect(() => {
    if (!isPlaying || !isMuted) return undefined

    const unmute = (): void => {
      toggleMute()
    }
    TRIGGERS.forEach((evt) => {
      document.addEventListener(evt, unmute, { passive: true, once: true })
    })

    return () => {
      TRIGGERS.forEach((evt) => {
        document.removeEventListener(evt, unmute)
      })
    }
  }, [isPlaying, isMuted, toggleMute])

  if (dismissed) return null

  const isActive = isPlaying && !isMuted
  const isLoading = !isLoaded && !hasError

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <div className="relative">
        {isLoading && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-[-3px] rounded-full border-2 border-transparent border-t-gold/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {isActive && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-gold/40"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <motion.button
          onClick={toggle}
          disabled={hasError}
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          whileHover="hover"
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className={cn(
            'relative flex h-12 w-12 items-center justify-center rounded-full',
            'border bg-divine/90 backdrop-blur-md',
            'transition-[border-color,box-shadow] duration-300',
            isActive ? 'border-gold/60 shadow-[0_0_24px_rgba(201,168,76,0.4)]' : 'border-gold/25',
            hasError ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
          )}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-3px] rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(201,168,76,0.9) 0deg, transparent 100deg, transparent 360deg)',
            }}
            variants={{
              hover: {
                opacity: 1,
                rotate: 360,
                transition: {
                  rotate: { repeat: Infinity, duration: 1.2, ease: 'linear' },
                  opacity: { duration: 0.15 },
                },
              },
            }}
            initial={{ opacity: 0, rotate: 0 }}
          />

          <span
            aria-hidden="true"
            className="relative z-10 font-hindi text-xl leading-none"
            style={{
              color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.65)',
              textShadow: isActive ? '0 0 10px rgba(201,168,76,0.7)' : 'none',
              transition: 'color 0.5s, text-shadow 0.5s',
            }}
          >
            ॐ
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isPlaying && isLoaded && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-divine/90 px-3 py-2 backdrop-blur-md"
          >
            <span className="font-body text-xs text-ivory/65">
              {isMuted ? 'Tap to unmute' : 'Ambient Music'}
            </span>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="text-ivory/50 transition-colors hover:text-gold"
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button
              onClick={() => {
                setDismissed(true)
              }}
              aria-label="Dismiss player"
              className="text-ivory/30 transition-colors hover:text-ivory/60"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
