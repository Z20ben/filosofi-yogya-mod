// Search module with bilingual support and consistent results

export type SearchResultType =
  | 'kawasan'
  | 'wisata'
  | 'umkm'
  | 'sejarah'
  | 'agenda'
  | 'galeri'
  | 'lokasi'
  | 'nongkrong';

// Extended data for specific types
export interface WisataExtendedData {
  facilities_id?: string[];
  facilities_en?: string[];
  coordinates?: { lat: number; lng: number };
}

export interface UMKMExtendedData {
  products_id?: string[];
  products_en?: string[];
  price_range_id?: string;
  price_range_en?: string;
  location_id?: string;
  location_en?: string;
  contact?: { phone: string; email?: string };
  social_media?: { instagram?: string; facebook?: string };
  gallery_images?: string[];
}

export interface AgendaExtendedData {
  date_start?: Date;
  date_end?: Date;
  time_start?: string;
  time_end?: string;
  location?: string;
  venue_name?: string;
}

export interface GaleriExtendedData {
  photographer?: string;
  tags?: string[];
}

export interface SearchResult {
  id: string;
  type: SearchResultType;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  thumbnail?: string;
  url: string;
  // Extended data based on type
  wisataData?: WisataExtendedData;
  umkmData?: UMKMExtendedData;
  agendaData?: AgendaExtendedData;
  galeriData?: GaleriExtendedData;
}

export interface SearchOptions {
  locale: 'id' | 'en';
  limit?: number;
  types?: SearchResultType[];
}

// Bilingual item structure for consistent search
interface BilingualItem {
  id: string;
  slug: string;
  title_id: string;
  title_en: string;
  excerpt_id: string;
  excerpt_en: string;
  category_id: string;
  category_en: string;
  thumbnail?: string;
  tags_id: string[];
  tags_en: string[];
  type: SearchResultType;
  urlPath: string; // e.g., 'encyclopedia', 'destinasi-wisata'
  // Extended data
  extendedData?: {
    location_id?: string;
    location_en?: string;
    facilities_id?: string[];
    facilities_en?: string[];
    products_id?: string[];
    products_en?: string[];
    time?: string;
    eventLocation?: string;
  };
}

