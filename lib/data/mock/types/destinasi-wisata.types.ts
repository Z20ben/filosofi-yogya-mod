/**
 * Destinasi Wisata Type Definitions
 * Flat structure for Directus compatibility
 */

export interface DestinasiWisata {
  id: number;
  slug: string;

  // Localized fields - Flat structure
  name_id: string;
  name_en: string;
  location_id: string;
  location_en: string;
  description_id: string;
  description_en: string;
  hours_id: string;
  hours_en: string;

  // Non-localized fields
  image: string;
  latitude?: number;
  longitude?: number;

  // Metadata
  status: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
}
