import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { Volume2, VolumeX, X } from 'lucide-react'

import { useAudioPlayer } from '@shared/hooks'
import { cn } from '@shared/utils'

// Place shiv-mantra.mp3 in public/audio/ — player silently hides on 404.
const AMBIENT_SRC = '/audio/shiv-mantra.mp3'

export const AmbientPlayer = () => {
  const { isPlaying, isMuted, isLoaded, hasError, toggle, toggleMute } = useAudioPlayer(
    AMBIENT_SRC,
    { startMuted: false, loop: true, initialVolume: 0.18 }
  )
  const [dismissed, setDismissed] = useState(false)

  if (hasError || dismissed) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      {/* Om button */}
      <div className="relative">
        {isPlaying && (
          <motion.span
            className="absolute inset-0 rounded-full border border-gold/40"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}
        <button
          onClick={toggle}
          disabled={!isLoaded}
          aria-label={isPlaying ? 'Pause Shiv mantra' : 'Play Shiv mantra'}
          className={cn(
            'relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500',
            'border bg-divine/90 backdrop-blur-md',
            isPlaying
              ? 'border-gold/60 shadow-[0_0_24px_rgba(201,168,76,0.35)]'
              : 'border-gold/25 hover:border-gold/50 hover:shadow-[0_0_12px_rgba(201,168,76,0.15)]',
            !isLoaded ? 'cursor-wait opacity-50' : 'cursor-pointer'
          )}
        >
          <span
            className={cn(
              'font-hindi text-xl leading-none transition-all duration-500',
              isPlaying ? 'text-gold' : 'text-gold/55'
            )}
            aria-hidden="true"
          >
            ॐ
          </span>
        </button>
      </div>

      {/* Label + controls — visible only when playing */}
      <AnimatePresence>
        {isPlaying && isLoaded && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-divine/90 px-3 py-2 backdrop-blur-md"
          >
            <span className="font-body text-xs text-ivory/65">Shiv Mantra</span>

            <button
              onClick={() => {
                toggleMute()
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="text-ivory/50 transition-colors hover:text-gold"
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>

            <button
              onClick={() => {
                setDismissed(true)
              }}
              aria-label="Dismiss ambient player"
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
