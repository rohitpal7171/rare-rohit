import type { WeddingConfig } from './types'

// ============================================================
// WEDDING CONFIG — Confirmed Details
// ============================================================
// Groom  : Rohit Singh Pal  (रोहित सिंह पाल)
// Bride  : Priti Pal         (प्रीति पाल)
// Lagun  : 24 Nov 2026 — Gwalior
// Baraat : 25 Nov 2026, 4:00 PM — Kokapur, Udi Modh, Uttar Pradesh
// Pheras : 26 Nov 2026, 9:00 AM — Kokapur, Udi Modh, Uttar Pradesh
// Vidaai : 26 Nov 2026 — Kokapur
// ============================================================
// No reception | No RSVP | No Travel section | Veg food only
// ============================================================

export const weddingConfig: WeddingConfig = {
  bride: {
    name: 'Priti Pal',
    nameHindi: 'प्रीति पाल',
    family: 'Pal Family',
    familyHindi: 'पाल परिवार',
    bio: 'She lights up every room she enters.',
    bioHindi: 'वह जहाँ भी जाती है, रोशनी फैला देती है।',
  },
  groom: {
    name: 'Rohit Singh Pal',
    nameHindi: 'रोहित सिंह पाल',
    family: 'Pal Family',
    familyHindi: 'पाल परिवार',
    bio: 'He found his forever in her smile.',
    bioHindi: 'उसने उसकी मुस्कान में अपनी दुनिया पाई।',
  },
  wedding: {
    // Main wedding — countdown targets Pheras day (26 Nov 2026)
    date: '2026-11-26T09:00:00+05:30',
    venue: {
      name: 'Kokapur, Udi Modh, Uttar Pradesh',
      nameHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
      address: 'Kokapur, Udi Modh, Uttar Pradesh',
      addressHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
      city: 'Kokapur',
      cityHindi: 'कोकापुर',
      mapUrl: 'https://maps.google.com/?q=Kokapur+Udi+Modh+Uttar+Pradesh',
    },
  },
  ceremonies: {
    haldi: {
      slug: 'haldi',
      date: '2026-11-23T10:00:00+05:30', // TODO: confirm date & time
      time: '10:00 AM',
      timeHindi: 'प्रातः १० बजे',
      venue: {
        name: "Bride's Residence, Gwalior",
        nameHindi: 'वधू का निवास, ग्वालियर',
        address: 'Gwalior, Madhya Pradesh', // TODO: full address
        addressHindi: 'ग्वालियर, मध्य प्रदेश',
        city: 'Gwalior',
        cityHindi: 'ग्वालियर',
        mapUrl: 'https://maps.google.com/?q=Gwalior+Madhya+Pradesh',
      },
      color: 'marigold',
      icon: '🌼',
    },
    mehendi: {
      slug: 'mehendi',
      date: '2026-11-23T18:00:00+05:30', // TODO: confirm date & time
      time: '6:00 PM',
      timeHindi: 'सायं ६ बजे',
      venue: {
        name: "Bride's Residence, Gwalior",
        nameHindi: 'वधू का निवास, ग्वालियर',
        address: 'Gwalior, Madhya Pradesh', // TODO: full address
        addressHindi: 'ग्वालियर, मध्य प्रदेश',
        city: 'Gwalior',
        cityHindi: 'ग्वालियर',
        mapUrl: 'https://maps.google.com/?q=Gwalior+Madhya+Pradesh',
      },
      color: 'gold',
      icon: '🌿',
    },
    sangeet: {
      slug: 'sangeet',
      date: '2026-11-23T19:00:00+05:30', // TODO: confirm date & time
      time: '7:00 PM',
      timeHindi: 'सायं ७ बजे',
      venue: {
        name: 'Venue, Gwalior', // TODO: venue name
        nameHindi: 'स्थान, ग्वालियर',
        address: 'Gwalior, Madhya Pradesh', // TODO: full address
        addressHindi: 'ग्वालियर, मध्य प्रदेश',
        city: 'Gwalior',
        cityHindi: 'ग्वालियर',
        mapUrl: 'https://maps.google.com/?q=Gwalior+Madhya+Pradesh',
      },
      color: 'saffron',
      icon: '🎶',
    },
    baraat: {
      slug: 'baraat',
      date: '2026-11-25T16:00:00+05:30', // ✅ Confirmed: 25 Nov, 4:00 PM
      time: '4:00 PM',
      timeHindi: 'सायं ४ बजे',
      venue: {
        name: 'Kokapur, Udi Modh, Uttar Pradesh',
        nameHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
        address: 'Kokapur, Udi Modh, Uttar Pradesh',
        addressHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
        city: 'Kokapur',
        cityHindi: 'कोकापुर',
        mapUrl: 'https://maps.google.com/?q=Kokapur+Udi+Modh+Uttar+Pradesh',
      },
      color: 'maroon',
      icon: '🐎',
    },
    pheras: {
      slug: 'pheras',
      date: '2026-11-26T09:00:00+05:30', // ✅ Confirmed: 26 Nov, 9:00 AM
      time: '9:00 AM',
      timeHindi: 'प्रातः ९ बजे',
      venue: {
        name: 'Kokapur, Udi Modh, Uttar Pradesh',
        nameHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
        address: 'Kokapur, Udi Modh, Uttar Pradesh',
        addressHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
        city: 'Kokapur',
        cityHindi: 'कोकापुर',
        mapUrl: 'https://maps.google.com/?q=Kokapur+Udi+Modh+Uttar+Pradesh',
      },
      color: 'divine',
      icon: '🔥',
    },
    vidaai: {
      slug: 'vidaai',
      date: '2026-11-26T14:00:00+05:30', // ✅ Confirmed: 26 Nov (time TODO)
      time: '2:00 PM', // TODO: confirm exact time
      timeHindi: 'अपराह्न २ बजे',
      venue: {
        name: 'Kokapur, Udi Modh, Uttar Pradesh',
        nameHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
        address: 'Kokapur, Udi Modh, Uttar Pradesh',
        addressHindi: 'कोकापुर, उड़ी मोड़, उत्तर प्रदेश',
        city: 'Kokapur',
        cityHindi: 'कोकापुर',
        mapUrl: 'https://maps.google.com/?q=Kokapur+Udi+Modh+Uttar+Pradesh',
      },
      color: 'maroon',
      icon: '🌸',
    },
  },
  hashtag: '#RohitWedsPriti',
  socialLinks: {
    instagram: 'https://instagram.com', // TODO: real profile
    facebook: 'https://facebook.com', // TODO: real profile
  },
}
