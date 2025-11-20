import { mockKawasanData } from './admin/mock-data/kawasan';
import { mockWisataData } from './admin/mock-data/wisata';
import { mockUMKMData } from './admin/mock-data/umkm';
import { mockSejarahData } from './admin/mock-data/sejarah';
import { mockAgendaData } from './admin/mock-data/agenda';
import { mockGaleriData } from './admin/mock-data/galeri';
import { mapLocations } from './data/mapLocations';

export type SearchResultType =
  | 'kawasan'
  | 'wisata'
  | 'umkm'
  | 'sejarah'
  | 'agenda'
  | 'galeri'
  | 'lokasi';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  thumbnail?: string;
  url: string;
}

export interface SearchOptions {
  locale: 'id' | 'en';
  limit?: number;
  types?: SearchResultType[];
}

/**
 * Search across all data sources with bilingual support
 */
export function searchAllData(
  query: string,
  options: SearchOptions
): SearchResult[] {
  const { locale, limit = 50, types } = options;
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  const results: SearchResult[] = [];

  // Search Kawasan
  if (!types || types.includes('kawasan')) {
    mockKawasanData
      .filter(item => item.status === 'published')
      .forEach((item) => {
        const searchFields = [
          locale === 'id' ? item.name_id : item.name_en,
          locale === 'id' ? item.description_id : item.description_en,
          locale === 'id' ? item.history_id : item.history_en,
          item.category,
          item.district,
          item.address,
        ].filter(Boolean);

        if (matchesQuery(searchFields, normalizedQuery)) {
          results.push({
            id: item.id,
            type: 'kawasan',
            slug: item.slug,
            title: locale === 'id' ? item.name_id : item.name_en,
            excerpt: truncateText(
              locale === 'id' ? item.description_id : item.description_en,
              150
            ),
            category: item.category,
            thumbnail: item.featured_image,
            url: `/${locale}/kawasan-sumbu-filosofi/${item.slug}`,
          });
        }
      });
  }

  // Search Wisata
  if (!types || types.includes('wisata')) {
    mockWisataData
      .filter(item => item.status === 'published')
      .forEach((item) => {
        const searchFields = [
          locale === 'id' ? item.name_id : item.name_en,
          locale === 'id' ? item.description_id : item.description_en,
          item.category,
          item.district,
          item.address,
          ...(item.activities || []),
          ...(locale === 'id' ? item.facilities_id || [] : item.facilities_en || []),
        ].filter(Boolean);

        if (matchesQuery(searchFields, normalizedQuery)) {
          results.push({
            id: item.id,
            type: 'wisata',
            slug: item.slug,
            title: locale === 'id' ? item.name_id : item.name_en,
            excerpt: truncateText(
              locale === 'id' ? item.description_id : item.description_en,
              150
            ),
            category: item.category,
            thumbnail: item.featured_image,
            url: `/${locale}/potensi-wisata/${item.slug}`,
          });
        }
      });
  }

  // Search UMKM
  if (!types || types.includes('umkm')) {
    mockUMKMData
      .filter(item => item.status === 'published')
      .forEach((item) => {
        const productNames = item.products?.map((p) =>
          locale === 'id' ? p.name_id : p.name_en
        ) || [];

        const searchFields = [
          item.business_name,
          locale === 'id' ? item.description_id : item.description_en,
          item.category,
          item.owner_name,
          ...(locale === 'id' ? item.products_id || [] : item.products_en || []),
          ...productNames,
        ].filter(Boolean);

        if (matchesQuery(searchFields, normalizedQuery)) {
          results.push({
            id: item.id,
            type: 'umkm',
            slug: item.slug,
            title: item.business_name,
            excerpt: truncateText(
              locale === 'id' ? item.description_id : item.description_en,
              150
            ),
            category: item.category,
            thumbnail: item.featured_image,
            url: `/${locale}/potensi-umkm/${item.slug}`,
          });
        }
      });
  }

  // Search Sejarah
  if (!types || types.includes('sejarah')) {
    mockSejarahData
      .filter(item => item.status === 'published')
      .forEach((item) => {
        const keywords = locale === 'id' ? item.keywords_id : item.keywords_en;

        const searchFields = [
          locale === 'id' ? item.title_id : item.title_en,
          locale === 'id' ? item.abstract_id : item.abstract_en,
          locale === 'id' ? item.content_id : item.content_en,
          item.category,
          item.author,
          ...(keywords || []),
        ].filter(Boolean);

        if (matchesQuery(searchFields, normalizedQuery)) {
          results.push({
            id: item.id,
            type: 'sejarah',
            slug: item.slug,
            title: locale === 'id' ? item.title_id : item.title_en,
            excerpt: truncateText(
              locale === 'id' ? item.abstract_id : item.abstract_en,
              150
            ),
            category: item.category,
            thumbnail: item.featured_image,
            url: `/${locale}/sejarah-dan-riset/${item.slug}`,
          });
        }
      });
  }

  // Search Agenda
  if (!types || types.includes('agenda')) {
    mockAgendaData
      .filter(item => item.status === 'published')
      .forEach((item) => {
        const searchFields = [
          locale === 'id' ? item.event_name_id : item.event_name_en,
          locale === 'id' ? item.description_id : item.description_en,
          item.category,
          locale === 'id' ? item.category_id : item.category_en,
          item.location,
          item.venue_name,
          item.organizer,
        ].filter(Boolean);

        if (matchesQuery(searchFields, normalizedQuery)) {
          results.push({
            id: item.id,
            type: 'agenda',
            slug: item.slug,
            title: locale === 'id' ? item.event_name_id : item.event_name_en,
            excerpt: truncateText(
              locale === 'id' ? item.description_id : item.description_en,
              150
            ),
            category: locale === 'id' ? (item.category_id || item.category) : (item.category_en || item.category),
            thumbnail: item.featured_image,
            url: `/${locale}/agenda-seni-budaya/${item.slug}`,
          });
        }
      });
  }

  // Search Galeri
  if (!types || types.includes('galeri')) {
    mockGaleriData
      .filter(item => item.status === 'published')
      .forEach((item) => {
        const searchFields = [
          locale === 'id' ? item.title_id : item.title_en,
          locale === 'id' ? item.description_id : item.description_en,
          item.category,
          item.photographer,
          ...(item.tags || []),
        ].filter(Boolean);

        if (matchesQuery(searchFields, normalizedQuery)) {
          results.push({
            id: item.id,
            type: 'galeri',
            slug: item.slug,
            title: locale === 'id' ? item.title_id : item.title_en,
            excerpt: truncateText(
              (locale === 'id' ? item.description_id : item.description_en) || '',
              150
            ),
            category: item.category,
            thumbnail: item.image_url,
            url: `/${locale}/galeri-foto?id=${item.id}`,
          });
        }
      });
  }

  // Search Map Locations
  if (!types || types.includes('lokasi')) {
    mapLocations.forEach((item) => {
      const searchFields = [
        locale === 'id' ? item.name_id : item.name_en,
        locale === 'id' ? item.description_id : item.description_en,
        item.category,
        item.subcategory,
        locale === 'id' ? item.address_id : item.address_en,
        ...(item.products || []),
        ...(item.facilities || []),
      ].filter(Boolean);

      if (matchesQuery(searchFields, normalizedQuery)) {
        results.push({
          id: item.id,
          type: 'lokasi',
          slug: item.id,
          title: locale === 'id' ? item.name_id : item.name_en,
          excerpt: truncateText(
            locale === 'id' ? item.description_id : item.description_en,
            150
          ),
          category: item.category,
          thumbnail: item.images?.[0],
          url: `/${locale}/peta-interaktif?location=${item.id}`,
        });
      }
    });
  }

  return results.slice(0, limit);
}

