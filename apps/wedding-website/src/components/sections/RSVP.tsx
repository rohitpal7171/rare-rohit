import { useState } from 'react'

import { motion } from 'framer-motion'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { AnimatedSection, Button } from '@shared/ui'
import { CEREMONY_SLUGS, cn, fadeInUp } from '@shared/utils'

const rsvpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  attendance: z.enum(['attending', 'notAttending']),
  guestCount: z.number().min(1).max(10),
  ceremonies: z.array(z.string()).optional(),
  meal: z.enum(['veg', 'nonVeg', 'jain']).optional(),
  message: z.string().optional(),
})

type RsvpFormValues = z.infer<typeof rsvpSchema>

const MEAL_KEY_MAP = {
  veg: 'form.mealVeg',
  nonVeg: 'form.mealNonVeg',
  jain: 'form.mealJain',
} as const satisfies Record<string, `form.${string}`>

export const RSVP = () => {
  const { t } = useTranslation('rsvp')
  const { t: tCeremonies } = useTranslation('ceremonies')
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestCount: 1, attendance: 'attending' },
  })

  const onSubmit = (_data: RsvpFormValues) => {
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="section-padding bg-ivory">
      <div className="section-container max-w-2xl">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.h2 variants={fadeInUp} className="section-title text-maroon">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-maroon/60">
            {t('subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" />
        </AnimatedSection>

        {submitted ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="card-divine space-y-4 text-center"
          >
            <div className="text-5xl">💌</div>
            <h3 className="font-display text-2xl text-gold">{t('success.title')}</h3>
            <p className="font-body text-maroon/60">{t('success.message')}</p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={(e) => {
              void handleSubmit(onSubmit)(e)
            }}
            className="space-y-6"
          >
            <div>
              <label className="font-body text-sm font-medium text-maroon">
                {t('form.fullName')}
              </label>
              <input
                {...register('fullName')}
                placeholder={t('form.fullNamePlaceholder')}
                className={cn(
                  'mt-1 w-full rounded-xl border bg-ivory px-4 py-3 font-body text-sm text-maroon',
                  'focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold',
                  errors.fullName !== undefined ? 'border-red-400' : 'border-maroon/20'
                )}
              />
              {errors.fullName !== undefined && (
                <p className="mt-1 text-xs text-red-400">{t('validation.nameRequired')}</p>
              )}
            </div>

            <div>
              <label className="font-body text-sm font-medium text-maroon">{t('form.email')}</label>
              <input
                {...register('email')}
                type="email"
                placeholder={t('form.emailPlaceholder')}
                className={cn(
                  'mt-1 w-full rounded-xl border bg-ivory px-4 py-3 font-body text-sm text-maroon',
                  'focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold',
                  errors.email !== undefined ? 'border-red-400' : 'border-maroon/20'
                )}
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-maroon">
                {t('form.attendance')}
              </label>
              <div className="mt-2 flex gap-4">
                {(['attending', 'notAttending'] as const).map((val) => (
                  <label key={val} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      value={val}
                      {...register('attendance')}
                      className="accent-gold"
                    />
                    <span className="font-body text-sm text-maroon">{t(`form.${val}`)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-maroon">
                {t('form.ceremonies')}
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CEREMONY_SLUGS.map((slug) => (
                  <label key={slug} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      value={slug}
                      {...register('ceremonies')}
                      className="accent-gold"
                    />
                    <span className="font-body text-sm capitalize text-maroon">
                      {tCeremonies(`${slug}.name`)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-maroon">{t('form.meal')}</label>
              <div className="mt-2 flex gap-4">
                {(['veg', 'nonVeg', 'jain'] as const).map((val) => (
                  <label key={val} className="flex cursor-pointer items-center gap-2">
                    <input type="radio" value={val} {...register('meal')} className="accent-gold" />
                    <span className="font-body text-sm text-maroon">{t(MEAL_KEY_MAP[val])}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-maroon">
                {t('form.message')}
              </label>
              <textarea
                {...register('message')}
                rows={3}
                placeholder={t('form.messagePlaceholder')}
                className="mt-1 w-full resize-none rounded-xl border border-maroon/20 bg-ivory px-4 py-3 font-body text-sm text-maroon focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              {isSubmitting ? t('form.submitting') : t('form.submit')}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
