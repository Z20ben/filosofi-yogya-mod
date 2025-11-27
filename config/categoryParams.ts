// Category params mapping for URL translation between locales
// Format: { internalId: { id: 'indonesian-param', en: 'english-param' } }

export const categoryParams = {
  // UMKM Lokal
  umkmLokal: {
    culinary: { id: 'kuliner', en: 'culinary' },
    craft: { id: 'kerajinan', en: 'craft' },
    fashion: { id: 'fashion', en: 'fashion' },
    creative: { id: 'kreatif', en: 'creative' },
  },

  // Destinasi Wisata
  destinasiWisata: {
    kawasan: { id: 'kawasan', en: 'area' },
    'titik-sumbu': { id: 'titik-sumbu', en: 'axis-point' },
    'cagar-budaya': { id: 'cagar-budaya', en: 'cultural-heritage' },
    museum: { id: 'museum', en: 'museum' },
    landmark: { id: 'landmark', en: 'landmark' },
  },

  // Agenda Event
  agendaEvent: {
    all: { id: 'semua', en: 'all' },
    budaya: { id: 'budaya', en: 'culture' },
    festival: { id: 'festival', en: 'festival' },
    komunitas: { id: 'komunitas', en: 'community' },
    pameran: { id: 'pameran', en: 'exhibition' },
    umkm: { id: 'umkm', en: 'msme' },
  },

  // Encyclopedia
  encyclopedia: {
    'warisan-benda': { id: 'warisan-benda', en: 'tangible-heritage' },
    'warisan-takbenda': { id: 'warisan-takbenda', en: 'intangible-heritage' },
    tokoh: { id: 'tokoh', en: 'figures' },
    istilah: { id: 'istilah', en: 'terms' },
    'sedang-tren': { id: 'sedang-tren', en: 'trending' },
    'tips-wisata': { id: 'tips-wisata', en: 'travel-tips' },
  },
} as const;

// Helper to get category param for a specific locale
export function getCategoryParam(
  section: keyof typeof categoryParams,
  internalId: string,
  locale: 'id' | 'en'
): string {
  const sectionParams = categoryParams[section];
  const param = sectionParams[internalId as keyof typeof sectionParams];
  return param ? param[locale] : internalId;
}

// Helper to get internal ID from locale-specific param
export function getInternalCategoryId(
  section: keyof typeof categoryParams,
  param: string,
  locale: 'id' | 'en'
): string {
  const sectionParams = categoryParams[section];
  for (const [internalId, translations] of Object.entries(sectionParams)) {
    if (translations[locale] === param) {
      return internalId;
    }
  }
  return param; // fallback to param if not found
}

// Helper to translate category param between locales
export function translateCategoryParam(
  param: string,
  fromLocale: 'id' | 'en',
  toLocale: 'id' | 'en'
): string {
  // Search through all sections
  for (const sectionParams of Object.values(categoryParams)) {
    for (const translations of Object.values(sectionParams)) {
      if (translations[fromLocale] === param) {
        return translations[toLocale];
      }
    }
  }
  return param; // fallback to original param if not found
}
