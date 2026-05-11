import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseAudioPlayerOptions {
  /** Start muted — user must click play. Default: true */
  startMuted?: boolean
  /** Loop the track. Default: true */
  loop?: boolean
  /** Initial volume 0–1. Default: 0.4 */
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
  currentTime: number
  duration: number
}

export const useAudioPlayer = (
  src: string | null,
  options: UseAudioPlayerOptions = {}
): UseAudioPlayerReturn => {
  const { startMuted = true, loop = true, initialVolume = 0.4 } = options

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(startMuted)
  const [volume, setVolumeState] = useState(initialVolume)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Create / destroy audio element when src changes
  useEffect(() => {
    if (src === null) return

    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = initialVolume
    audio.muted = startMuted
    audioRef.current = audio

    // Reset state for new src
    setIsLoaded(false)
    setHasError(false)
    setIsPlaying(false)
    setCurrentTime(0)

    const onCanPlay = () => setIsLoaded(true)
    const onError = () => { setHasError(true); setIsLoaded(false) }
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDurationChange = () => setDuration(audio.duration)
    const onEnded = () => { if (!loop) setIsPlaying(false) }

    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
      audioRef.current = null
      setIsPlaying(false)
      setIsLoaded(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const play = useCallback(() => {
    if (audioRef.current === null || hasError) return
    void audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true))
  }, [hasError])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const toggleMute = useCallback(() => {
    if (audioRef.current === null) return
    const next = !isMuted
    audioRef.current.muted = next
    setIsMuted(next)
  }, [isMuted])

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v))
    if (audioRef.current !== null) audioRef.current.volume = clamped
    setVolumeState(clamped)
  }, [])

  const seek = useCallback((seconds: number) => {
    if (audioRef.current === null) return
    audioRef.current.currentTime = seconds
    setCurrentTime(seconds)
  }, [])

  return { isPlaying, isMuted, volume, isLoaded, hasError, play, pause, toggle, toggleMute, setVolume, seek, currentTime, duration }
}
