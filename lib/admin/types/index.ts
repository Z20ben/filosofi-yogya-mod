// Common types
export type Status = 'draft' | 'published' | 'archived';

export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

// UMKM Types
export interface Product {
  name_id: string;
  name_en: string;
  description_id?: string;
  description_en?: string;
  price_range?: string;
  image?: string;
}

export interface Contact {
  phone: string;
  whatsapp?: string;
  email?: string;
}

export interface Location {
  address: string;
  kawasan_id?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
}

export interface OperatingHours {
  open_time: string;
  close_time: string;
  days: string[];
}

export interface UMKM extends BaseEntity {
  slug: string;
  business_name: string;
  owner_name: string;
  category: 'Kerajinan' | 'Kuliner' | 'Fashion' | 'Jasa' | 'Lainnya';
  description_id: string;
  description_en: string;
  products: Product[];
  images: string[];
  featured_image: string;
  contact: Contact;
  location: Location;
  social_media: SocialMedia;
  operating_hours?: OperatingHours;
  status: Status;
  featured: boolean;
  verified: boolean;
  published_at?: Date;
}

// Galeri Types
export interface Galeri extends BaseEntity {
  slug: string;
  title_id: string;
  title_en: string;
  description_id?: string;
  description_en?: string;
  image_url: string;
  category: 'Kawasan' | 'Wisata' | 'UMKM' | 'Agenda' | 'Budaya' | 'Lainnya';
  tags: string[];
  alt_text_id?: string;
  alt_text_en?: string;
  photographer?: string;
  status: Status;
  published_at?: Date;
}

// Agenda Types
export interface Agenda extends BaseEntity {
  slug: string;
  event_name_id: string;
  event_name_en: string;
  description_id: string;
  description_en: string;
  date_start: Date;
  date_end: Date;
  time_start?: string;
  time_end?: string;
  location: string;
  venue_name?: string;
  images: string[];
  featured_image: string;
  organizer: string;
  contact: Contact;
  price_type: 'free' | 'paid';
  price_amount?: number;
  registration_link?: string;
  category: 'Seni' | 'Budaya' | 'Festival' | 'Pameran' | 'Pertunjukan' | 'Workshop' | 'Lainnya';
  status: Status;
  published_at?: Date;
}

// Kawasan Types
export interface Kawasan extends BaseEntity {
  slug: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  history_id?: string;
  history_en?: string;
  category: 'Keraton' | 'Candi' | 'Alun-alun' | 'Kampung' | 'Museum' | 'Tugu' | 'Lainnya';
  address: string;
  district: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: string[];
  featured_image: string;
  operating_hours?: OperatingHours;
  entry_fee_type: 'free' | 'paid';
  entry_fee_amount?: number;
  contact?: Contact;
  facilities?: string[];
  accessibility?: string[];
  best_visit_time?: string;
  featured: boolean;
  status: Status;
  published_at?: Date;
}

// Wisata Types
export interface Wisata extends BaseEntity {
  slug: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  category: 'Alam' | 'Budaya' | 'Kuliner' | 'Petualangan' | 'Religi' | 'Belanja' | 'Lainnya';
  address: string;
  district: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: string[];
  featured_image: string;
  operating_hours?: OperatingHours;
  entry_fee_type: 'free' | 'paid';
  entry_fee_amount?: number;
  contact?: Contact;
  facilities?: string[];
  activities?: string[];
  difficulty_level?: 'Easy' | 'Moderate' | 'Hard';
  duration?: string;
  best_visit_time?: string;
  tips_id?: string;
  tips_en?: string;
  featured: boolean;
  status: Status;
  published_at?: Date;
}

// Sejarah & Riset Types
export interface Sejarah extends BaseEntity {
  slug: string;
  title_id: string;
  title_en: string;
  abstract_id: string;
  abstract_en: string;
  content_id: string;
  content_en: string;
  category: 'Sejarah' | 'Arkeologi' | 'Antropologi' | 'Filsafat' | 'Seni' | 'Arsitektur' | 'Lainnya';
  author: string;
  author_affiliation?: string;
  author_email?: string;
  keywords_id: string[];
  keywords_en: string[];
  images: string[];
  featured_image?: string;
  references?: string[];
  period?: string;
  related_locations?: string[];
  featured: boolean;
  status: Status;
  published_at?: Date;
  doi?: string;
  citation_count?: number;
}
