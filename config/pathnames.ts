import { Pathnames } from 'next-intl/navigation';

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

  // Tentang
  '/tentang': {
    id: '/tentang',
    en: '/about',
  },

  // Admin
  '/admin': '/admin', // No translation for admin
} satisfies Pathnames<typeof locales>;

export const locales = ['id', 'en'] as const;
export const defaultLocale = 'id' as const;

export type Locale = (typeof locales)[number];
export type AppPathnames = keyof typeof pathnames;
