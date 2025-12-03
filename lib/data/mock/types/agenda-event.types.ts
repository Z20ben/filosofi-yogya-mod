/**
 * Agenda Event Type Definitions
 * Flat structure for Directus compatibility
 */

export interface AgendaEvent {
  id: number;
  slug: string;

  // Localized fields - Flat structure
  title_id: string;
  title_en: string;
  category_id: string;
  category_en: string;
  date_id: string;
  date_en: string;
  time_id: string;
  time_en: string;
  location_id: string;
  location_en: string;
  price_id: string;
  price_en: string;
  age_id: string;
  age_en: string;

  // Non-localized fields
  image: string;
  gradient: string;
  bgColor: string;

  // Metadata
  status: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
}
