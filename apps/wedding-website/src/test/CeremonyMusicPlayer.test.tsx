import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CeremonyMusicPlayer } from '../components/ceremonies/CeremonyMusicPlayer'

vi.mock('@shared/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}))

const mockToggle = vi.fn()
const mockToggleMute = vi.fn()
const mockSetVolume = vi.fn()

const defaultState = {
  isPlaying: false,
  isMuted: true,
  isLoaded: false,
  hasError: false,
  volume: 0.35,
  play: vi.fn(),
  pause: vi.fn(),
  toggle: mockToggle,
  toggleMute: mockToggleMute,
  setVolume: mockSetVolume,
  seek: vi.fn(),
}

let hookState = { ...defaultState }

vi.mock('@shared/hooks', () => ({
  useAudioPlayer: () => hookState,
}))

beforeEach(() => {
  hookState = {
    ...defaultState,
    toggle: mockToggle,
    toggleMute: mockToggleMute,
    setVolume: mockSetVolume,
  }
  mockToggle.mockReset()
  mockToggleMute.mockReset()
  mockSetVolume.mockReset()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ── Rendering ─────────────────────────────────────────────────────────────────

describe('CeremonyMusicPlayer — rendering', () => {
  it('renders the music player region', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('aria-label contains the translated mood key for the slug', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    // mock t() returns key — so mood becomes 'haldi.mood'
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Ceremony music: haldi.mood')
  })

  it('shows mood key when loaded', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'baraat' }))
    expect(screen.getByText('baraat.mood')).toBeInTheDocument()
  })

  it('shows audio.loading key while loading', () => {
    hookState = { ...hookState, isLoaded: false }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'pheras' }))
    expect(screen.getByText('audio.loading')).toBeInTheDocument()
  })

  it('shows audio.tapToUnmute key when playing muted', () => {
    hookState = { ...hookState, isPlaying: true, isMuted: true, isLoaded: true }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    expect(screen.getByText('audio.tapToUnmute')).toBeInTheDocument()
  })

  it('renders nothing when hasError=true', () => {
    hookState = { ...hookState, hasError: true }
    const { container } = render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    expect(container.firstChild).toBeNull()
  })
})

// ── Dismissed state ───────────────────────────────────────────────────────────

describe('CeremonyMusicPlayer — dismiss', () => {
  it('renders nothing after close button is clicked', () => {
    hookState = { ...hookState, isLoaded: true }
    const { container } = render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    fireEvent.click(screen.getByRole('button', { name: /close music player/i }))
    expect(container.firstChild).toBeNull()
  })
})

// ── Controls ──────────────────────────────────────────────────────────────────

describe('CeremonyMusicPlayer — controls', () => {
  it('play button calls toggle()', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    fireEvent.click(screen.getByRole('button', { name: /^play$/i }))
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('play button is disabled while loading', () => {
    hookState = { ...hookState, isLoaded: false }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    expect(screen.getByRole('button', { name: /^play$/i })).toBeDisabled()
  })

  it('mute button calls toggleMute()', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    fireEvent.click(screen.getByRole('button', { name: /unmute/i }))
    expect(mockToggleMute).toHaveBeenCalledTimes(1)
  })

  it('volume slider calls setVolume on change', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(CeremonyMusicPlayer, { slug: 'haldi' }))
    // Click mute button to reveal volume slider
    fireEvent.click(screen.getByRole('button', { name: /unmute/i }))
    const slider = screen.getByRole('slider', { name: /volume/i })
    fireEvent.change(slider, { target: { value: '0.5' } })
    expect(mockSetVolume).toHaveBeenCalledWith(0.5)
  })
})

// ── Slug variation ────────────────────────────────────────────────────────────

describe('CeremonyMusicPlayer — slug-specific behaviour', () => {
  const slugs = ['haldi', 'mehendi', 'sangeet', 'baraat', 'pheras', 'vidaai'] as const

  slugs.forEach((slug) => {
    it(`renders without error for slug="${slug}"`, () => {
      hookState = { ...hookState, isLoaded: true }
      expect(() => {
        render(React.createElement(CeremonyMusicPlayer, { slug }))
      }).not.toThrow()
    })
  })
})