// Unified bilingual data - same items for both languages
const encyclopediaItems: BilingualItem[] = [
  {
    id: 'enc-1',
    slug: 'tugu-yogyakarta',
    title_id: 'Tugu Yogyakarta',
    title_en: 'Tugu Yogyakarta',
    excerpt_id: 'Monumen ikonik yang menjadi titik awal Sumbu Filosofi di ujung utara. Tugu ini dibangun tahun 1755 oleh Sultan Hamengku Buwono I sebagai simbol persatuan antara Sultan dengan rakyatnya.',
    excerpt_en: 'Iconic monument marking the northern starting point of the Philosophical Axis. Built in 1755 by Sultan Hamengku Buwono I as a symbol of unity between Sultan and his people.',
    category_id: 'Warisan Budaya Benda',
    category_en: 'Tangible Heritage',
    tags_id: ['Monumen', 'Sumbu Utama', 'Sejarah Jogja'],
    tags_en: ['Monument', 'Main Axis', 'Jogja History'],
    type: 'sejarah',
    urlPath: 'encyclopedia',
  },
  {
    id: 'enc-2',
    slug: 'sekaten',
    title_id: 'Sekaten',
    title_en: 'Sekaten',
    excerpt_id: 'Upacara tradisional memperingati Maulid Nabi Muhammad SAW yang diselenggarakan di Alun-Alun Utara Keraton. Tradisi ini telah berlangsung sejak zaman Sultan Hamengku Buwono I.',
    excerpt_en: "Traditional ceremony commemorating Prophet Muhammad's birthday held at North Square of the Palace.",
    category_id: 'Warisan Budaya Tak Benda',
    category_en: 'Intangible Heritage',
    tags_id: ['Upacara Adat', 'Keraton', 'Tradisi Islam'],
    tags_en: ['Traditional Ceremony', 'Palace', 'Islamic Tradition'],
    type: 'sejarah',
    urlPath: 'encyclopedia',
  },
  {
    id: 'enc-3',
    slug: 'sultan-hamengku-buwono-i',
    title_id: 'Sultan Hamengku Buwono I',
    title_en: 'Sultan Hamengku Buwono I',
    excerpt_id: 'Pendiri Kesultanan Yogyakarta dan perancang Sumbu Filosofi. Beliau menetapkan tata ruang kota berdasarkan kosmologi Jawa yang menghubungkan Tugu, Keraton, dan Panggung Krapyak.',
    excerpt_en: 'Founder of Yogyakarta Sultanate and designer of the Philosophical Axis.',
    category_id: 'Tokoh & Sejarah',
    category_en: 'Figures & History',
    tags_id: ['Sultan', 'Pendiri', 'Arsitektur Kota'],
    tags_en: ['Sultan', 'Founder', 'City Architecture'],
    type: 'sejarah',
    urlPath: 'encyclopedia',
  },
  {
    id: 'enc-4',
    slug: 'manunggaling-kawula-gusti',
    title_id: 'Manunggaling Kawula Gusti',
    title_en: 'Manunggaling Kawula Gusti',
    excerpt_id: 'Konsep filosofis Jawa tentang kesatuan antara rakyat (kawula) dengan raja (gusti). Filosofi ini tercermin dalam tata ruang Sumbu Filosofi yang menempatkan Keraton di pusat.',
    excerpt_en: 'Javanese philosophical concept about unity between people (kawula) and ruler (gusti).',
    category_id: 'Istilah & Konsep',
    category_en: 'Terms & Concepts',
    tags_id: ['Filosofi Jawa', 'Kosmologi', 'Kepemimpinan'],
    tags_en: ['Javanese Philosophy', 'Cosmology', 'Leadership'],
    type: 'sejarah',
    urlPath: 'encyclopedia',
  },
  {
    id: 'enc-5',
    slug: 'revitalisasi-taman-sari',
    title_id: 'Revitalisasi Taman Sari',
    title_en: 'Taman Sari Revitalization',
    excerpt_id: 'Proyek pemugaran dan revitalisasi kompleks Taman Sari yang sedang menjadi perhatian. Upaya melestarikan warisan budaya sambil membuka akses wisata yang berkelanjutan.',
    excerpt_en: 'Major restoration and revitalization project of Taman Sari complex currently underway.',
    category_id: 'Sedang Tren',
    category_en: 'Trending',
    tags_id: ['Revitalisasi', 'Taman Sari', 'Pelestarian'],
    tags_en: ['Revitalization', 'Taman Sari', 'Preservation'],
    type: 'sejarah',
    urlPath: 'encyclopedia',
  },
  {
    id: 'enc-6',
    slug: 'menyusuri-sumbu-filosofi-rute-tips',
    title_id: 'Menyusuri Sumbu Filosofi: Rute & Tips',
    title_en: 'Exploring the Philosophical Axis: Routes & Tips',
    excerpt_id: 'Panduan lengkap menyusuri jalur Sumbu Filosofi dari Tugu hingga Panggung Krapyak. Termasuk rekomendasi waktu kunjungan dan spot foto terbaik.',
    excerpt_en: 'Complete guide to exploring the Philosophical Axis route from Tugu to Panggung Krapyak.',
    category_id: 'Tips Wisata',
    category_en: 'Travel Tips',
    tags_id: ['Panduan Wisata', 'Rute', 'Tips Perjalanan'],
    tags_en: ['Travel Guide', 'Route', 'Travel Tips'],
    type: 'sejarah',
    urlPath: 'encyclopedia',
  },
];

