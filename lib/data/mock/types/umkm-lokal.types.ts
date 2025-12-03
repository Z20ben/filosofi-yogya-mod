/**
 * UMKM Lokal Type Definitions
 * Flat structure for Directus compatibility
 */

export interface UMKMLokal {
  id: number;
  slug: string;

  // Localized fields - Flat structure
  name_id: string;
  name_en: string;
  type_id: string;
  type_en: string;
  location_id: string;
  location_en: string;
  price_id: string;
  price_en: string;
  description_id: string;
  description_en: string;
  highlight_id: string;
  highlight_en: string;

  // Non-localized fields
  category: 'culinary' | 'craft' | 'fashion' | 'creative';
  image: string;
  tags: string[]; // Array of tag names

  // Metadata
  latitude?: number;
  longitude?: number;
  rating?: number;
  reviews?: number;
  status: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
}
