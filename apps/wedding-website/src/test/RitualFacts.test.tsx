import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RitualFacts } from '../components/ceremonies/RitualFacts'

vi.mock('@shared/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}))

// ── Rendering ─────────────────────────────────────────────────────────────────

describe('RitualFacts — rendering', () => {
  it('renders 3 flip cards for a ceremony', () => {
    render(React.createElement(RitualFacts, { slug: 'haldi' }))
    // Each card is a role="button"
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('renders the section heading via i18n key', () => {
    render(React.createElement(RitualFacts, { slug: 'haldi' }))
    expect(screen.getByText('ceremony.didYouKnow')).toBeInTheDocument()
  })

  it('renders the tapToReveal subtitle via i18n key', () => {
    render(React.createElement(RitualFacts, { slug: 'baraat' }))
    expect(screen.getByText('ceremony.tapToReveal')).toBeInTheDocument()
  })

  it('shows flipReveal hint on every unflipped card', () => {
    render(React.createElement(RitualFacts, { slug: 'pheras' }))
    // 3 cards × 1 hint each
    expect(screen.getAllByText('ceremony.flipReveal')).toHaveLength(3)
  })

  it('applies className prop to the wrapper', () => {
    const { container } = render(
      React.createElement(RitualFacts, { slug: 'haldi', className: 'test-class' })
    )
    expect(container.firstChild).toHaveClass('test-class')
  })
})

// ── Flip interaction ──────────────────────────────────────────────────────────

describe('RitualFacts — flip card interaction', () => {
  it('card starts unflipped (aria-pressed=false)', () => {
    render(React.createElement(RitualFacts, { slug: 'haldi' }))
    const cards = screen.getAllByRole('button')
    expect(cards[0]).toHaveAttribute('aria-pressed', 'false')
  })

  it('clicking a card flips it (aria-pressed=true)', () => {
    render(React.createElement(RitualFacts, { slug: 'haldi' }))
    const card = screen.getAllByRole('button')[0]
    fireEvent.click(card)
    expect(card).toHaveAttribute('aria-pressed', 'true')
  })

  it('clicking a flipped card flips it back', () => {
    render(React.createElement(RitualFacts, { slug: 'haldi' }))
    const card = screen.getAllByRole('button')[0]
    fireEvent.click(card)
    fireEvent.click(card)
    expect(card).toHaveAttribute('aria-pressed', 'false')
  })

  it('each card flips independently', () => {
    render(React.createElement(RitualFacts, { slug: 'haldi' }))
    const [first, second, third] = screen.getAllByRole('button')
    fireEvent.click(first)
    expect(first).toHaveAttribute('aria-pressed', 'true')
    expect(second).toHaveAttribute('aria-pressed', 'false')
    expect(third).toHaveAttribute('aria-pressed', 'false')
  })

  it('Enter key flips a card', () => {
    render(React.createElement(RitualFacts, { slug: 'mehendi' }))
    const card = screen.getAllByRole('button')[1]
    fireEvent.keyDown(card, { key: 'Enter' })
    expect(card).toHaveAttribute('aria-pressed', 'true')
  })

  it('Space key flips a card', () => {
    render(React.createElement(RitualFacts, { slug: 'sangeet' }))
    const card = screen.getAllByRole('button')[2]
    fireEvent.keyDown(card, { key: ' ' })
    expect(card).toHaveAttribute('aria-pressed', 'true')
  })

  it('other keys do not flip a card', () => {
    render(React.createElement(RitualFacts, { slug: 'haldi' }))
    const card = screen.getAllByRole('button')[0]
    fireEvent.keyDown(card, { key: 'Tab' })
    expect(card).toHaveAttribute('aria-pressed', 'false')
  })
})

// ── Slug variation ────────────────────────────────────────────────────────────

describe('RitualFacts — slug variation', () => {
  const slugs = ['haldi', 'mehendi', 'sangeet', 'baraat', 'pheras', 'vidaai'] as const

  slugs.forEach((slug) => {
    it(`renders 3 cards for slug="${slug}"`, () => {
      render(React.createElement(RitualFacts, { slug }))
      expect(screen.getAllByRole('button')).toHaveLength(3)
    })
  })
})