const destinasiWisataItems: BilingualItem[] = [
  {
    id: 'wisata-1',
    slug: 'tugu-yogyakarta',
    title_id: 'Tugu Yogyakarta',
    title_en: 'Tugu Yogyakarta',
    excerpt_id: 'Monumen ikonik yang menjadi simbol persatuan dan titik awal sumbu filosofis.',
    excerpt_en: 'Iconic monument symbolizing unity and starting point of philosophical axis.',
    category_id: 'Titik Sumbu Filosofi',
    category_en: 'Philosophical Axis Point',
    thumbnail: '/assets/ef2f909a8e4736aac7086ac0f00afcd53f6c080d.png',
    tags_id: ['Monumen', 'Sumbu Utama', 'Sejarah'],
    tags_en: ['Monument', 'Main Axis', 'History'],
    type: 'wisata',
    urlPath: 'destinasi-wisata',
    extendedData: {
      location_id: 'Jl. Jenderal Sudirman, Yogyakarta',
      location_en: 'Jl. Jend. Sudirman, Yogyakarta',
    }
  },
  {
    id: 'wisata-2',
    slug: 'keraton-yogyakarta',
    title_id: 'Keraton Yogyakarta',
    title_en: 'Yogyakarta Palace',
    excerpt_id: 'Istana resmi Kesultanan Yogyakarta yang masih berfungsi hingga kini.',
    excerpt_en: 'Official palace of Yogyakarta Sultanate still functioning today.',
    category_id: 'Cagar Budaya',
    category_en: 'Cultural Heritage',
    thumbnail: '/assets/71d525189b0fc80e4a5deee30dbc34fba5301eed.png',
    tags_id: ['Keraton', 'Budaya', 'Sejarah', 'Arsitektur'],
    tags_en: ['Palace', 'Culture', 'History', 'Architecture'],
    type: 'wisata',
    urlPath: 'destinasi-wisata',
    extendedData: {
      location_id: 'Jl. Rotowijayan, Yogyakarta',
      location_en: 'Jl. Rotowijayan, Yogyakarta',
      facilities_id: ['Keraton', 'Budaya', 'Sejarah'],
      facilities_en: ['Palace', 'Culture', 'History'],
    }
  },
  {
    id: 'wisata-3',
    slug: 'panggung-krapyak',
    title_id: 'Panggung Krapyak',
    title_en: 'Panggung Krapyak',
    excerpt_id: 'Situs spiritual di ujung selatan sumbu filosofis Yogyakarta.',
    excerpt_en: "Spiritual site at southern end of Yogyakarta's philosophical axis.",
    category_id: 'Titik Sumbu Filosofi',
    category_en: 'Philosophical Axis Point',
    thumbnail: '/assets/fb6b8301383254d95eb7e316d7834fa675727178.png',
    tags_id: ['Sumbu Filosofi', 'Spiritual', 'Sejarah'],
    tags_en: ['Philosophical Axis', 'Spiritual', 'History'],
    type: 'wisata',
    urlPath: 'destinasi-wisata',
  },
  {
    id: 'wisata-4',
    slug: 'makam-raja-raja-imogiri',
    title_id: 'Makam Raja-Raja Imogiri',
    title_en: 'Imogiri Royal Cemetery',
    excerpt_id: 'Kompleks Makam Raja-Raja Imogiri di perbukitan selatan adalah tempat peristirahatan para Sultan dan keluarga kerajaan.',
    excerpt_en: 'Royal cemetery complex in southern hills as resting place for Sultans and royal families.',
    category_id: 'Cagar Budaya',
    category_en: 'Cultural Heritage',
    thumbnail: '/assets/4bbe2eea291c6a19141c048bb0edf54b19883a9a.png',
    tags_id: ['Makam', 'Kerajaan', 'Sejarah'],
    tags_en: ['Cemetery', 'Royal', 'History'],
    type: 'wisata',
    urlPath: 'destinasi-wisata',
  },
  {
    id: 'wisata-5',
    slug: 'museum-sonobudoyo',
    title_id: 'Museum Sonobudoyo',
    title_en: 'Sonobudoyo Museum',
    excerpt_id: 'Museum budaya Jawa dengan koleksi artefak bersejarah yang lengkap.',
    excerpt_en: 'Javanese cultural museum with comprehensive historical artifact collection.',
    category_id: 'Museum',
    category_en: 'Museum',
    thumbnail: '/assets/65ea2f8f990e2839c96ae7dcf40b612be8859a9e.png',
    tags_id: ['Museum', 'Budaya', 'Artefak'],
    tags_en: ['Museum', 'Culture', 'Artifacts'],
    type: 'wisata',
    urlPath: 'destinasi-wisata',
  },
];

