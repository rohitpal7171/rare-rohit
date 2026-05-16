import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useAudioPlayer } from '../../../../shared/hooks/useAudioPlayer'

// Vitest v4 requires Audio mock to be a real class (not vi.fn())
// Store instance in module scope so tests can access it
const _listeners: Record<string, Array<() => void>> = {}
let _instance: InstanceType<typeof AudioMock>

class AudioMock {
  src = ''
  loop = false
  volume = 1
  muted = false
  currentTime = 0
  play = vi.fn(() => Promise.resolve())
  pause = vi.fn()
  addEventListener = vi.fn((event: string, cb: () => void) => {
    if (!_listeners[event]) _listeners[event] = []
    _listeners[event].push(cb)
  })
  removeEventListener = vi.fn()
  _trigger(event: string) {
    _listeners[event]?.forEach((cb) => { cb() })
  }
  constructor() {
    Object.keys(_listeners).forEach((k) => { delete _listeners[k] })
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    _instance = this
  }
}

beforeEach(() => {
  vi.stubGlobal('Audio', AudioMock)
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
    expect(_instance.muted).toBe(false)
  })

  it('respects startMuted=true', () => {
    renderHook(() => useAudioPlayer('/audio/test.mp3', { startMuted: true }))
    expect(_instance.muted).toBe(true)
  })

  it('sets initialVolume correctly', () => {
    renderHook(() => useAudioPlayer('/audio/test.mp3', { initialVolume: 0.5 }))
    expect(_instance.volume).toBe(0.5)
  })

  it('sets isLoaded=true after canplay fires', () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { _instance._trigger('canplay') })
    expect(result.current.isLoaded).toBe(true)
  })

  it('sets hasError=true after error fires', () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { _instance._trigger('error') })
    expect(result.current.hasError).toBe(true)
  })

  it('does nothing when src is null', () => {
    const { result } = renderHook(() => useAudioPlayer(null))
    expect(result.current.isLoaded).toBe(false)
    expect(result.current.isPlaying).toBe(false)
  })
})

describe('useAudioPlayer — play()', () => {
  it('calls audio.play() and sets isPlaying=true', async () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    _instance.play.mockResolvedValueOnce(undefined)
    act(() => { _instance._trigger('canplay') })
    await act(async () => { result.current.play() })
    expect(_instance.play).toHaveBeenCalledTimes(1)
    expect(result.current.isPlaying).toBe(true)
  })

  it('retries muted when browser blocks', async () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3', { startMuted: false }))
    _instance.play
      .mockRejectedValueOnce(new DOMException('NotAllowedError'))
      .mockResolvedValueOnce(undefined)
    act(() => { _instance._trigger('canplay') })
    await act(async () => { result.current.play() })
    expect(_instance.play).toHaveBeenCalledTimes(2)
    expect(result.current.isPlaying).toBe(true)
  })

  it('does not call play() when hasError=true', async () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    act(() => { _instance._trigger('error') })
    await act(async () => { result.current.play() })
    expect(_instance.play).not.toHaveBeenCalled()
  })
})

describe('useAudioPlayer — pause/toggle/mute/volume/cleanup', () => {
  it('pause() stops playback', async () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    _instance.play.mockResolvedValueOnce(undefined)
    act(() => { _instance._trigger('canplay') })
    await act(async () => { result.current.play() })
    act(() => { result.current.pause() })
    expect(_instance.pause).toHaveBeenCalled()
    expect(result.current.isPlaying).toBe(false)
  })

  it('toggle() plays when not playing', async () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    _instance.play.mockResolvedValueOnce(undefined)
    act(() => { _instance._trigger('canplay') })
    await act(async () => { result.current.toggle() })
    expect(result.current.isPlaying).toBe(true)
  })

  it('toggle() pauses when playing', async () => {
    const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3'))
    _instance.play.mockResolvedValueOnce(undefined)
    act(() => { _instance._trigger('canplay') })
    await act(async () => { result.current.play() })
    act(() => { result.current.toggle() })
    expect(result.current.isPlaying).toBe(false)
  })

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
    act(() => { _instance._trigger('canplay') })
    unmount()
    expect(_instance.pause).toHaveBeenCalled()
    expect(_instance.removeEventListener).toHaveBeenCalled()
  })
})
