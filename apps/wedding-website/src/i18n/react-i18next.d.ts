import 'react-i18next'

import type en_ceremonies from './locales/en/ceremonies.json'
import type en_common from './locales/en/common.json'
import type en_faq from './locales/en/faq.json'
import type en_gallery from './locales/en/gallery.json'
import type en_home from './locales/en/home.json'
import type en_party from './locales/en/party.json'
import type en_rsvp from './locales/en/rsvp.json'
import type en_schedule from './locales/en/schedule.json'
import type en_story from './locales/en/story.json'
import type en_travel from './locales/en/travel.json'
import type en_wishes from './locales/en/wishes.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common:     typeof en_common
      home:       typeof en_home
      story:      typeof en_story
      ceremonies: typeof en_ceremonies
      schedule:   typeof en_schedule
      gallery:    typeof en_gallery
      party:      typeof en_party
      travel:     typeof en_travel
      rsvp:       typeof en_rsvp
      faq:        typeof en_faq
      wishes:     typeof en_wishes
    }
  }
}