const umkmItems: BilingualItem[] = [
  {
    id: 'umkm-1',
    slug: 'gudeg-yu-djum',
    title_id: 'Gudeg Yu Djum',
    title_en: 'Gudeg Yu Djum',
    excerpt_id: 'Gudeg legendaris yang wajib dicoba! Resep turun temurun dengan rasa autentik khas Jogja.',
    excerpt_en: 'Legendary gudeg you must try! Traditional recipe with authentic Jogja taste.',
    category_id: 'Kuliner Tradisional',
    category_en: 'Traditional Culinary',
    tags_id: ['Gudeg', 'Kuliner', 'Tradisional', 'Legendaris'],
    tags_en: ['Gudeg', 'Culinary', 'Traditional', 'Legendary'],
    type: 'umkm',
    urlPath: 'umkm-lokal',
    extendedData: {
      location_id: 'Jl. Wijilan, Yogyakarta',
      location_en: 'Jl. Wijilan, Yogyakarta',
      products_id: ['Gudeg Kering', 'Gudeg Basah', 'Ayam', 'Telur'],
      products_en: ['Dry Gudeg', 'Wet Gudeg', 'Chicken', 'Egg'],
    }
  },
  {
    id: 'umkm-2',
    slug: 'batik-winotosastro',
    title_id: 'Batik Winotosastro',
    title_en: 'Batik Winotosastro',
    excerpt_id: 'Batik cap dan tulis berkualitas tinggi dengan motif klasik dan modern.',
    excerpt_en: 'High-quality cap and tulis batik with classic and modern motifs.',
    category_id: 'Kerajinan Batik',
    category_en: 'Batik Craft',
    tags_id: ['Batik', 'Kerajinan', 'Tradisional', 'Handmade'],
    tags_en: ['Batik', 'Craft', 'Traditional', 'Handmade'],
    type: 'umkm',
    urlPath: 'umkm-lokal',
    extendedData: {
      location_id: 'Jl. Tirtodipuran, Yogyakarta',
      location_en: 'Jl. Tirtodipuran, Yogyakarta',
      products_id: ['Batik Tulis', 'Batik Cap', 'Kain', 'Pakaian'],
      products_en: ['Hand-drawn Batik', 'Stamped Batik', 'Fabric', 'Clothing'],
    }
  },
  {
    id: 'umkm-3',
    slug: 'dagadu-djokdja',
    title_id: 'Dagadu Djokdja',
    title_en: 'Dagadu Djokdja',
    excerpt_id: 'Brand fashion lokal ikonik Jogja dengan design unik dan kualitas premium.',
    excerpt_en: 'Iconic Jogja local fashion brand with unique design and premium quality.',
    category_id: 'Fashion Lokal',
    category_en: 'Local Fashion',
    tags_id: ['Souvenir', 'Kaos', 'Merchandise', 'Ikonik'],
    tags_en: ['Souvenir', 'T-shirt', 'Merchandise', 'Iconic'],
    type: 'umkm',
    urlPath: 'umkm-lokal',
    extendedData: {
      location_id: 'Malioboro, Yogyakarta',
      location_en: 'Malioboro, Yogyakarta',
      products_id: ['Kaos', 'Tote Bag', 'Pin', 'Stiker'],
      products_en: ['T-shirts', 'Tote Bag', 'Pin', 'Sticker'],
    }
  },
  {
    id: 'umkm-4',
    slug: 'jogja-scrummy',
    title_id: 'Jogja Scrummy',
    title_en: 'Jogja Scrummy',
    excerpt_id: 'Dessert box dan snack kekinian yang lagi hits di kalangan anak muda!',
    excerpt_en: 'Trendy dessert box and snacks popular among young people!',
    category_id: 'Dessert & Snack',
    category_en: 'Dessert & Snack',
    tags_id: ['Modern', 'Instagramable', 'Halal', 'Kekinian'],
    tags_en: ['Modern', 'Instagramable', 'Halal', 'Trendy'],
    type: 'umkm',
    urlPath: 'umkm-lokal',
    extendedData: {
      location_id: 'Jl. Kaliurang, Yogyakarta',
      location_en: 'Jl. Kaliurang, Yogyakarta',
    }
  },
  {
    id: 'umkm-5',
    slug: 'omah-gerabah',
    title_id: 'Omah Gerabah',
    title_en: 'Omah Gerabah',
    excerpt_id: 'Produk gerabah artistik untuk dekorasi rumah dengan sentuhan modern.',
    excerpt_en: 'Artistic pottery products for home decoration with modern touch.',
    category_id: 'Kerajinan Tanah Liat',
    category_en: 'Pottery Craft',
    tags_id: ['Handmade', 'Eco-Friendly', 'Unique', 'Gerabah'],
    tags_en: ['Handmade', 'Eco-Friendly', 'Unique', 'Pottery'],
    type: 'umkm',
    urlPath: 'umkm-lokal',
    extendedData: {
      location_id: 'Kasongan, Bantul, Yogyakarta',
      location_en: 'Kasongan, Bantul, Yogyakarta',
    }
  },
  {
    id: 'umkm-6',
    slug: 'studio-grafis-jogja',
    title_id: 'Studio Grafis Jogja',
    title_en: 'Jogja Graphic Studio',
    excerpt_id: 'Jasa design grafis, ilustrasi, dan branding untuk UMKM dan personal.',
    excerpt_en: 'Graphic design, illustration, and branding services for SMEs and personal.',
    category_id: 'Creative Studio',
    category_en: 'Creative Studio',
    tags_id: ['Digital Art', 'Custom', 'Professional', 'Kreatif'],
    tags_en: ['Digital Art', 'Custom', 'Professional', 'Creative'],
    type: 'umkm',
    urlPath: 'umkm-lokal',
    extendedData: {
      location_id: 'Jl. Gejayan, Yogyakarta',
      location_en: 'Jl. Gejayan, Yogyakarta',
    }
  },
];

