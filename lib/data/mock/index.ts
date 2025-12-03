/**
 * Central export for all mock data
 * Single source of truth for mock data across the application
 */

// Export types
export * from './types';

// Export helpers
export * from './helpers';

// Export data
export { agendaEvents } from './agenda-event.data';
export { destinasiWisata } from './destinasi-wisata.data';
export { spotNongkrong } from './spot-nongkrong.data';
export { trendingArticles } from './trending.data';
export { encyclopediaEntries, encyclopediaCategories } from './encyclopedia.data';
export { umkmLokal } from './umkm-lokal.data';

// Map locations are already available at lib/data/mapLocations.ts
// Re-export for convenience
export { mapLocations, categoryMetadata, type SiteLocation, type SiteCategory } from '../mapLocations';
