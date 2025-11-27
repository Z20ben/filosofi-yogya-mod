// Mock data imports removed - now using hardcoded data matching actual pages

export type SearchResultType =
  | 'kawasan'
  | 'wisata'
  | 'umkm'
  | 'sejarah'
  | 'agenda'
  | 'galeri'
  | 'lokasi';

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

/**
 * Search across all data sources with bilingual support
 * Using hardcoded data that matches our actual pages
 */
export function searchAllData(
  query: string,
  options: SearchOptions
): SearchResult[] {
  const { locale, limit = 50, types } = options;
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  const results: SearchResult[] = [];

  // Helper to generate slug
  const generateSlug = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  };

  // Search Encyclopedia (using sejarah type)
  if (!types || types.includes('sejarah')) {
    const encyclopediaData = locale === 'id' ? [
      { id: '1', title: 'Tugu Yogyakarta', excerpt: 'Monumen ikonik yang menjadi titik awal Sumbu Filosofi di ujung utara. Tugu ini dibangun tahun 1755 oleh Sultan Hamengku Buwono I sebagai simbol persatuan antara Sultan dengan rakyatnya.', category: 'Warisan Budaya Benda', tags: ['Monumen', 'Sumbu Utama', 'Sejarah Jogja'] },
      { id: '2', title: 'Sekaten', excerpt: 'Upacara tradisional memperingati Maulid Nabi Muhammad SAW yang diselenggarakan di Alun-Alun Utara Keraton. Tradisi ini telah berlangsung sejak zaman Sultan Hamengku Buwono I.', category: 'Warisan Budaya Tak Benda', tags: ['Upacara Adat', 'Keraton', 'Tradisi Islam'] },
      { id: '3', title: 'Sultan Hamengku Buwono I', excerpt: 'Pendiri Kesultanan Yogyakarta dan perancang Sumbu Filosofi. Beliau menetapkan tata ruang kota berdasarkan kosmologi Jawa yang menghubungkan Tugu, Keraton, dan Panggung Krapyak.', category: 'Tokoh & Sejarah', tags: ['Sultan', 'Pendiri', 'Arsitektur Kota'] },
      { id: '4', title: 'Manunggaling Kawula Gusti', excerpt: 'Konsep filosofis Jawa tentang kesatuan antara rakyat (kawula) dengan raja (gusti). Filosofi ini tercermin dalam tata ruang Sumbu Filosofi yang menempatkan Keraton di pusat.', category: 'Istilah & Konsep', tags: ['Filosofi Jawa', 'Kosmologi', 'Kepemimpinan'] },
      { id: '5', title: 'Revitalisasi Taman Sari', excerpt: 'Proyek pemugaran dan revitalisasi kompleks Taman Sari yang sedang menjadi perhatian. Upaya melestarikan warisan budaya sambil membuka akses wisata yang berkelanjutan.', category: 'Sedang Tren', tags: ['Revitalisasi', 'Taman Sari', 'Pelestarian'] },
      { id: '6', title: 'Menyusuri Sumbu Filosofi: Rute & Tips', excerpt: 'Panduan lengkap menyusuri jalur Sumbu Filosofi dari Tugu hingga Panggung Krapyak. Termasuk rekomendasi waktu kunjungan dan spot foto terbaik.', category: 'Tips Wisata', tags: ['Panduan Wisata', 'Rute', 'Tips Perjalanan'] },
    ] : [
      { id: '1', title: 'Tugu Yogyakarta', excerpt: 'Iconic monument marking the northern starting point of the Philosophical Axis. Built in 1755 by Sultan Hamengku Buwono I as a symbol of unity between Sultan and his people.', category: 'Tangible Heritage', tags: ['Monument', 'Main Axis', 'Jogja History'] },
      { id: '2', title: 'Sekaten', excerpt: 'Traditional ceremony commemorating Prophet Muhammad\'s birthday held at North Square of the Palace.', category: 'Intangible Heritage', tags: ['Traditional Ceremony', 'Palace', 'Islamic Tradition'] },
      { id: '3', title: 'Sultan Hamengku Buwono I', excerpt: 'Founder of Yogyakarta Sultanate and designer of the Philosophical Axis.', category: 'Figures & History', tags: ['Sultan', 'Founder', 'City Architecture'] },
      { id: '4', title: 'Manunggaling Kawula Gusti', excerpt: 'Javanese philosophical concept about unity between people (kawula) and ruler (gusti).', category: 'Terms & Concepts', tags: ['Javanese Philosophy', 'Cosmology', 'Leadership'] },
      { id: '5', title: 'Taman Sari Revitalization', excerpt: 'Major restoration and revitalization project of Taman Sari complex currently underway.', category: 'Trending', tags: ['Revitalization', 'Taman Sari', 'Preservation'] },
      { id: '6', title: 'Exploring the Philosophical Axis: Routes & Tips', excerpt: 'Complete guide to exploring the Philosophical Axis route from Tugu to Panggung Krapyak.', category: 'Travel Tips', tags: ['Travel Guide', 'Route', 'Travel Tips'] },
    ];

    encyclopediaData.forEach(item => {
      const searchFields = [item.title, item.excerpt, item.category, ...item.tags];
      if (matchesQuery(searchFields, normalizedQuery)) {
        results.push({
          id: item.id,
          type: 'sejarah',
          slug: generateSlug(item.title),
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          url: `/${locale}/encyclopedia/${item.id}`,
        });
      }
    });
  }

  // Search Destinasi Wisata & Spot Nongkrong (using wisata type)
  if (!types || types.includes('wisata')) {
    // Destinasi Wisata data
    const destinasiData = locale === 'id' ? [
      {
        id: 'keraton-yogyakarta',
        title: 'Keraton Yogyakarta',
        excerpt: 'Istana resmi Kesultanan Ngayogyakarta Hadiningrat yang masih berfungsi hingga kini. Kompleks keraton yang luas ini menjadi pusat budaya dan pemerintahan kesultanan.',
        category: 'Titik Sumbu Filosofi',
        tags: ['Keraton', 'Budaya', 'Sejarah', 'Arsitektur'],
        address: 'Jl. Rotowijayan Blok No. 1, Panembahan, Kraton, Yogyakarta'
      },
      {
        id: 'taman-sari',
        title: 'Taman Sari',
        excerpt: 'Kompleks taman air bekas pemandian Sultan dengan arsitektur perpaduan Jawa-Eropa yang memukau. Dibangun pada masa Sultan Hamengku Buwono I.',
        category: 'Kawasan Keraton',
        tags: ['Taman', 'Air', 'Heritage', 'Arsitektur'],
        address: 'Jl. Taman, Patehan, Kraton, Yogyakarta'
      },
      {
        id: 'alun-alun-kidul',
        title: 'Alun-alun Kidul',
        excerpt: 'Lapangan luas di selatan Keraton yang menjadi pusat aktivitas masyarakat, terkenal dengan pohon beringin kembarnya dan tradisi masangin.',
        category: 'Kawasan Keraton',
        tags: ['Alun-alun', 'Tradisi', 'Masangin', 'Kuliner'],
        address: 'Patehan, Kraton, Yogyakarta'
      },
      {
        id: 'malioboro',
        title: 'Malioboro',
        excerpt: 'Jalan legendaris dan ikon Yogyakarta yang ramai dengan pedagang, hotel, dan pusat perbelanjaan. Jalur utama pada Sumbu Filosofi.',
        category: 'Kawasan Komersial',
        tags: ['Shopping', 'Kuliner', 'Budaya', 'Ikonik'],
        address: 'Jl. Malioboro, Sosromenduran, Gedong Tengen, Yogyakarta'
      },
      {
        id: 'benteng-vredeburg',
        title: 'Benteng Vredeburg',
        excerpt: 'Museum sejarah dalam benteng peninggalan Belanda yang menampilkan diorama perjuangan kemerdekaan Indonesia. Lokasi strategis di pusat kota.',
        category: 'Museum',
        tags: ['Museum', 'Sejarah', 'Benteng', 'Edukasi'],
        address: 'Jl. Marga Mulya No.6, Ngupasan, Gondomanan, Yogyakarta'
      }
    ] : [
      {
        id: 'keraton-yogyakarta',
        title: 'Yogyakarta Palace',
        excerpt: 'The official palace of Ngayogyakarta Hadiningrat Sultanate still functioning today. This vast palace complex is the center of culture and sultanate governance.',
        category: 'Philosophical Axis Point',
        tags: ['Palace', 'Culture', 'History', 'Architecture'],
        address: 'Jl. Rotowijayan Blok No. 1, Panembahan, Kraton, Yogyakarta'
      },
      {
        id: 'taman-sari',
        title: 'Taman Sari Water Castle',
        excerpt: 'Former Sultan\'s bathing complex with stunning Javanese-European architectural blend. Built during Sultan Hamengku Buwono I\'s reign.',
        category: 'Palace Area',
        tags: ['Garden', 'Water', 'Heritage', 'Architecture'],
        address: 'Jl. Taman, Patehan, Kraton, Yogyakarta'
      },
      {
        id: 'alun-alun-kidul',
        title: 'South Square',
        excerpt: 'Wide field south of the Palace serving as community activity center, famous for its twin banyan trees and masangin tradition.',
        category: 'Palace Area',
        tags: ['Square', 'Tradition', 'Masangin', 'Culinary'],
        address: 'Patehan, Kraton, Yogyakarta'
      },
      {
        id: 'malioboro',
        title: 'Malioboro Street',
        excerpt: 'Legendary street and icon of Yogyakarta bustling with merchants, hotels, and shopping centers. Main route on the Philosophical Axis.',
        category: 'Commercial Area',
        tags: ['Shopping', 'Culinary', 'Culture', 'Iconic'],
        address: 'Jl. Malioboro, Sosromenduran, Gedong Tengen, Yogyakarta'
      },
      {
        id: 'benteng-vredeburg',
        title: 'Fort Vredeburg',
        excerpt: 'Historical museum in Dutch colonial fort displaying dioramas of Indonesian independence struggle. Strategic location in city center.',
        category: 'Museum',
        tags: ['Museum', 'History', 'Fort', 'Education'],
        address: 'Jl. Marga Mulya No.6, Ngupasan, Gondomanan, Yogyakarta'
      }
    ];

    destinasiData.forEach(item => {
      const searchFields = [item.title, item.excerpt, item.category, ...item.tags, item.address];
      if (matchesQuery(searchFields, normalizedQuery)) {
        results.push({
          id: item.id,
          type: 'wisata',
          slug: item.id,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          url: `/${locale}/destinasi-wisata/${item.id}`,
        });
      }
    });

    // Spot Nongkrong data
    const spotData = locale === 'id' ? [
      {
        id: 'kopi-klotok-heritage',
        title: 'Kopi Klotok Heritage',
        excerpt: 'Kedai kopi legendaris dengan suasana vintage dan kopi racikan tradisional yang kental. Tempat nongkrong favorit sejak 1980an.',
        category: 'Kafe',
        tags: ['Kopi', 'Vintage', 'Tradisional', 'Heritage'],
        address: 'Jl. Adisucipto Km. 6, Sleman, Yogyakarta'
      },
      {
        id: 'the-westlake-resto-cafe',
        title: 'The Westlake Resto & Cafe',
        excerpt: 'Restoran dan kafe tepi danau dengan pemandangan sunset yang memukau. Menu western dan indonesian fusion.',
        category: 'Resto & Kafe',
        tags: ['Danau', 'Sunset', 'Western', 'Romantis'],
        address: 'Jl. Kaliurang Km 21.5, Sleman, Yogyakarta'
      },
      {
        id: 'roaster-and-bear',
        title: 'Roaster & Bear',
        excerpt: 'Coffee shop modern dengan interior industrial dan specialty coffee berkualitas tinggi. Perfect untuk kerja remote.',
        category: 'Kafe',
        tags: ['Specialty Coffee', 'Modern', 'Coworking', 'Industrial'],
        address: 'Jl. Veteran No. 5, Pandeyan, Umbulharjo, Yogyakarta'
      },
      {
        id: 'warung-bu-ageng',
        title: 'Warung Bu Ageng',
        excerpt: 'Warung makan sederhana dengan masakan rumahan yang lezat dan harga terjangkau. Favorit anak kos dan mahasiswa.',
        category: 'Warung Makan',
        tags: ['Masakan Rumahan', 'Murah', 'Sederhana', 'Tradisional'],
        address: 'Jl. Kaliurang Km 5.5, Sleman, Yogyakarta'
      },
      {
        id: 'abhayagiri-restaurant',
        title: 'Abhayagiri Restaurant',
        excerpt: 'Restoran dengan view kota Jogja dari atas bukit. Menu fine dining dengan cita rasa Indonesia modern.',
        category: 'Restoran',
        tags: ['View', 'Fine Dining', 'Romantis', 'Premium'],
        address: 'Jl. Hargobinangun, Pakem, Sleman, Yogyakarta'
      },
      {
        id: 'taman-lampion-kaliurang',
        title: 'Taman Lampion Kaliurang',
        excerpt: 'Taman rekreasi dengan ribuan lampion warna-warni di malam hari. Tempat wisata keluarga yang Instagramable.',
        category: 'Tempat Wisata',
        tags: ['Lampion', 'Keluarga', 'Instagramable', 'Malam'],
        address: 'Jl. Kaliurang Km 22.5, Hargobinangun, Pakem, Sleman, Yogyakarta'
      }
    ] : [
      {
        id: 'kopi-klotok-heritage',
        title: 'Kopi Klotok Heritage',
        excerpt: 'Legendary coffee shop with vintage atmosphere and thick traditional brewed coffee. Favorite hangout since 1980s.',
        category: 'Cafe',
        tags: ['Coffee', 'Vintage', 'Traditional', 'Heritage'],
        address: 'Jl. Adisucipto Km. 6, Sleman, Yogyakarta'
      },
      {
        id: 'the-westlake-resto-cafe',
        title: 'The Westlake Resto & Cafe',
        excerpt: 'Lakeside restaurant and cafe with stunning sunset views. Western and Indonesian fusion menu.',
        category: 'Restaurant & Cafe',
        tags: ['Lake', 'Sunset', 'Western', 'Romantic'],
        address: 'Jl. Kaliurang Km 21.5, Sleman, Yogyakarta'
      },
      {
        id: 'roaster-and-bear',
        title: 'Roaster & Bear',
        excerpt: 'Modern coffee shop with industrial interior and high-quality specialty coffee. Perfect for remote working.',
        category: 'Cafe',
        tags: ['Specialty Coffee', 'Modern', 'Coworking', 'Industrial'],
        address: 'Jl. Veteran No. 5, Pandeyan, Umbulharjo, Yogyakarta'
      },
      {
        id: 'warung-bu-ageng',
        title: 'Warung Bu Ageng',
        excerpt: 'Simple eatery with delicious home-cooked food at affordable prices. Favorite of students and boarders.',
        category: 'Eatery',
        tags: ['Home Cooking', 'Affordable', 'Simple', 'Traditional'],
        address: 'Jl. Kaliurang Km 5.5, Sleman, Yogyakarta'
      },
      {
        id: 'abhayagiri-restaurant',
        title: 'Abhayagiri Restaurant',
        excerpt: 'Restaurant with Jogja city view from hilltop. Fine dining menu with modern Indonesian taste.',
        category: 'Restaurant',
        tags: ['View', 'Fine Dining', 'Romantic', 'Premium'],
        address: 'Jl. Hargobinangun, Pakem, Sleman, Yogyakarta'
      },
      {
        id: 'taman-lampion-kaliurang',
        title: 'Taman Lampion Kaliurang',
        excerpt: 'Recreation park with thousands of colorful lanterns at night. Instagrammable family tourist spot.',
        category: 'Tourist Spot',
        tags: ['Lantern', 'Family', 'Instagrammable', 'Night'],
        address: 'Jl. Kaliurang Km 22.5, Hargobinangun, Pakem, Sleman, Yogyakarta'
      }
    ];

    spotData.forEach(item => {
      const searchFields = [item.title, item.excerpt, item.category, ...item.tags, item.address];
      if (matchesQuery(searchFields, normalizedQuery)) {
        results.push({
          id: item.id,
          type: 'wisata',
          slug: item.id,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          url: `/${locale}/spot-nongkrong/${item.id}`,
        });
      }
    });
  }

  // Search UMKM Lokal
  if (!types || types.includes('umkm')) {
    const umkmData = locale === 'id' ? [
      {
        id: 'batik-winotosastro',
        title: 'Batik Winotosastro',
        excerpt: 'Pengrajin batik tulis tradisional sejak 1950an dengan motif khas Yogyakarta. Proses pembuatan batik dilakukan dengan teknik turun temurun.',
        category: 'Kerajinan',
        tags: ['Batik', 'Kerajinan', 'Tradisional', 'Handmade'],
        address: 'Jl. Tirtodipuran No. 54, Mantrijeron, Yogyakarta',
        products: ['Batik Tulis', 'Batik Cap', 'Kain', 'Pakaian']
      },
      {
        id: 'gudeg-yu-djum',
        title: 'Gudeg Yu Djum',
        excerpt: 'Warung gudeg legendaris sejak 1950 dengan cita rasa khas Yogyakarta yang manis dan gurih. Salah satu kuliner wajib di Jogja.',
        category: 'Kuliner',
        tags: ['Gudeg', 'Kuliner', 'Tradisional', 'Legendaris'],
        address: 'Jl. Kemetiran Kidul No. 13, Pringgokusuman, Gedongtengen, Yogyakarta',
        products: ['Gudeg Kering', 'Gudeg Basah', 'Ayam', 'Telur']
      },
      {
        id: 'kerajinan-perak-kotagede',
        title: 'Kerajinan Perak Kotagede',
        excerpt: 'Pusat kerajinan perak dengan teknik tradisional yang telah ada sejak zaman Mataram. Menghasilkan perhiasan dan cinderamata berkualitas tinggi.',
        category: 'Kerajinan',
        tags: ['Perak', 'Silver', 'Perhiasan', 'Kerajinan'],
        address: 'Jl. Mondorakan, Kotagede, Bantul, Yogyakarta',
        products: ['Perhiasan Perak', 'Souvenir', 'Aksesoris', 'Dekorasi']
      },
      {
        id: 'bakpia-pathok-25',
        title: 'Bakpia Pathok 25',
        excerpt: 'Produsen bakpia terkenal dengan berbagai varian rasa modern dan tradisional. Oleh-oleh khas Yogyakarta yang wajib dibawa pulang.',
        category: 'Kuliner',
        tags: ['Bakpia', 'Oleh-oleh', 'Kue', 'Pathok'],
        address: 'Jl. Aip KS Tubun No. 46-48, Pathuk, Gondomanan, Yogyakarta',
        products: ['Bakpia Kacang Hijau', 'Bakpia Keju', 'Bakpia Coklat', 'Bakpia Original']
      },
      {
        id: 'hamzah-batik',
        title: 'Hamzah Batik',
        excerpt: 'Galeri batik modern dengan koleksi lengkap dari berbagai daerah di Indonesia. Menyediakan batik fashion dan kain dengan kualitas premium.',
        category: 'Kerajinan',
        tags: ['Batik', 'Fashion', 'Modern', 'Premium'],
        address: 'Jl. Mataram No. 52, Suryodiningratan, Mantrijeron, Yogyakarta',
        products: ['Batik Fashion', 'Kain Batik', 'Kemeja Batik', 'Dress Batik']
      },
      {
        id: 'dagadu-djokdja',
        title: 'Dagadu Djokdja',
        excerpt: 'Merek souvenir ikonik Jogja dengan desain khas dan kreatif. Terkenal dengan kaos dan merchandise bertemakan Yogyakarta.',
        category: 'Souvenir',
        tags: ['Souvenir', 'Kaos', 'Merchandise', 'Ikonik'],
        address: 'Jl. Dagen No. 39, Malioboro, Yogyakarta',
        products: ['Kaos', 'Tote Bag', 'Pin', 'Stiker']
      }
    ] : [
      {
        id: 'batik-winotosastro',
        title: 'Batik Winotosastro',
        excerpt: 'Traditional hand-drawn batik craftsman since 1950s with distinctive Yogyakarta motifs. Batik making process done with hereditary techniques.',
        category: 'Craft',
        tags: ['Batik', 'Craft', 'Traditional', 'Handmade'],
        address: 'Jl. Tirtodipuran No. 54, Mantrijeron, Yogyakarta',
        products: ['Hand-drawn Batik', 'Stamped Batik', 'Fabric', 'Clothing']
      },
      {
        id: 'gudeg-yu-djum',
        title: 'Gudeg Yu Djum',
        excerpt: 'Legendary gudeg stall since 1950 with distinctive sweet and savory Yogyakarta taste. One of the must-try cuisines in Jogja.',
        category: 'Culinary',
        tags: ['Gudeg', 'Culinary', 'Traditional', 'Legendary'],
        address: 'Jl. Kemetiran Kidul No. 13, Pringgokusuman, Gedongtengen, Yogyakarta',
        products: ['Dry Gudeg', 'Wet Gudeg', 'Chicken', 'Egg']
      },
      {
        id: 'kerajinan-perak-kotagede',
        title: 'Kotagede Silver Craft',
        excerpt: 'Silver craft center with traditional techniques existing since Mataram era. Produces high-quality jewelry and souvenirs.',
        category: 'Craft',
        tags: ['Silver', 'Jewelry', 'Craft', 'Traditional'],
        address: 'Jl. Mondorakan, Kotagede, Bantul, Yogyakarta',
        products: ['Silver Jewelry', 'Souvenirs', 'Accessories', 'Decoration']
      },
      {
        id: 'bakpia-pathok-25',
        title: 'Bakpia Pathok 25',
        excerpt: 'Famous bakpia producer with various modern and traditional flavor variants. Typical Yogyakarta souvenir that must be brought home.',
        category: 'Culinary',
        tags: ['Bakpia', 'Souvenir', 'Cake', 'Pathok'],
        address: 'Jl. Aip KS Tubun No. 46-48, Pathuk, Gondomanan, Yogyakarta',
        products: ['Green Bean Bakpia', 'Cheese Bakpia', 'Chocolate Bakpia', 'Original Bakpia']
      },
      {
        id: 'hamzah-batik',
        title: 'Hamzah Batik',
        excerpt: 'Modern batik gallery with complete collection from various regions in Indonesia. Provides batik fashion and premium quality fabrics.',
        category: 'Craft',
        tags: ['Batik', 'Fashion', 'Modern', 'Premium'],
        address: 'Jl. Mataram No. 52, Suryodiningratan, Mantrijeron, Yogyakarta',
        products: ['Batik Fashion', 'Batik Fabric', 'Batik Shirt', 'Batik Dress']
      },
      {
        id: 'dagadu-djokdja',
        title: 'Dagadu Djokdja',
        excerpt: 'Iconic Jogja souvenir brand with distinctive and creative designs. Famous for t-shirts and merchandise with Yogyakarta theme.',
        category: 'Souvenir',
        tags: ['Souvenir', 'T-shirt', 'Merchandise', 'Iconic'],
        address: 'Jl. Dagen No. 39, Malioboro, Yogyakarta',
        products: ['T-shirts', 'Tote Bag', 'Pin', 'Sticker']
      }
    ];

    umkmData.forEach(item => {
      const searchFields = [item.title, item.excerpt, item.category, ...item.tags, item.address, ...item.products];
      if (matchesQuery(searchFields, normalizedQuery)) {
        results.push({
          id: item.id,
          type: 'umkm',
          slug: item.id,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          url: `/${locale}/umkm-lokal/${item.id}`,
        });
      }
    });
  }


  // Search Agenda Event
  if (!types || types.includes('agenda')) {
    const agendaData = locale === 'id' ? [
      {
        id: 'sekaten-festival-2024',
        title: 'Sekaten Festival 2024',
        excerpt: 'Festival budaya tahunan yang menampilkan gamelan, pasar malam tradisional, dan berbagai pertunjukan seni. Merayakan tradisi Keraton Yogyakarta.',
        category: 'Budaya & Upacara',
        tags: ['Festival', 'Budaya', 'Tradisi', 'Gamelan'],
        date: '25 November 2024',
        time: '18:00 - 23:00',
        location: 'Alun-Alun Utara Keraton, Yogyakarta'
      },
      {
        id: 'jogja-international-music-festival',
        title: 'Jogja International Music Festival',
        excerpt: 'Festival musik internasional yang menghadirkan artis lokal dan mancanegara. Berbagai genre musik dari rock, pop, hingga EDM.',
        category: 'Festival & Hiburan',
        tags: ['Musik', 'Festival', 'Konser', 'Internasional'],
        date: '15 Desember 2024',
        time: '14:00 - 23:00',
        location: 'Stadion Mandala Krida, Yogyakarta'
      },
      {
        id: 'workshop-batik-untuk-pemula',
        title: 'Workshop Batik untuk Pemula',
        excerpt: 'Belajar teknik membatik dari ahli dengan metode yang mudah dipahami pemula. Termasuk materi dan alat batik.',
        category: 'Komunitas & Workshop',
        tags: ['Workshop', 'Batik', 'Kerajinan', 'Edukasi'],
        date: '28 November 2024',
        time: '09:00 - 15:00',
        location: 'Rumah Batik Tirtodipuran, Yogyakarta'
      },
      {
        id: 'jogja-art-fair-2024',
        title: 'Jogja Art Fair 2024',
        excerpt: 'Pameran seni rupa kontemporer menampilkan karya seniman lokal dan nasional. Berbagai medium dari lukisan, patung, hingga instalasi.',
        category: 'Pameran Kreatif',
        tags: ['Seni', 'Pameran', 'Lukisan', 'Kontemporer'],
        date: '5-10 Desember 2024',
        time: '10:00 - 20:00',
        location: 'Taman Budaya Yogyakarta'
      },
      {
        id: 'pasar-umkm-kotagede',
        title: 'Pasar UMKM Kotagede',
        excerpt: 'Bazar produk UMKM lokal dari Kotagede dan sekitarnya. Kerajinan perak, batik, kuliner tradisional, dan berbagai produk kreatif.',
        category: 'Event UMKM',
        tags: ['UMKM', 'Bazar', 'Kerajinan', 'Kuliner'],
        date: '1-3 Desember 2024',
        time: '10:00 - 21:00',
        location: 'Alun-Alun Kotagede, Bantul'
      }
    ] : [
      {
        id: 'sekaten-festival-2024',
        title: 'Sekaten Festival 2024',
        excerpt: 'Annual cultural festival featuring gamelan, traditional night market, and various art performances. Celebrating Yogyakarta Palace tradition.',
        category: 'Culture & Ceremony',
        tags: ['Festival', 'Culture', 'Tradition', 'Gamelan'],
        date: 'November 25, 2024',
        time: '18:00 - 23:00',
        location: 'North Square Keraton, Yogyakarta'
      },
      {
        id: 'jogja-international-music-festival',
        title: 'Jogja International Music Festival',
        excerpt: 'International music festival featuring local and international artists. Various music genres from rock, pop, to EDM.',
        category: 'Festivals & Entertainment',
        tags: ['Music', 'Festival', 'Concert', 'International'],
        date: 'December 15, 2024',
        time: '14:00 - 23:00',
        location: 'Mandala Krida Stadium, Yogyakarta'
      },
      {
        id: 'workshop-batik-untuk-pemula',
        title: 'Batik Workshop for Beginners',
        excerpt: 'Learn batik techniques from experts with easy-to-understand methods for beginners. Includes batik materials and tools.',
        category: 'Community & Workshop',
        tags: ['Workshop', 'Batik', 'Craft', 'Education'],
        date: 'November 28, 2024',
        time: '09:00 - 15:00',
        location: 'Batik House Tirtodipuran, Yogyakarta'
      },
      {
        id: 'jogja-art-fair-2024',
        title: 'Jogja Art Fair 2024',
        excerpt: 'Contemporary art exhibition featuring works of local and national artists. Various mediums from painting, sculpture, to installation.',
        category: 'Creative Exhibition',
        tags: ['Art', 'Exhibition', 'Painting', 'Contemporary'],
        date: 'December 5-10, 2024',
        time: '10:00 - 20:00',
        location: 'Taman Budaya Yogyakarta'
      },
      {
        id: 'pasar-umkm-kotagede',
        title: 'Kotagede MSME Market',
        excerpt: 'Local MSME product bazaar from Kotagede and surroundings. Silver craft, batik, traditional culinary, and various creative products.',
        category: 'MSME Events',
        tags: ['MSME', 'Bazaar', 'Craft', 'Culinary'],
        date: 'December 1-3, 2024',
        time: '10:00 - 21:00',
        location: 'Kotagede Square, Bantul'
      }
    ];

    agendaData.forEach(item => {
      const searchFields = [item.title, item.excerpt, item.category, ...item.tags, item.location, item.date];
      if (matchesQuery(searchFields, normalizedQuery)) {
        results.push({
          id: item.id,
          type: 'agenda',
          slug: item.id,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          url: `/${locale}/agenda-event/${item.id}`,
        });
      }
    });
  }

  // Note: Galeri and Lokasi search removed as we're focusing on main pages
  // (Encyclopedia, Spot Nongkrong, UMKM Lokal, Destinasi Wisata, Agenda Event)

  return results.slice(0, limit);
}