const spotNongkrongItems: BilingualItem[] = [
  {
    id: 'spot-1',
    slug: 'kopi-klotok-heritage',
    title_id: 'Kopi Klotok Heritage',
    title_en: 'Kopi Klotok Heritage',
    excerpt_id: 'Cafe di alam terbuka dengan view pegunungan yang epic! Perfect buat foto-foto aesthetic.',
    excerpt_en: 'Open-air cafe with epic mountain views! Perfect for aesthetic photoshoots.',
    category_id: 'Cafe',
    category_en: 'Cafe',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    tags_id: ['Instagramable', 'Budget Friendly', 'View Gunung', 'Kopi'],
    tags_en: ['Instagramable', 'Budget Friendly', 'Mountain View', 'Coffee'],
    type: 'nongkrong',
    urlPath: 'spot-nongkrong',
    extendedData: {
      location_id: 'Pakem, Sleman',
      location_en: 'Pakem, Sleman',
    }
  },
  {
    id: 'spot-2',
    slug: 'the-westlake-resto--cafe',
    title_id: 'The Westlake Resto & Cafe',
    title_en: 'The Westlake Resto & Cafe',
    excerpt_id: 'Cafe tepi danau dengan sunset view yang bikin feed IG kamu makin kece!',
    excerpt_en: 'Lakeside cafe with sunset views that will level up your IG feed!',
    category_id: 'Cafe & Restaurant',
    category_en: 'Cafe & Restaurant',
    thumbnail: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    tags_id: ['Sunset View', 'Date Spot', 'Instagramable', 'Romantis'],
    tags_en: ['Sunset View', 'Date Spot', 'Instagramable', 'Romantic'],
    type: 'nongkrong',
    urlPath: 'spot-nongkrong',
    extendedData: {
      location_id: 'Sleman',
      location_en: 'Sleman',
    }
  },
  {
    id: 'spot-3',
    slug: 'roaster--bear',
    title_id: 'Roaster & Bear',
    title_en: 'Roaster & Bear',
    excerpt_id: 'Hidden gem dengan vibe industrial aesthetic. Sering ada live music weekend!',
    excerpt_en: 'Hidden gem with industrial aesthetic vibes. Live music on weekends!',
    category_id: 'Coffee Shop',
    category_en: 'Coffee Shop',
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    tags_id: ['Live Music', 'Cozy Vibes', 'Industrial', 'Coffee'],
    tags_en: ['Live Music', 'Cozy Vibes', 'Industrial', 'Coffee'],
    type: 'nongkrong',
    urlPath: 'spot-nongkrong',
    extendedData: {
      location_id: 'Jl. Prawirotaman, Yogyakarta',
      location_en: 'Jl. Prawirotaman, Yogyakarta',
    }
  },
  {
    id: 'spot-4',
    slug: 'warung-bu-ageng',
    title_id: 'Warung Bu Ageng',
    title_en: 'Warung Bu Ageng',
    excerpt_id: 'Makan tradisional enak dengan harga mahasiswa banget. Recommended untuk makan bareng!',
    excerpt_en: 'Delicious traditional food at student prices. Recommended for group dining!',
    category_id: 'Traditional Food',
    category_en: 'Traditional Food',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    tags_id: ['Super Murah', 'Authentic', 'Tradisional', 'Makanan'],
    tags_en: ['Super Cheap', 'Authentic', 'Traditional', 'Food'],
    type: 'nongkrong',
    urlPath: 'spot-nongkrong',
    extendedData: {
      location_id: 'Tugu Station Area, Yogyakarta',
      location_en: 'Tugu Station Area, Yogyakarta',
    }
  },
  {
    id: 'spot-5',
    slug: 'abhayagiri-restaurant',
    title_id: 'Abhayagiri Restaurant',
    title_en: 'Abhayagiri Restaurant',
    excerpt_id: 'Rooftop venue dengan city view keren! Cocok buat nongkrong rame-rame.',
    excerpt_en: 'Rooftop venue with cool city views! Perfect for hanging out with friends.',
    category_id: 'Resto & Lounge',
    category_en: 'Resto & Lounge',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    tags_id: ['Rooftop', 'Party Vibes', 'City View', 'Premium'],
    tags_en: ['Rooftop', 'Party Vibes', 'City View', 'Premium'],
    type: 'nongkrong',
    urlPath: 'spot-nongkrong',
    extendedData: {
      location_id: 'Jl. Gejayan, Yogyakarta',
      location_en: 'Jl. Gejayan, Yogyakarta',
    }
  },
  {
    id: 'spot-6',
    slug: 'taman-lampion-kaliurang',
    title_id: 'Taman Lampion Kaliurang',
    title_en: 'Taman Lampion Kaliurang',
    excerpt_id: 'Taman dengan ribuan lampion warna-warni! Viral di TikTok dan super instagramable.',
    excerpt_en: 'Park with thousands of colorful lanterns! Viral on TikTok and super instagramable.',
    category_id: 'Outdoor',
    category_en: 'Outdoor',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    tags_id: ['Night Spot', 'TikTok Viral', 'Instagramable', 'Outdoor'],
    tags_en: ['Night Spot', 'TikTok Viral', 'Instagramable', 'Outdoor'],
    type: 'nongkrong',
    urlPath: 'spot-nongkrong',
    extendedData: {
      location_id: 'Kaliurang, Sleman',
      location_en: 'Kaliurang, Sleman',
    }
  },
];

