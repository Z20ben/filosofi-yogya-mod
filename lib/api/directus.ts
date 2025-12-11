/**
 * Directus API Client for Next.js with i18n support
 *
 * Maps next-intl locales ('id', 'en') to Directus language codes ('id-ID', 'en-US')
 */

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

// Map next-intl locale to Directus language code
const localeToCode: Record<string, string> = {
  'id': 'id-ID',
  'en': 'en-US'
};

// Generic types for Directus responses
interface DirectusResponse<T> {
  data: T[];
}

interface Translation {
  code: string;
  [key: string]: string | number | null | undefined;
}

interface DirectusItem {
  id: number;
  slug?: string;
  status?: string;
  translations?: Translation[];
  [key: string]: unknown;
}

// ============================================
// Map Locations
// ============================================
export interface MapLocation {
  id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  subcategory?: string;
  coordinates: { lat: number; lng: number };
  openingHours?: string;
  ticketPrice?: string;
  facilities?: string[];
  googleMapsUrl?: string;
  image?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

export async function getMapLocations(locale: string = 'id'): Promise<MapLocation[]> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/map_locations?fields=*,translations.*&filter[status][_eq]=published&deep[translations][_filter][code][_eq]=${code}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch map locations');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    return data.map(item => {
      const trans = item.translations?.[0] || {};
      return {
        id: item.slug || `id-${item.id}`,
        name: (trans.name as string) || '',
        description: (trans.description as string) || '',
        address: (trans.address as string) || '',
        category: (item.category as string) || '',
        subcategory: item.subcategory as string | undefined,
        coordinates: {
          lat: item.latitude as number || 0,
          lng: item.longitude as number || 0
        },
        openingHours: (trans.opening_hours as string) || undefined,
        ticketPrice: (trans.ticket_price as string) || undefined,
        facilities: (trans.facilities as string[]) || (item.facilities as string[]) || [],
        googleMapsUrl: item.google_maps_url as string | undefined,
        image: item.image as string | undefined,
        phone: item.phone as string | undefined,
        email: item.email as string | undefined,
        whatsapp: item.whatsapp as string | undefined,
        website: item.website as string | undefined,
        instagram: item.instagram as string | undefined,
        facebook: item.facebook as string | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching map locations:', error);
    return [];
  }
}

export async function getMapLocationBySlug(slug: string, locale: string = 'id'): Promise<MapLocation | null> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/map_locations?fields=*,translations.*&filter[slug][_eq]=${slug}&deep[translations][_filter][code][_eq]=${code}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch map location');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    if (data.length === 0) return null;

    const item = data[0];
    const trans = item.translations?.[0] || {};

    return {
      id: item.slug || `id-${item.id}`,
      name: (trans.name as string) || '',
      description: (trans.description as string) || '',
      address: (trans.address as string) || '',
      category: (item.category as string) || '',
      subcategory: item.subcategory as string | undefined,
      coordinates: {
        lat: item.latitude as number || 0,
        lng: item.longitude as number || 0
      },
      openingHours: (trans.opening_hours as string) || undefined,
      ticketPrice: (trans.ticket_price as string) || undefined,
      facilities: (trans.facilities as string[]) || (item.facilities as string[]) || [],
      googleMapsUrl: item.google_maps_url as string | undefined,
      image: item.image as string | undefined,
      phone: item.phone as string | undefined,
      email: item.email as string | undefined,
      whatsapp: item.whatsapp as string | undefined,
      website: item.website as string | undefined,
      instagram: item.instagram as string | undefined,
      facebook: item.facebook as string | undefined,
    };
  } catch (error) {
    console.error('Error fetching map location:', error);
    return null;
  }
}

// ============================================
// Agenda Events
// ============================================
export interface AgendaEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  organizer: string;
  ticketPrice?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  coordinates?: { lat: number; lng: number };
  image?: string;
  tags?: string[];
}

