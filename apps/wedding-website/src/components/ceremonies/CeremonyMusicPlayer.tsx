import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { useState } from 'react'

import { useAudioPlayer } from '@shared/hooks'
import { cn } from '@shared/utils'

import type { CeremonySlug } from '@shared/utils'

// ── Audio track map ────────────────────────────────────────────────────────
// Place MP3 files in public/audio/ — filenames must match these exactly.
// Files are loaded lazily — no error if missing (player hides itself).
const CEREMONY_AUDIO: Record<CeremonySlug, string> = {
  haldi:     '/audio/haldi.mp3',
  mehendi:   '/audio/mehendi.mp3',
  sangeet:   '/audio/sangeet.mp3',
  baraat:    '/audio/baraat.mp3',
  pheras:    '/audio/pheras.mp3',
  vidaai:    '/audio/vidaai.mp3',
}

// ── Ceremony mood labels ───────────────────────────────────────────────────
const CEREMONY_MOOD: Record<CeremonySlug, string> = {
  haldi:     'Folk & Dhol',
  mehendi:   'Soft Ghazal',
  sangeet:   'Bollywood Beats',
  baraat:    'Shehnai & Dhol',
  pheras:    'Vedic Mantras',
  vidaai:    'Classical',
}

export interface CeremonyMusicPlayerProps {
  slug: CeremonySlug
}

/**
 * CeremonyMusicPlayer
 * Fixed bottom-right sticky player. Auto-muted on mount.
 * Gracefully hides itself if audio file is missing (hasError).
 * Dismissible — user can close it for the session.
 */
export const CeremonyMusicPlayer = ({ slug }: CeremonyMusicPlayerProps) => {
  const src = CEREMONY_AUDIO[slug] ?? null
  const { isPlaying, isMuted, isLoaded, hasError, toggle, toggleMute, setVolume, volume } =
    useAudioPlayer(src, { startMuted: true, loop: true, initialVolume: 0.35 })

  const [dismissed, setDismissed] = useState(false)
  const [showVolume, setShowVolume] = useState(false)

  // Hide if audio file doesn't exist or user dismissed
  if (hasError || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="music-player"
        role="region"
        aria-label={`Ceremony music: ${CEREMONY_MOOD[slug]}`}
      >
        {/* Music icon */}
        <div className="flex items-center gap-1.5">
          <Music size={14} className="text-gold/70" aria-hidden="true" />
          <span className="font-body text-xs text-ivory/60">
            {isLoaded ? CEREMONY_MOOD[slug] : 'Loading...'}
          </span>
        </div>

        {/* Volume slider (expandable) */}
        <AnimatePresence>
          {showVolume && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 72, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 cursor-pointer accent-gold"
            />
          )}
        </AnimatePresence>

        {/* Mute button */}
        <button
          onClick={() => {
            toggleMute()
            setShowVolume((v) => !v)
          }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="text-ivory/60 transition-colors hover:text-gold"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Play/Pause */}
        <button
          onClick={toggle}
          disabled={!isLoaded}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 transition-all',
            'hover:border-gold hover:bg-gold/10',
            !isLoaded && 'cursor-wait opacity-50'
          )}
        >
          {isPlaying
            ? <Pause size={14} className="text-gold" />
            : <Play size={14} className="text-gold" />
          }
        </button>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close music player"
          className="text-ivory/30 transition-colors hover:text-ivory/70"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
