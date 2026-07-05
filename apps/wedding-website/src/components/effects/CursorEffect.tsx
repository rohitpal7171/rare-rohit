import { useEffect, useRef } from 'react'

import { useMediaQuery } from '@shared/hooks'

// ── Types ─────────────────────────────────────────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  emoji: string
  rotation: number
  rotationSpeed: number
}

const EMOJIS_MOVE = ['🌸', '🌼', '✨', '🌺'] as const
const EMOJIS_CLICK = ['🪔', '🌸', '✨', '🌼', '🌺', '💛'] as const
const MAX_PARTICLES = 40

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T
}

/**
 * CursorEffect
 * Canvas-based floating petals + diya flame trail.
 * Mouse move → petal trail | Click → diya burst
 *
 * Performance rules (2026-07-03):
 * - Demand-driven rAF — the loop STOPS when no particles are alive and
 *   restarts on spawn. Never burns frames while idle.
 * - Disabled entirely on touch devices (pointer: coarse) — phones have no
 *   cursor, and spawning particles on touchmove caused jank during scroll.
 * - Fully disabled when prefers-reduced-motion: reduce
 * - pointer-events: none — never blocks any interaction
 */
export const CursorEffect = () => {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')
  const disabled = prefersReduced || isCoarsePointer

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const runningRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (disabled) return undefined

    const canvas = canvasRef.current
    if (canvas === null) return undefined
    const ctx = canvas.getContext('2d')
    if (ctx === null) return undefined

    const resize = (): void => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.06
        p.vx *= 0.98
        p.life -= 1 / p.maxLife
        p.rotation += p.rotationSpeed
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.font = `${p.size}px serif`
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillText(p.emoji, -p.size / 2, p.size / 2)
        ctx.restore()
      }
      // Demand-driven loop — stop when nothing is alive.
      // (Canvas was cleared at the top of this frame, so it ends clean.)
      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        runningRef.current = false
      }
    }

    const ensureRunning = (): void => {
      if (runningRef.current) return
      runningRef.current = true
      rafRef.current = requestAnimationFrame(animate)
    }

    const spawnParticles = (x: number, y: number, count: number, forClick: boolean): void => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = forClick ? 1.5 + Math.random() * 3 : 0.3 + Math.random() * 1.2
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (forClick ? 1.5 : 0.8),
          life: 1,
          maxLife: forClick
            ? 50 + Math.floor(Math.random() * 30)
            : 30 + Math.floor(Math.random() * 20),
          size: forClick ? 18 + Math.random() * 10 : 12 + Math.random() * 8,
          emoji: forClick ? randomFrom(EMOJIS_CLICK) : randomFrom(EMOJIS_MOVE),
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 6,
        })
      }
      if (particlesRef.current.length > MAX_PARTICLES) {
        particlesRef.current = particlesRef.current.slice(-MAX_PARTICLES)
      }
      ensureRunning()
    }

    const handleMouseMove = (e: MouseEvent): void => {
      const last = lastPosRef.current
      if (last !== null) {
        const dx = e.clientX - last.x
        const dy = e.clientY - last.y
        if (Math.sqrt(dx * dx + dy * dy) < 12) return
      }
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      spawnParticles(e.clientX, e.clientY, 2, false)
    }
    const handleClick = (e: MouseEvent): void => {
      spawnParticles(e.clientX, e.clientY, 8, true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      runningRef.current = false
      particlesRef.current = []
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [disabled])

  if (disabled) return null

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50" />
  )
}
