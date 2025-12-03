/**
 * Trending Article Type Definitions
 * Flat structure for Directus compatibility
 */

export interface TrendingArticle {
  id: number;
  slug: string;

  // Localized fields - Flat structure
  title_id: string;
  title_en: string;
  excerpt_id: string;
  excerpt_en: string;
  author_id: string;
  author_en: string;
  date_id: string;
  date_en: string;

  // Non-localized fields
  image: string;
  category: 'trend' | 'food' | 'lifestyle' | 'event' | 'culture';
  readTime: number; // in minutes
  views: number;
  comments: number;
  tags: string[]; // Array of tag names or IDs

  // Metadata
  featured?: boolean;
  status: 'published' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}
