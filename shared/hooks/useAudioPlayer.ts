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

export const useAudioPlayer = (
  src: string | null,
  options: UseAudioPlayerOptions = {}
): UseAudioPlayerReturn => {
  const { startMuted = false, loop = true, initialVolume = 0.6 } = options

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(startMuted)
  const [volume, setVolumeState] = useState(initialVolume)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (src === null) return undefined

    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = initialVolume
    audio.muted = startMuted // respect the option as passed
    audioRef.current = audio

    setIsLoaded(false)
    setHasError(false)
    setIsPlaying(false)
    setIsMuted(startMuted)

    const onCanPlay = (): void => {
      setIsLoaded(true)
    }
    const onError = (): void => {
      setHasError(true)
      setIsLoaded(false)
    }
    const onEnded = (): void => {
      if (!loop) setIsPlaying(false)
    }

    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('ended', onEnded)
      audioRef.current = null
      setIsPlaying(false)
      setIsLoaded(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const play = useCallback((): void => {
    if (audioRef.current === null || hasError) return
    void audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        // Browser blocked — try once with mute, may succeed silently
        if (audioRef.current !== null) {
          audioRef.current.muted = true
          setIsMuted(true)
          void audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true)
            })
            .catch(() => {
              setHasError(true)
            })
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

  return {
    isPlaying,
    isMuted,
    volume,
    isLoaded,
    hasError,
    play,
    pause,
    toggle,
    toggleMute,
    setVolume,
    seek,
  }
}
