import { type ReactNode, useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { Check, Copy, Facebook, Instagram, Share2, X } from 'lucide-react'

import { cn } from '@shared/utils'

const SITE_URL = 'https://rohitwedspriti.netlify.app'
const SHARE_TEXT = 'Rohit weds Priti 💛 — Join us for the wedding celebrations! #RohitWedsPriti'

// WhatsApp has no icon in lucide-react — inline SVG
const WhatsAppIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface ShareOption {
  key: string
  label: string
  icon: ReactNode
  color: string
  action: () => void | Promise<void>
}

export const ShareButton = () => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close panel when clicking outside
  useEffect(() => {
    if (!open) return undefined
    const handleClickOutside = (e: MouseEvent): void => {
      if (wrapperRef.current !== null && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const copyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard not available — silently ignore
    }
  }

  const shareWhatsApp = (): void => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n${SITE_URL}`)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareFacebook = (): void => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Instagram has no web share URL API.
  // On mobile: try instagram:// URI scheme to open the app directly.
  // On desktop: copy link + open instagram.com.
  const shareInstagram = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(SITE_URL)
    } catch {
      // ignore
    }
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent)
    if (isMobile) {
      // URI scheme opens Instagram app directly if installed
      window.location.href = 'instagram://'
    } else {
      window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer')
    }
  }

  const SHARE_OPTIONS: ShareOption[] = [
    {
      key: 'copy',
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />,
      color: 'hover:text-gold hover:border-gold/50',
      action: copyLink,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      icon: <WhatsAppIcon />,
      color: 'hover:text-[#25D366] hover:border-[#25D366]/40',
      action: shareWhatsApp,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: <Facebook size={14} aria-hidden="true" />,
      color: 'hover:text-[#1877F2] hover:border-[#1877F2]/40',
      action: shareFacebook,
    },
    {
      key: 'instagram',
      label: 'Instagram',
      icon: <Instagram size={14} aria-hidden="true" />,
      color: 'hover:text-[#E1306C] hover:border-[#E1306C]/40',
      action: shareInstagram,
    },
  ]

  return (
    <div ref={wrapperRef} className="relative flex flex-col items-center">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Share this wedding website"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 rounded-full border px-4 py-2',
          'font-body text-xs backdrop-blur-md transition-all duration-300',
          open
            ? 'border-gold/50 bg-divine text-gold'
            : 'border-gold/25 bg-divine/80 text-ivory/60 hover:border-gold/50 hover:text-gold'
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <X size={13} aria-hidden="true" />
              Close
            </motion.span>
          ) : (
            <motion.span
              key="share"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <Share2 size={13} aria-hidden="true" />
              Share
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Share options panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-3 flex flex-col gap-2 rounded-2xl border border-gold/20 bg-divine/95 p-3 backdrop-blur-md"
            style={{ minWidth: '160px' }}
          >
            {/* Decorative arrow pointing down */}
            <div
              aria-hidden="true"
              className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-gold/20 bg-divine/95"
            />

            {SHARE_OPTIONS.map(({ key, label, icon, color, action }) => (
              <button
                key={key}
                onClick={() => {
                  void (async () => {
                    await action()
                    if (key !== 'copy') setOpen(false)
                  })()
                }}
                className={cn(
                  'flex items-center gap-3 rounded-xl border border-transparent px-3 py-2',
                  'font-body text-xs text-ivory/60 transition-all duration-200',
                  color
                )}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}

            {/* Instagram note */}
            <p className="px-3 pb-1 font-body text-[10px] leading-tight text-ivory/25">
              Instagram: link copied, opens app
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
