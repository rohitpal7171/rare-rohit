import type { WeddingConfig } from './types'

// ============================================================
// WEDDING CONFIG — Real Details
// ============================================================
// Groom  : Rohit Singh Pal  (रोहित सिंह पाल)
// Bride  : Priti Pal         (प्रीति पाल)
// Lagun  : 24 Nov 2026 — Gwalior
// Baraat : 25 Nov 2026 — Kokapur (near Udi Moad)
// ============================================================
// No reception | No RSVP | No Travel section | Veg food only
// ============================================================
// Still needed:
//   - Exact ceremony times
//   - Haldi / Mehendi / Sangeet dates (22nd or 23rd Nov?)
//   - Full addresses + Google Maps pins
//   - Groom's residence city
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
    // Pheras day — 25 Nov 2026, Kokapur (near Udi Moad)
    date: '2026-11-25T10:00:00+05:30',
    venue: {
      name: 'Kokapur, Near Udi Moad',
      nameHindi: 'कोकापुर, उड़ी मोड़ के पास',
      address: 'Kokapur, Near Udi Moad',         // TODO: full address
      addressHindi: 'कोकापुर, उड़ी मोड़ के पास', // TODO: full Hindi address
      city: 'Kokapur',
      cityHindi: 'कोकापुर',
      mapUrl: 'https://maps.google.com/?q=Kokapur+Madhya+Pradesh', // TODO: exact pin
    },
  },
  ceremonies: {
    haldi: {
      slug: 'haldi',
      date: '2026-11-23T10:00:00+05:30',         // TODO: confirm date & time
      time: '10:00 AM',                           // TODO: confirm
      timeHindi: 'प्रातः १० बजे',
      venue: {
        name: "Bride's Residence, Gwalior",
        nameHindi: 'वधू का निवास, ग्वालियर',
        address: 'Gwalior, Madhya Pradesh',        // TODO: full address
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
      date: '2026-11-23T18:00:00+05:30',         // TODO: confirm date & time
      time: '6:00 PM',                            // TODO: confirm
      timeHindi: 'सायं ६ बजे',
      venue: {
        name: "Bride's Residence, Gwalior",
        nameHindi: 'वधू का निवास, ग्वालियर',
        address: 'Gwalior, Madhya Pradesh',        // TODO: full address
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
      date: '2026-11-23T19:00:00+05:30',         // TODO: confirm date & time
      time: '7:00 PM',                            // TODO: confirm
      timeHindi: 'सायं ७ बजे',
      venue: {
        name: 'Venue, Gwalior',                   // TODO: venue name
        nameHindi: 'स्थान, ग्वालियर',
        address: 'Gwalior, Madhya Pradesh',        // TODO: full address
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
      date: '2026-11-25T08:00:00+05:30',         // TODO: confirm departure time
      time: '8:00 AM',                            // TODO: confirm
      timeHindi: 'प्रातः ८ बजे',
      venue: {
        name: "Groom's Residence → Kokapur, Near Udi Moad",
        nameHindi: 'वर के घर से → कोकापुर, उड़ी मोड़',
        address: 'Kokapur, Near Udi Moad',         // TODO: full address
        addressHindi: 'कोकापुर, उड़ी मोड़ के पास',
        city: 'Kokapur',
        cityHindi: 'कोकापुर',
        mapUrl: 'https://maps.google.com/?q=Kokapur+Madhya+Pradesh',
      },
      color: 'maroon',
      icon: '🐎',
    },
    pheras: {
      slug: 'pheras',
      date: '2026-11-25T11:00:00+05:30',         // TODO: confirm muhurat time
      time: '11:00 AM',                           // TODO: confirm
      timeHindi: 'प्रातः ११ बजे',
      venue: {
        name: 'Kokapur, Near Udi Moad',
        nameHindi: 'कोकापुर, उड़ी मोड़ के पास',
        address: 'Kokapur, Near Udi Moad',         // TODO: full address
        addressHindi: 'कोकापुर, उड़ी मोड़ के पास',
        city: 'Kokapur',
        cityHindi: 'कोकापुर',
        mapUrl: 'https://maps.google.com/?q=Kokapur+Madhya+Pradesh',
      },
      color: 'divine',
      icon: '🔥',
    },
    vidaai: {
      slug: 'vidaai',
      date: '2026-11-25T16:00:00+05:30',         // TODO: confirm time
      time: '4:00 PM',                            // TODO: confirm
      timeHindi: 'अपराह्न ४ बजे',
      venue: {
        name: 'Kokapur, Near Udi Moad',
        nameHindi: 'कोकापुर, उड़ी मोड़ के पास',
        address: 'Kokapur, Near Udi Moad',         // TODO: full address
        addressHindi: 'कोकापुर, उड़ी मोड़ के पास',
        city: 'Kokapur',
        cityHindi: 'कोकापुर',
        mapUrl: 'https://maps.google.com/?q=Kokapur+Madhya+Pradesh',
      },
      color: 'maroon',
      icon: '🌸',
    },
  },
  hashtag: '#RohitWedsPriti',
  socialLinks: {
    instagram: 'https://instagram.com', // TODO: real profile
    facebook: 'https://facebook.com',   // TODO: real profile
  },
}
