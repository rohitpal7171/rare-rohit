import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en_ceremonies from './locales/en/ceremonies.json'
import en_common from './locales/en/common.json'
import en_faq from './locales/en/faq.json'
import en_gallery from './locales/en/gallery.json'
import en_home from './locales/en/home.json'
import en_party from './locales/en/party.json'
import en_rsvp from './locales/en/rsvp.json'
import en_schedule from './locales/en/schedule.json'
import en_story from './locales/en/story.json'
import en_travel from './locales/en/travel.json'
import en_wishes from './locales/en/wishes.json'

import hi_ceremonies from './locales/hi/ceremonies.json'
import hi_common from './locales/hi/common.json'
import hi_faq from './locales/hi/faq.json'
import hi_gallery from './locales/hi/gallery.json'
import hi_home from './locales/hi/home.json'
import hi_party from './locales/hi/party.json'
import hi_rsvp from './locales/hi/rsvp.json'
import hi_schedule from './locales/hi/schedule.json'
import hi_story from './locales/hi/story.json'
import hi_travel from './locales/hi/travel.json'
import hi_wishes from './locales/hi/wishes.json'

const resources = {
  en: {
    common: en_common, home: en_home, story: en_story, ceremonies: en_ceremonies,
    schedule: en_schedule, gallery: en_gallery, party: en_party, travel: en_travel,
    rsvp: en_rsvp, faq: en_faq, wishes: en_wishes,
  },
  hi: {
    common: hi_common, home: hi_home, story: hi_story, ceremonies: hi_ceremonies,
    schedule: hi_schedule, gallery: hi_gallery, party: hi_party, travel: hi_travel,
    rsvp: hi_rsvp, faq: hi_faq, wishes: hi_wishes,
  },
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // DEV default: 'en' | PROD: change to 'hi'
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: { escapeValue: false },
  })

export default i18n