export async function getAgendaEvents(locale: string = 'id'): Promise<AgendaEvent[]> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/agenda_events?fields=*,translations.*&filter[status][_eq]=published&deep[translations][_filter][code][_eq]=${code}&sort=-event_date`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch agenda events');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    return data.map(item => {
      const trans = item.translations?.[0] || {};
      return {
        id: item.slug || `id-${item.id}`,
        title: (trans.title as string) || '',
        description: (trans.description as string) || '',
        location: (trans.location as string) || '',
        organizer: (trans.organizer as string) || '',
        ticketPrice: (trans.ticket_price as string) || undefined,
        eventDate: item.event_date as string | undefined,
        startTime: item.start_time as string | undefined,
        endTime: item.end_time as string | undefined,
        coordinates: item.latitude && item.longitude ? {
          lat: item.latitude as number,
          lng: item.longitude as number
        } : undefined,
        image: item.image as string | undefined,
        tags: item.tags as string[] | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching agenda events:', error);
    return [];
  }
}

// ============================================
// UMKM Lokal
// ============================================
export interface UMKMLokal {
  id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  openingHours?: string;
  priceRange?: string;
  coordinates?: { lat: number; lng: number };
  image?: string;
  tags?: string[];
  phone?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

export async function getUMKMLokal(locale: string = 'id'): Promise<UMKMLokal[]> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/umkm_lokal?fields=*,translations.*&filter[status][_eq]=published&deep[translations][_filter][code][_eq]=${code}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch UMKM');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    return data.map(item => {
      const trans = item.translations?.[0] || {};
      return {
        id: item.slug || `id-${item.id}`,
        name: (trans.name as string) || '',
        description: (trans.description as string) || '',
        address: (trans.address as string) || '',
        category: (trans.category as string) || '',
        openingHours: (trans.opening_hours as string) || undefined,
        priceRange: (trans.price_range as string) || undefined,
        coordinates: item.latitude && item.longitude ? {
          lat: item.latitude as number,
          lng: item.longitude as number
        } : undefined,
        image: item.image as string | undefined,
        tags: item.tags as string[] | undefined,
        phone: item.phone as string | undefined,
        whatsapp: item.whatsapp as string | undefined,
        website: item.website as string | undefined,
        instagram: item.instagram as string | undefined,
        facebook: item.facebook as string | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching UMKM:', error);
    return [];
  }
}

// ============================================
// Spot Nongkrong
// ============================================
export interface SpotNongkrong {
  id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  openingHours?: string;
  priceRange?: string;
  coordinates?: { lat: number; lng: number };
  image?: string;
  tags?: string[];
  badges?: string[];
  facilities?: string[];
  phone?: string;
  instagram?: string;
}

export async function getSpotNongkrong(locale: string = 'id'): Promise<SpotNongkrong[]> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/spot_nongkrong?fields=*,translations.*&filter[status][_eq]=published&deep[translations][_filter][code][_eq]=${code}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch spots');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    return data.map(item => {
      const trans = item.translations?.[0] || {};
      return {
        id: item.slug || `id-${item.id}`,
        name: (trans.name as string) || '',
        description: (trans.description as string) || '',
        address: (trans.address as string) || '',
        category: (trans.category as string) || '',
        openingHours: (trans.opening_hours as string) || undefined,
        priceRange: (trans.price_range as string) || undefined,
        coordinates: item.latitude && item.longitude ? {
          lat: item.latitude as number,
          lng: item.longitude as number
        } : undefined,
        image: item.image as string | undefined,
        tags: item.tags as string[] | undefined,
        badges: item.badges as string[] | undefined,
        facilities: item.facilities as string[] | undefined,
        phone: item.phone as string | undefined,
        instagram: item.instagram as string | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching spots:', error);
    return [];
  }
}

// ============================================
// Trending Articles
// ============================================
export interface TrendingArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  views: number;
  publishedDate?: string;
  image?: string;
  tags?: string[];
}

export async function getTrendingArticles(locale: string = 'id', limit: number = 10): Promise<TrendingArticle[]> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/trending_articles?fields=*,translations.*&filter[status][_eq]=published&deep[translations][_filter][code][_eq]=${code}&sort=-views&limit=${limit}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch articles');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    return data.map(item => {
      const trans = item.translations?.[0] || {};
      return {
        id: item.slug || `id-${item.id}`,
        title: (trans.title as string) || '',
        content: (trans.content as string) || '',
        excerpt: (trans.excerpt as string) || '',
        author: (trans.author as string) || '',
        category: (trans.category as string) || '',
        views: (item.views as number) || 0,
        publishedDate: item.published_date as string | undefined,
        image: item.image as string | undefined,
        tags: item.tags as string[] | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// ============================================
// Encyclopedia Entries
// ============================================
export interface EncyclopediaEntry {
  id: string;
  title: string;
  content: string;
  summary: string;
  image?: string;
  tags?: string[];
}

export async function getEncyclopediaEntries(locale: string = 'id'): Promise<EncyclopediaEntry[]> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/encyclopedia_entries?fields=*,translations.*&filter[status][_eq]=published&deep[translations][_filter][code][_eq]=${code}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch encyclopedia');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    return data.map(item => {
      const trans = item.translations?.[0] || {};
      return {
        id: item.slug || `id-${item.id}`,
        title: (trans.title as string) || '',
        content: (trans.content as string) || '',
        summary: (trans.summary as string) || '',
        image: item.image as string | undefined,
        tags: item.tags as string[] | undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching encyclopedia:', error);
    return [];
  }
}

export async function getEncyclopediaEntryBySlug(slug: string, locale: string = 'id'): Promise<EncyclopediaEntry | null> {
  const code = localeToCode[locale] || 'id-ID';

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/encyclopedia_entries?fields=*,translations.*&filter[slug][_eq]=${slug}&deep[translations][_filter][code][_eq]=${code}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to fetch encyclopedia entry');

    const { data }: DirectusResponse<DirectusItem> = await res.json();

    if (data.length === 0) return null;

    const item = data[0];
    const trans = item.translations?.[0] || {};

    return {
      id: item.slug || `id-${item.id}`,
      title: (trans.title as string) || '',
      content: (trans.content as string) || '',
      summary: (trans.summary as string) || '',
      image: item.image as string | undefined,
      tags: item.tags as string[] | undefined,
    };
  } catch (error) {
    console.error('Error fetching encyclopedia entry:', error);
    return null;
  }
}

// ============================================
// Utility: Get Directus Asset URL
// ============================================
export function getAssetUrl(assetId: string | null | undefined, transforms?: {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
  quality?: number;
}): string | null {
  if (!assetId) return null;

  let url = `${DIRECTUS_URL}/assets/${assetId}`;

  if (transforms) {
    const params = new URLSearchParams();
    if (transforms.width) params.set('width', transforms.width.toString());
    if (transforms.height) params.set('height', transforms.height.toString());
    if (transforms.fit) params.set('fit', transforms.fit);
    if (transforms.quality) params.set('quality', transforms.quality.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  }

  return url;
}