/**
 * Get search suggestions based on query
 */
export function getSearchSuggestions(
  query: string,
  locale: 'id' | 'en',
  limit: number = 5
): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 2) return [];

  const suggestions = new Set<string>();

  // Collect titles from all sources
  mockKawasanData
    .filter(item => item.status === 'published')
    .forEach((item) => {
      const name = locale === 'id' ? item.name_id : item.name_en;
      if (name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(name);
      }
    });

  mockWisataData
    .filter(item => item.status === 'published')
    .forEach((item) => {
      const name = locale === 'id' ? item.name_id : item.name_en;
      if (name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(name);
      }
    });

  mockUMKMData
    .filter(item => item.status === 'published')
    .forEach((item) => {
      if (item.business_name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(item.business_name);
      }
    });

  mockSejarahData
    .filter(item => item.status === 'published')
    .forEach((item) => {
      const title = locale === 'id' ? item.title_id : item.title_en;
      if (title.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(title);
      }
    });

  mockAgendaData
    .filter(item => item.status === 'published')
    .forEach((item) => {
      const name = locale === 'id' ? item.event_name_id : item.event_name_en;
      if (name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(name);
      }
    });

  mapLocations.forEach((item) => {
    const name = locale === 'id' ? item.name_id : item.name_en;
    if (name.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(name);
    }
  });

  return Array.from(suggestions).slice(0, limit);
}

/**
 * Get category labels for filter
 */
export function getSearchCategoryLabel(
  type: SearchResultType,
  locale: 'id' | 'en'
): string {
  const labels: Record<SearchResultType, { id: string; en: string }> = {
    kawasan: { id: 'Kawasan', en: 'Region' },
    wisata: { id: 'Wisata', en: 'Tourism' },
    umkm: { id: 'UMKM', en: 'SME' },
    sejarah: { id: 'Sejarah', en: 'History' },
    agenda: { id: 'Agenda', en: 'Events' },
    galeri: { id: 'Galeri', en: 'Gallery' },
    lokasi: { id: 'Lokasi', en: 'Location' },
  };

  return labels[type][locale];
}

/**
 * Get all available types
 */
export function getAllSearchTypes(): SearchResultType[] {
  return ['kawasan', 'wisata', 'umkm', 'sejarah', 'agenda', 'galeri', 'lokasi'];
}

/**
 * Helper function to check if any field matches the query
 */
function matchesQuery(fields: (string | undefined)[], query: string): boolean {
  return fields.some((field) =>
    field?.toLowerCase().includes(query)
  );
}

/**
 * Helper function to truncate text
 */
function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
