import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseAudioPlayerOptions {
  startMuted?: boolean
  loop?: boolean
  initialVolume?: number
}

export interface UseAudioPlayerReturn {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  isLoaded: boolean
  hasError: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  toggleMute: () => void
  setVolume: (v: number) => void
  seek: (seconds: number) => void
}

// ── Module-level audio cache ───────────────────────────────────────────────
// One Audio element per src — never created twice for the same file.
// This prevents the double-download when two components use the same src.
const audioCache = new Map<string, HTMLAudioElement>()

const getOrCreateAudio = (src: string): HTMLAudioElement => {
  const existing = audioCache.get(src)
  if (existing !== undefined) return existing
  const audio = new Audio(src)
  audio.preload = 'auto'
  audioCache.set(src, audio)
  return audio
}

export const useAudioPlayer = (
  src: string | null,
  options: UseAudioPlayerOptions = {}
): UseAudioPlayerReturn => {
  const { startMuted = false, loop = true, initialVolume = 0.6 } = options

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted]     = useState(startMuted)
  const [volume, setVolumeState]  = useState(initialVolume)
  const [isLoaded, setIsLoaded]   = useState(false)
  const [hasError, setHasError]   = useState(false)

  useEffect(() => {
    if (src === null) return undefined

    const audio = getOrCreateAudio(src)
    audio.loop   = loop
    audio.volume = initialVolume
    audio.muted  = startMuted
    audioRef.current = audio

    // If already loaded (cached), set state immediately
    if (audio.readyState >= 3) {
      setIsLoaded(true)
      setHasError(false)
    } else {
      setIsLoaded(false)
      setHasError(false)
    }

    setIsPlaying(!audio.paused)
    setIsMuted(audio.muted)

    const onCanPlay = (): void => { setIsLoaded(true) }
    const onError   = (): void => { setHasError(true); setIsLoaded(false) }
    const onEnded   = (): void => { if (!loop) setIsPlaying(false) }
    const onPlay    = (): void => { setIsPlaying(true) }
    const onPause   = (): void => { setIsPlaying(false) }

    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const play = useCallback((): void => {
    if (audioRef.current === null || hasError) return
    void audioRef.current
      .play()
      .then(() => { setIsPlaying(true) })
      .catch(() => {
        if (audioRef.current !== null) {
          audioRef.current.muted = true
          setIsMuted(true)
          void audioRef.current
            .play()
            .then(() => { setIsPlaying(true) })
            .catch(() => { setHasError(true) })
        }
      })
  }, [hasError])

  const pause = useCallback((): void => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback((): void => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const toggleMute = useCallback((): void => {
    if (audioRef.current === null) return
    const next = !isMuted
    audioRef.current.muted = next
    setIsMuted(next)
  }, [isMuted])

  const setVolume = useCallback((v: number): void => {
    const clamped = Math.max(0, Math.min(1, v))
    if (audioRef.current !== null) audioRef.current.volume = clamped
    setVolumeState(clamped)
  }, [])

  const seek = useCallback((seconds: number): void => {
    if (audioRef.current === null) return
    audioRef.current.currentTime = seconds
  }, [])

  return { isPlaying, isMuted, volume, isLoaded, hasError, play, pause, toggle, toggleMute, setVolume, seek }
}
