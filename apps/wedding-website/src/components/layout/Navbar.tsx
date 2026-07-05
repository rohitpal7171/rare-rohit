import { useEffect, useState } from 'react'

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { LanguageToggle, MobileNav } from '@shared/ui'
import { cn } from '@shared/utils'

import { Monogram } from '@app/components/ornaments/Monogram'
import { weddingConfig } from '@app/config/wedding.config'

const NAV_LINKS = [
  { href: '/#our-story', key: 'ourStory', sectionId: 'our-story' },
  { href: '/#ceremonies', key: 'ceremonies', sectionId: 'ceremonies' },
  { href: '/#schedule', key: 'schedule', sectionId: 'schedule' },
  { href: '/#gallery', key: 'gallery', sectionId: 'gallery' },
  { href: '/#divine-invites', key: 'divineInvites', sectionId: 'divine-invites' },
] as const

type NavKey = (typeof NAV_LINKS)[number]['key']

/**
 * Scroll-spy: which nav section is currently in view.
 * rAF-throttled (max one detect per frame) — same pattern as
 * WeddingCharacters' section detection. Returns null in the Hero
 * or on non-home routes → no underline shown.
 */
const useActiveNavKey = (enabled: boolean): NavKey | null => {
  const [active, setActive] = useState<NavKey | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return undefined
    }

    // Cached absolute section positions — measured only when the page's size
    // actually changes (ResizeObserver on body: lazy sections mounting, images
    // loading, viewport resize). The scroll handler is pure arithmetic on
    // window.scrollY — zero layout reads → no forced reflow while scrolling.
    let offsets: { key: NavKey; top: number; bottom: number }[] = []

    const measure = (): void => {
      const y = window.scrollY
      offsets = []
      for (const { key, sectionId } of NAV_LINKS) {
        const el = document.getElementById(sectionId)
        if (el === null) continue
        const rect = el.getBoundingClientRect()
        offsets.push({ key, top: rect.top + y, bottom: rect.bottom + y })
      }
    }

    const detect = (): NavKey | null => {
      const line = window.scrollY + window.innerHeight * 0.45
      let best: NavKey | null = null
      let bestDist = Infinity
      for (const o of offsets) {
        if (o.bottom < line) continue
        const dist = line - o.top
        if (dist >= 0 && dist < bestDist) {
          bestDist = dist
          best = o.key
        }
      }
      return best
    }

    let rafId = 0
    let pending = false
    const onScroll = (): void => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(() => {
        pending = false
        setActive(detect())
      })
    }

    const ro = new ResizeObserver(() => {
      measure()
      setActive(detect())
    })
    ro.observe(document.body)

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = setTimeout(() => {
      measure()
      setActive(detect())
    }, 500)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      ro.disconnect()
      clearTimeout(t)
    }
  }, [enabled])

  return active
}

export const Navbar = () => {
  const { t } = useTranslation('common')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const isHome = pathname === '/'
  const activeKey = useActiveNavKey(isHome)

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95])
  // Always build the MotionValue string — conditionally apply via opacity instead
  const backgroundColor = useMotionTemplate`rgba(45,27,78,${bgOpacity})`
  // Gold hairline along the bottom edge — fades in as the bar gains a background
  const hairlineOpacity = useTransform(scrollY, [0, 100], [0, 1])

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  return (
    <motion.header
      // Pass backgroundColor always — use opacity 0 on non-home to hide it
      // This avoids the exactOptionalPropertyTypes issue with style={condition ? x : undefined}
      style={{ backgroundColor }}
      className={cn(
        'fixed left-0 right-0 top-0 z-30 transition-all duration-300',
        !isHome && 'bg-divine/95 shadow-divine backdrop-blur-md'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <Monogram
            size={40}
            className="text-gold transition-colors group-hover:text-gold-light"
          />
          <span className="flex flex-col leading-none">
            <span className="font-script text-xl text-gold transition-colors group-hover:text-gold-light">
              {weddingConfig.groom.name.split(' ')[0]}
            </span>
            <span className="font-body text-[10px] tracking-widest text-ivory/50">
              &amp; {weddingConfig.bride.name.split(' ')[0]}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {NAV_LINKS.map(({ href, key }) => (
            <li key={key}>
              <a
                href={href}
                className={cn(
                  'relative font-body text-xs font-medium transition-colors hover:text-gold xl:text-sm',
                  activeKey === key ? 'text-gold' : 'text-ivory/80'
                )}
              >
                {t(`nav.${key}`)}
                {activeKey === key && (
                  <motion.span
                    layoutId="nav-active-underline"
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 right-0 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(201,168,76,0.9), transparent)',
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <MobileNav
            isOpen={mobileOpen}
            onToggle={() => {
              setMobileOpen((v) => !v)
            }}
          >
            <div className="mt-8 flex flex-col gap-5">
              {NAV_LINKS.map(({ href, key }) => (
                <a
                  key={key}
                  href={href}
                  onClick={handleNavClick}
                  className="font-body text-lg font-medium text-ivory/80 transition-colors hover:text-gold"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
              <div className="mt-2 border-t border-gold/20 pt-4">
                <LanguageToggle />
              </div>
            </div>
          </MobileNav>
        </div>
      </nav>

      {/* Gold seam hairline — visible once the bar has a background */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: hairlineOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
    </motion.header>
  )
}
