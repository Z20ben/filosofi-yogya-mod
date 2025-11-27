export const pathnames = {
  // Home
  '/': '/',

  // Kawasan Sumbu Filosofi
  '/kawasan-sumbu-filosofi': {
    id: '/kawasan-sumbu-filosofi',
    en: '/philosophical-axis-area',
  },

  // Sejarah dan Riset
  '/sejarah-dan-riset': {
    id: '/sejarah-dan-riset',
    en: '/history-and-research',
  },

  // Potensi Wisata
  '/potensi-wisata': {
    id: '/potensi-wisata',
    en: '/tourism-potential',
  },

  // Potensi UMKM
  '/potensi-umkm': {
    id: '/potensi-umkm',
    en: '/msme-potential',
  },

  '/potensi-umkm/katalog': {
    id: '/potensi-umkm/katalog',
    en: '/msme-potential/catalog',
  },

  // Galeri Foto
  '/galeri-foto': {
    id: '/galeri-foto',
    en: '/photo-gallery',
  },

  // Agenda Seni & Budaya
  '/agenda-seni-budaya': {
    id: '/agenda-seni-budaya',
    en: '/arts-culture-agenda',
  },

  // Peta Interaktif
  '/peta-interaktif': {
    id: '/peta-interaktif',
    en: '/interactive-map',
  },

  // Map
  '/map': {
    id: '/map',
    en: '/map',
  },

  // Encyclopedia
  '/encyclopedia': {
    id: '/encyclopedia',
    en: '/encyclopedia',
  },

  '/encyclopedia/[slug]': {
    id: '/encyclopedia/[slug]',
    en: '/encyclopedia/[slug]',
  },

  // Destinasi Wisata
  '/destinasi-wisata': {
    id: '/destinasi-wisata',
    en: '/tourist-destinations',
  },

  '/destinasi-wisata/[slug]': {
    id: '/destinasi-wisata/[slug]',
    en: '/tourist-destinations/[slug]',
  },

  // Spot Nongkrong
  '/spot-nongkrong': {
    id: '/spot-nongkrong',
    en: '/hangout-spots',
  },

  '/spot-nongkrong/[slug]': {
    id: '/spot-nongkrong/[slug]',
    en: '/hangout-spots/[slug]',
  },

  // UMKM Lokal
  '/umkm-lokal': {
    id: '/umkm-lokal',
    en: '/local-msme',
  },

  '/umkm-lokal/[slug]': {
    id: '/umkm-lokal/[slug]',
    en: '/local-msme/[slug]',
  },

  // Agenda Event
  '/agenda-event': {
    id: '/agenda-event',
    en: '/events',
  },

  '/agenda-event/[slug]': {
    id: '/agenda-event/[slug]',
    en: '/events/[slug]',
  },

  // Tentang
  '/tentang': {
    id: '/tentang',
    en: '/about',
  },

  // Admin
  '/admin': '/admin', // No translation for admin
} as const;

export const locales = ['id', 'en'] as const;
export const defaultLocale = 'id' as const;

export type Locale = (typeof locales)[number];
export type AppPathnames = keyof typeof pathnames;
