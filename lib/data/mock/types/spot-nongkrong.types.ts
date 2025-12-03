/**
 * Spot Nongkrong Type Definitions
 * Flat structure for Directus compatibility
 */

export interface SpotNongkrong {
  id: number;
  slug: string;

  // Localized fields - Flat structure
  name_id: string;
  name_en: string;
  category_id: string;
  category_en: string;
  location_id: string;
  location_en: string;
  budget_id: string;
  budget_en: string;
  hours_id: string;
  hours_en: string;
  description_id: string;
  description_en: string;

  // Non-localized fields
  image: string;
  rating: number;
  reviews: number;
  tags: string[]; // Array of tag IDs
  badges_id: string[]; // Indonesian badges
  badges_en: string[]; // English badges

  // Metadata
  latitude?: number;
  longitude?: number;
  status: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
}
