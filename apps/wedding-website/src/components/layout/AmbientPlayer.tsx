import { useEffect, useRef } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAudioPlayer } from '@shared/hooks'
import { cn } from '@shared/utils'

const AMBIENT_SRC = '/audio/sangeet.mp3'

export const AmbientPlayer = () => {
  const { t } = useTranslation('common')
  const { isPlaying, isMuted, isLoaded, hasError, play, toggle, toggleMute } = useAudioPlayer(
    AMBIENT_SRC,
    { startMuted: true, loop: true, initialVolume: 0.3 }
  )

  const startedRef = useRef(false)

  // Keep latest callbacks in refs — avoids stale closures in effects
  const playRef = useRef(play)
  const toggleMuteRef = useRef(toggleMute)
  useEffect(() => {
    playRef.current = play
  }, [play])
  useEffect(() => {
    toggleMuteRef.current = toggleMute
  }, [toggleMute])

  const isMutedRef = useRef(isMuted)
  useEffect(() => {
    isMutedRef.current = isMuted
  }, [isMuted])

  // Start MUTED playback as soon as the file is playable — browsers allow
  // muted autoplay. The first user interaction then only unmutes, so sound
  // is instant instead of waiting for play() + buffering at tap time.
  const autoStartedRef = useRef(false)
  useEffect(() => {
    if (!isLoaded || autoStartedRef.current) return
    autoStartedRef.current = true
    playRef.current()
  }, [isLoaded])

  // First user interaction → unmute + play, synchronously inside the gesture
  useEffect(() => {
    if (startedRef.current) return undefined

    // pointerdown/keydown/click grant real browser user-activation (touchstart
    // does NOT count as activation). pointerdown also catches desktop
    // mouse-wheel users' first press and mobile scroll-touches at the
    // earliest possible moment.
    const triggers = ['pointerdown', 'keydown', 'click', 'touchstart'] as const

    const handleFirstInteraction = (): void => {
      if (startedRef.current) return
      startedRef.current = true
      // Remove all other listeners immediately
      triggers.forEach((evt) => {
        document.removeEventListener(evt, handleFirstInteraction)
      })
      // We are inside a real user gesture — audible playback is allowed NOW.
      // Unmute synchronously (no setTimeout: browser activation is only
      // guaranteed inside this handler), then play. If the muted auto-start
      // already has the track rolling → instant sound; if playback never
      // started → it starts audibly.
      if (isMutedRef.current) toggleMuteRef.current()
      playRef.current()
    }

    triggers.forEach((evt) => {
      document.addEventListener(evt, handleFirstInteraction, { passive: true })
    })

    return () => {
      triggers.forEach((evt) => {
        document.removeEventListener(evt, handleFirstInteraction)
      })
    }
  }, [])

  const isActive = isPlaying && !isMuted
  const isLoading = !isLoaded && !hasError

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <div className="relative">
        {isLoading && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-3px] rounded-full border-2 border-transparent border-t-gold/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {isActive && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-gold/40"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <motion.button
          onClick={() => {
            // If this click is also the first interaction, let handleFirstInteraction
            // start the audio — don't toggle (which would immediately pause it)
            if (!startedRef.current) return
            toggle()
          }}
          disabled={hasError}
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          {...(!isLoading ? { whileHover: 'hover' } : {})}
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
              {isMuted ? t('audio.tapToUnmute') : t('audio.ambientMusic')}
            </span>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="text-ivory/50 transition-colors hover:text-gold"
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