const agendaItems: BilingualItem[] = [
  {
    id: 'agenda-1',
    slug: 'sekaten-festival-2024',
    title_id: 'Sekaten Festival 2024',
    title_en: 'Sekaten Festival 2024',
    excerpt_id: 'Festival tradisional memperingati Maulid Nabi Muhammad SAW dengan gamelan dan pasar malam.',
    excerpt_en: 'Traditional festival commemorating Prophet Muhammad\'s birthday with gamelan and night market.',
    category_id: 'Budaya & Upacara',
    category_en: 'Culture & Ceremony',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    tags_id: ['Festival', 'Budaya', 'Tradisi', 'Gamelan'],
    tags_en: ['Festival', 'Culture', 'Tradition', 'Gamelan'],
    type: 'agenda',
    urlPath: 'agenda-event',
    extendedData: {
      time: '18:00 - 23:00',
      eventLocation: 'Alun-Alun Utara Keraton, Yogyakarta',
    }
  },
  {
    id: 'agenda-2',
    slug: 'jogja-international-music-festival',
    title_id: 'Jogja International Music Festival',
    title_en: 'Jogja International Music Festival',
    excerpt_id: 'Festival musik internasional dengan lineup artis dalam dan luar negeri.',
    excerpt_en: 'International music festival featuring local and international artists.',
    category_id: 'Festival & Hiburan',
    category_en: 'Festivals & Entertainment',
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    tags_id: ['Musik', 'Festival', 'Konser', 'Internasional'],
    tags_en: ['Music', 'Festival', 'Concert', 'International'],
    type: 'agenda',
    urlPath: 'agenda-event',
    extendedData: {
      time: '14:00 - 23:00',
      eventLocation: 'Stadion Mandala Krida, Yogyakarta',
    }
  },
  {
    id: 'agenda-3',
    slug: 'workshop-batik-untuk-pemula',
    title_id: 'Workshop Batik untuk Pemula',
    title_en: 'Batik Workshop for Beginners',
    excerpt_id: 'Belajar teknik membatik cap dan tulis dari pengrajin berpengalaman.',
    excerpt_en: 'Learn batik techniques from experienced craftsmen with easy-to-understand methods.',
    category_id: 'Komunitas & Workshop',
    category_en: 'Community & Workshop',
    thumbnail: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80',
    tags_id: ['Workshop', 'Batik', 'Kerajinan', 'Edukasi'],
    tags_en: ['Workshop', 'Batik', 'Craft', 'Education'],
    type: 'agenda',
    urlPath: 'agenda-event',
    extendedData: {
      time: '09:00 - 15:00',
      eventLocation: 'Rumah Batik Tirtodipuran, Yogyakarta',
    }
  },
  {
    id: 'agenda-4',
    slug: 'jogja-art-fair-2024',
    title_id: 'Jogja Art Fair 2024',
    title_en: 'Jogja Art Fair 2024',
    excerpt_id: 'Pameran seni rupa kontemporer dari seniman lokal dan nasional.',
    excerpt_en: 'Contemporary art exhibition featuring works of local and national artists.',
    category_id: 'Pameran Kreatif',
    category_en: 'Creative Exhibition',
    thumbnail: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
    tags_id: ['Seni', 'Pameran', 'Lukisan', 'Kontemporer'],
    tags_en: ['Art', 'Exhibition', 'Painting', 'Contemporary'],
    type: 'agenda',
    urlPath: 'agenda-event',
    extendedData: {
      time: '10:00 - 20:00',
      eventLocation: 'Taman Budaya Yogyakarta',
    }
  },
  {
    id: 'agenda-5',
    slug: 'pasar-umkm-kotagede',
    title_id: 'Pasar UMKM Kotagede',
    title_en: 'Kotagede MSME Market',
    excerpt_id: 'Bazar produk UMKM lokal dengan beragam kerajinan dan kuliner khas.',
    excerpt_en: 'Local MSME product bazaar with various crafts and traditional culinary.',
    category_id: 'Event UMKM',
    category_en: 'MSME Events',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    tags_id: ['UMKM', 'Bazar', 'Kerajinan', 'Kuliner'],
    tags_en: ['MSME', 'Bazaar', 'Craft', 'Culinary'],
    type: 'agenda',
    urlPath: 'agenda-event',
    extendedData: {
      time: '10:00 - 21:00',
      eventLocation: 'Alun-Alun Kotagede, Bantul',
    }
  },
];

