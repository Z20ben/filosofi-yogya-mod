/**
 * Encyclopedia Entry Type Definitions
 * Flat structure for Directus compatibility
 */

export interface EncyclopediaEntry {
  id: number;
  slug: string;

  // Localized fields - Flat structure
  title_id: string;
  title_en: string;
  snippet_id: string;
  snippet_en: string;
  fullContent_id: string;
  fullContent_en: string;
  editor_id: string;
  editor_en: string;

  // Non-localized fields
  category: 'warisan-benda' | 'warisan-takbenda' | 'tokoh' | 'istilah' | 'sedang-tren' | 'tips-wisata';
  icon: string; // Icon name or component reference
  tags: string[]; // Array of tag names

  // Metadata
  views?: number;
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface EncyclopediaCategory {
  id: string;
  label_id: string;
  label_en: string;
  description_id: string;
  description_en: string;
  icon: string;
  count: number;
}
