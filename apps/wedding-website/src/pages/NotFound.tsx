import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@shared/ui'
import { fadeInUp } from '@shared/utils'

export const NotFound = () => {
  const { t } = useTranslation('common')

  return (
    <div className="mandala-bg flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="font-script text-9xl text-gold/30">404</div>
        <h1 className="font-display text-3xl font-bold text-ivory">{t('errors.notFound')}</h1>
        <p className="font-body text-ivory/60">{t('errors.notFoundDesc')}</p>
        <Link to="/">
          <Button variant="gold" size="lg">{t('buttons.backHome')}</Button>
        </Link>
      </motion.div>
    </div>
  )
}