// All items combined for search
const allItems: BilingualItem[] = [
  ...encyclopediaItems,
  ...destinasiWisataItems,
  ...umkmItems,
  ...spotNongkrongItems,
  ...agendaItems,
];

/**
 * Search across all data sources with bilingual support
 * Returns consistent results regardless of current locale
 */
export function searchAllData(
  query: string,
  options: SearchOptions
): SearchResult[] {
  const { locale, limit = 50, types } = options;
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  const results: SearchResult[] = [];

  // Search through all items - search in BOTH languages for consistent results
  allItems.forEach(item => {
    // Filter by type if specified
    if (types && !types.includes(item.type)) return;

    // Search fields include both language versions for consistent results
    const searchFields = [
      item.title_id,
      item.title_en,
      item.excerpt_id,
      item.excerpt_en,
      item.category_id,
      item.category_en,
      ...item.tags_id,
      ...item.tags_en,
      item.extendedData?.location_id,
      item.extendedData?.location_en,
      item.extendedData?.eventLocation,
    ].filter(Boolean) as string[];

    if (matchesQuery(searchFields, normalizedQuery)) {
      // Return localized version based on current locale
      const result: SearchResult = {
        id: item.id,
        type: item.type,
        slug: item.slug,
        title: locale === 'id' ? item.title_id : item.title_en,
        excerpt: locale === 'id' ? item.excerpt_id : item.excerpt_en,
        category: locale === 'id' ? item.category_id : item.category_en,
        thumbnail: item.thumbnail,
        url: `/${locale}/${item.urlPath}/${item.slug}`,
      };

      // Add extended data based on type
      if (item.type === 'wisata' && item.extendedData) {
        result.wisataData = {
          facilities_id: item.extendedData.facilities_id,
          facilities_en: item.extendedData.facilities_en,
        };
      }

      if (item.type === 'umkm' && item.extendedData) {
        result.umkmData = {
          products_id: item.extendedData.products_id,
          products_en: item.extendedData.products_en,
          location_id: item.extendedData.location_id,
          location_en: item.extendedData.location_en,
        };
      }

      if (item.type === 'agenda' && item.extendedData) {
        const timeParts = item.extendedData.time?.split(' - ') || [];
        result.agendaData = {
          time_start: timeParts[0],
          time_end: timeParts[1],
          location: item.extendedData.eventLocation,
        };
      }

      results.push(result);
    }
  });

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

  allItems.forEach(item => {
    const title = locale === 'id' ? item.title_id : item.title_en;
    if (title.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(title);
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
    nongkrong: { id: 'Nongkrong', en: 'Hangout' },
  };

  return labels[type][locale];
}

/**
 * Get all available types
 */
export function getAllSearchTypes(): SearchResultType[] {
  return ['kawasan', 'wisata', 'umkm', 'sejarah', 'agenda', 'galeri', 'lokasi', 'nongkrong'];
}

/**
 * Helper function to check if any field matches the query
 */
function matchesQuery(fields: string[], query: string): boolean {
  return fields.some(field => field.toLowerCase().includes(query));
}