/**
 * Get search suggestions based on query
 * Only returns data from pages we're actually using:
 * - Encyclopedia (from sejarah/encyclopedia entries)
 * - Spot Nongkrong (hardcoded data from spot-nongkrong page)
 * - UMKM Lokal (hardcoded data from umkm-lokal page)
 * - Destinasi Wisata (hardcoded data from destinasi-wisata page)
 * - Agenda Event (hardcoded data from agenda-event page)
 */
export function getSearchSuggestions(
  query: string,
  locale: 'id' | 'en',
  limit: number = 5
): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 2) return [];

  const suggestions = new Set<string>();

  // Encyclopedia entries (matching encyclopedia page data)
  const encyclopediaEntries = locale === 'id' ? [
    'Tugu Yogyakarta',
    'Sekaten',
    'Sultan Hamengku Buwono I',
    'Manunggaling Kawula Gusti',
    'Revitalisasi Taman Sari',
    'Menyusuri Sumbu Filosofi: Rute & Tips',
  ] : [
    'Tugu Yogyakarta',
    'Sekaten',
    'Sultan Hamengku Buwono I',
    'Manunggaling Kawula Gusti',
    'Taman Sari Revitalization',
    'Exploring the Philosophical Axis: Routes & Tips',
  ];

  encyclopediaEntries.forEach(title => {
    if (title.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(title);
    }
  });

  // Spot Nongkrong data (from spot-nongkrong page)
  const spotData = locale === 'id' ? [
    'Kopi Klotok Heritage',
    'The Westlake Resto & Cafe',
    'Roaster & Bear',
    'Warung Bu Ageng',
    'Abhayagiri Restaurant',
    'Taman Lampion Kaliurang',
  ] : [
    'Kopi Klotok Heritage',
    'The Westlake Resto & Cafe',
    'Roaster & Bear',
    'Warung Bu Ageng',
    'Abhayagiri Restaurant',
    'Taman Lampion Kaliurang',
  ];

  spotData.forEach(name => {
    if (name.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(name);
    }
  });

  // UMKM Lokal data (from umkm-lokal page)
  const umkmData = locale === 'id' ? [
    'Batik Winotosastro',
    'Gudeg Yu Djum',
    'Kerajinan Perak Kotagede',
    'Bakpia Pathok 25',
    'Hamzah Batik',
    'Dagadu Djokdja',
  ] : [
    'Batik Winotosastro',
    'Gudeg Yu Djum',
    'Kotagede Silver Craft',
    'Bakpia Pathok 25',
    'Hamzah Batik',
    'Dagadu Djokdja',
  ];

  umkmData.forEach(name => {
    if (name.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(name);
    }
  });

  // Destinasi Wisata data (from destinasi-wisata page)
  const destinasiData = locale === 'id' ? [
    'Keraton Yogyakarta',
    'Taman Sari',
    'Alun-alun Kidul',
    'Malioboro',
    'Benteng Vredeburg',
  ] : [
    'Yogyakarta Palace',
    'Taman Sari Water Castle',
    'South Square',
    'Malioboro Street',
    'Fort Vredeburg',
  ];

  destinasiData.forEach(name => {
    if (name.toLowerCase().includes(normalizedQuery)) {
      suggestions.add(name);
    }
  });

  // Agenda Event data (from agenda-event page)
  const agendaData = locale === 'id' ? [
    'Sekaten Festival 2024',
    'Jogja International Music Festival',
    'Workshop Batik untuk Pemula',
    'Jogja Art Fair 2024',
    'Pasar UMKM Kotagede',
  ] : [
    'Sekaten Festival 2024',
    'Jogja International Music Festival',
    'Batik Workshop for Beginners',
    'Jogja Art Fair 2024',
    'Kotagede MSME Market',
  ];

  agendaData.forEach(name => {
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
