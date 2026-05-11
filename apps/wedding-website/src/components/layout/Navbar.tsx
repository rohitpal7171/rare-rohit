import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { LanguageToggle, MobileNav } from '@shared/ui'
import { cn } from '@shared/utils'

import { weddingConfig } from '@app/config/wedding.config'

const NAV_LINKS = [
  { href: '/#our-story',  key: 'ourStory'   },
  { href: '/#ceremonies', key: 'ceremonies' },
  { href: '/#schedule',   key: 'schedule'   },
  { href: '/#gallery',    key: 'gallery'    },
  { href: '/#wishes',     key: 'wishes'     },
  { href: '/#faq',        key: 'faq'        },
] as const

export const Navbar = () => {
  const { t } = useTranslation('common')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const isHome = pathname === '/'

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95])
  // Always build the MotionValue string — conditionally apply via opacity instead
  const backgroundColor = useMotionTemplate`rgba(45,27,78,${bgOpacity})`

  const handleNavClick = () => { setMobileOpen(false) }

  return (
    <motion.header
      // Pass backgroundColor always — use opacity 0 on non-home to hide it
      // This avoids the exactOptionalPropertyTypes issue with style={condition ? x : undefined}
      style={{ backgroundColor }}
      className={cn(
        'fixed left-0 right-0 top-0 z-30 transition-all duration-300',
        !isHome && 'bg-divine/95 backdrop-blur-md shadow-divine'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-script text-2xl text-gold transition-colors group-hover:text-gold-light">
            {weddingConfig.groom.name.split(' ')[0]}
          </span>
          <span className="font-body text-xs tracking-widest text-ivory/50">
            &amp; {weddingConfig.bride.name.split(' ')[0]}
          </span>
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map(({ href, key }) => (
            <li key={key}>
              <a
                href={href}
                className="font-body text-sm font-medium text-ivory/80 transition-colors hover:text-gold"
              >
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <MobileNav isOpen={mobileOpen} onToggle={() => setMobileOpen((v) => !v)}>
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
    </motion.header>
  )
}
