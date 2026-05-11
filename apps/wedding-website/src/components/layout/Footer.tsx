import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { weddingConfig } from '@app/config/wedding.config'

export const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <footer className="mandala-bg border-t border-gold/10 px-4 py-12 text-center">
      <div className="mx-auto max-w-2xl space-y-4">
        <p className="font-script text-3xl text-gold">{weddingConfig.hashtag}</p>
        <p className="font-body text-sm text-ivory/50">{t('footer.hashtag')}</p>
        <div className="gold-divider" />
        <p className="font-hindi text-sm text-ivory/60">{t('footer.blessings')}</p>
        <div className="flex items-center justify-center gap-1 font-body text-xs text-ivory/30">
          <span>{t('footer.madeWith')}</span>
          <Heart size={12} className="fill-saffron text-saffron" />
          <span>{t('footer.and')}</span>
          <span>{t('footer.love')}</span>
        </div>
      </div>
    </footer>
  )
}
