import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useAudioPlayer } from '../../../../shared/hooks/useAudioPlayer'

// ── Mock HTMLAudioElement ─────────────────────────────────────────────────
// Vitest v4 requires a proper class for `new Audio()` to work
interface MockAudio {
  src: string
  loop: boolean
  volume: number
  muted: boolean
  currentTime: number
  play: ReturnType<typeof vi.fn>
  pause: ReturnType<typeof vi.fn>
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  _trigger: (event: string) => void
}

let mockAudio: MockAudio

class MockAudioClass {
  src = ''
  loop = false
  volume = 1
  muted = false
  currentTime = 0
  play = vi.fn(() => Promise.resolve())
  pause = vi.fn()
  private listeners: Record<string, Array<() => void>> = {}

  addEventListener = vi.fn((event: string, cb: () => void) => {
    if (!this.listeners[event]) this.listeners[event] = []
    this.listeners[event].push(cb)
  })

  removeEventListener = vi.fn()

  _trigger(event: string) {
    this.listeners[event]?.forEach((cb) => cb())
  }
}

beforeEach(() => {
  const instance = new MockAudioClass()
  mockAudio = instance as unknown as MockAudio
  vi.stubGlobal('Audio', class {
    constructor() {
      // Copy all properties from instance to this
      Object.assign(this, instance)
      return instance
    }
  })
  vi.useFakeTimers()
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('useAudioPlayer — initial state', () => {
  it('starts with isPlaying=false and isLoaded=false', () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.isLoaded).toBe(false)
    expect(result.current.hasError).toBe(false)
  })

  it('respects startMuted=false', () => {
    renderHook(() => useAudioPlayer('/audio/test.mp3', { startMuted: false }))
    expect(mockAudio.muted).toBe(false)
  })

  it('respects startMuted=true', () => {
    renderHook(() => useAudioPlayer('/audio/test.mp3', { startMuted: true }))
    expect(mockAudio.muted).toBe(true)
  })

  it('sets initialVolume correctly', () => {
    renderHook(() => useAudioPlayer('/audio/test.mp3', { initialVolume: 0.5 }))
    expect(mockAudio.volume).toBe(0.5)
  })

  it('sets isLoaded=true after canplay fires', () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('canplay') })
    expect(result.current.isLoaded).toBe(true)
  })

  it('sets hasError=true after error fires', () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('error') })
    expect(result.current.hasError).toBe(true)
    expect(result.current.isLoaded).toBe(false)
  })

  it('does nothing when src is null', () => {
    const { result } = renderHook(() => useAudioPlayer(null))
    expect(result.current.isLoaded).toBe(false)
    expect(result.current.isPlaying).toBe(false)
  })
})

describe('useAudioPlayer — play()', () => {
  it('calls audio.play() and sets isPlaying=true', async () => {
    mockAudio.play.mockResolvedValueOnce(undefined)
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('canplay') })
    await act(async () => { result.current.play() })
    expect(mockAudio.play).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(true)
  })

  it('retries muted when browser blocks', async () => {
    mockAudio.play
      .mockRejectedValueOnce(new DOMException('NotAllowedError'))
      .mockResolvedValueOnce(undefined)
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3', { startMuted: false }))
    act(() => { mockAudio._trigger('canplay') })
    await act(async () => { result.current.play() })
    expect(mockAudio.play).toHaveBeenCalledTimes(2)
    expect(result.current.isPlaying).toBe(true)
  })

  it('does not call play() when hasError=true', async () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('error') })
    await act(async () => { result.current.play() })
    expect(mockAudio.play).not.toHaveBeenCalled()
  })
})

describe('useAudioPlayer — pause() and toggle()', () => {
  it('pause() stops playback', async () => {
    mockAudio.play.mockResolvedValueOnce(undefined)
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('canplay') })
    await act(async () => { result.current.play() })
    act(() => { result.current.pause() })
    expect(mockAudio.pause).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(false)
  })

  it('toggle() plays when not playing', async () => {
    mockAudio.play.mockResolvedValueOnce(undefined)
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('canplay') })
    await act(async () => { result.current.toggle() })
    expect(result.current.isPlaying).toBe(true)
  })

  it('toggle() pauses when playing', async () => {
    mockAudio.play.mockResolvedValueOnce(undefined)
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('canplay') })
    await act(async () => { result.current.play() })
    act(() => { result.current.toggle() })
    expect(result.current.isPlaying).toBe(false)
  })
})

describe('useAudioPlayer — mute/volume/cleanup', () => {
  it('toggleMute() flips state', () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3', { startMuted: false }))
    act(() => { result.current.toggleMute() })
    expect(result.current.isMuted).toBe(true)
    act(() => { result.current.toggleMute() })
    expect(result.current.isMuted).toBe(false)
  })

  it('setVolume() clamps to 0-1', () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { result.current.setVolume(2.5) })
    expect(result.current.volume).toBe(1)
    act(() => { result.current.setVolume(-1) })
    expect(result.current.volume).toBe(0)
    act(() => { result.current.setVolume(0.6) })
    expect(result.current.volume).toBe(0.6)
  })

  it('cleans up on unmount', () => {
    const { unmount } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { mockAudio._trigger('canplay') })
    unmount()
    expect(mockAudio.pause).toHaveBeenCalled()
    expect(mockAudio.removeEventListener).toHaveBeenCalled()
  })
})
