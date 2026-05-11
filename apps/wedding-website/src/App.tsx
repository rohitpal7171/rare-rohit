import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'

import { cn } from '@shared/utils'

import { CursorEffect } from '@app/components/effects/CursorEffect'
import { router } from './router'

const toPrimaryLang = (lang: string): string => lang.split('-')[0] ?? lang

export default function App() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language.startsWith('hi')

  // Sync <html lang> with active language — accessibility + SEO
  useEffect(() => {
    document.documentElement.lang = toPrimaryLang(i18n.language)
  }, [i18n.language])

  return (
    <div className={cn('min-h-screen', isHindi ? 'font-hindi' : 'font-body')}>
      {/* Global cursor effect — canvas overlay, pointer-events: none */}
      <CursorEffect />
      <RouterProvider router={router} />
    </div>
  )
}
