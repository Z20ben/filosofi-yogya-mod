export type SiteCategory =
  | 'heritage'    // Warisan Budaya (Keraton, Candi, Museum)
  | 'monument'    // Monumen/Tugu
  | 'religious'   // Tempat Ibadah
  | 'tourism'     // Tempat Wisata
  | 'umkm'        // UMKM/Kerajinan
  | 'culinary'    // Kuliner
  | 'attraction'; // Atraksi

export interface SiteLocation {
  id: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  category: SiteCategory;
  subcategory?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address_id: string;
  address_en: string;

  // Tourism specific
  entryFee?: {
    local?: number;
    foreign?: number;
  };
  openingHours?: string;
  facilities?: string[];

  // UMKM specific
  products?: string[];
  priceRange?: string;
  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
  };

  // General
  images?: string[];
  website?: string;
  googleMapsUrl?: string;
}

// Mockup data - 20 locations across Yogyakarta (Sumbu Filosofi area)
export const mapLocations: SiteLocation[] = [
  // ===== HERITAGE SITES (4) =====
  {
    id: 'keraton-yogya',
    name_id: 'Keraton Ngayogyakarta Hadiningrat',
    name_en: 'Yogyakarta Palace',
    description_id: 'Istana resmi Kesultanan Ngayogyakarta Hadiningrat yang masih berfungsi hingga saat ini. Merupakan pusat kebudayaan Jawa dan simbol keberlangsungan tradisi.',
    description_en: 'The official palace of the Sultanate of Yogyakarta, still functioning today. It is the center of Javanese culture and a symbol of continuing tradition.',
    category: 'heritage',
    subcategory: 'palace',
    coordinates: { lat: -7.805327, lng: 110.364447 },
    address_id: 'Jl. Rotowijayan Blok No. 1, Panembahan, Kraton',
    address_en: 'Jl. Rotowijayan Block No. 1, Panembahan, Kraton',
    entryFee: { local: 15000, foreign: 25000 },
    openingHours: '08:00 - 14:00',
    facilities: ['Toilet', 'Parkir', 'Mushola', 'Toko Souvenir', 'Guide'],
    googleMapsUrl: 'https://goo.gl/maps/keraton',
  },
  {
    id: 'museum-sonobudoyo',
    name_id: 'Museum Sonobudoyo',
    name_en: 'Sonobudoyo Museum',
    description_id: 'Museum yang menyimpan koleksi kebudayaan Jawa, termasuk wayang, gamelan, dan berbagai artefak bersejarah.',
    description_en: 'Museum housing Javanese cultural collections, including wayang puppets, gamelan, and various historical artifacts.',
    category: 'heritage',
    subcategory: 'museum',
    coordinates: { lat: -7.803056, lng: 110.365833 },
    address_id: 'Jl. Pangurakan No.6, Ngupasan, Gondomanan',
    address_en: 'Jl. Pangurakan No.6, Ngupasan, Gondomanan',
    entryFee: { local: 10000, foreign: 15000 },
    openingHours: '08:00 - 15:30 (Senin tutup)',
    facilities: ['Toilet', 'Parkir', 'Mushola'],
    googleMapsUrl: 'https://goo.gl/maps/sonobudoyo',
  },
  {
    id: 'candi-prambanan',
    name_id: 'Candi Prambanan',
    name_en: 'Prambanan Temple',
    description_id: 'Kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9. Situs Warisan Dunia UNESCO.',
    description_en: 'The largest Hindu temple complex in Indonesia, built in the 9th century. UNESCO World Heritage Site.',
    category: 'heritage',
    subcategory: 'temple',
    coordinates: { lat: -7.752019, lng: 110.491447 },
    address_id: 'Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Prambanan, Sleman',
    address_en: 'Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Prambanan, Sleman',
    entryFee: { local: 50000, foreign: 350000 },
    openingHours: '06:00 - 17:00',
    facilities: ['Toilet', 'Parkir', 'Mushola', 'Restaurant', 'Toko Souvenir'],
    googleMapsUrl: 'https://goo.gl/maps/prambanan',
  },
  {
    id: 'benteng-vredeburg',
    name_id: 'Benteng Vredeburg',
    name_en: 'Fort Vredeburg',
    description_id: 'Benteng peninggalan Belanda yang kini menjadi museum sejarah perjuangan kemerdekaan Indonesia.',
    description_en: 'A Dutch colonial fort now serving as a museum of Indonesian independence struggle history.',
    category: 'heritage',
    subcategory: 'fort',
    coordinates: { lat: -7.800278, lng: 110.366111 },
    address_id: 'Jl. Margo Mulyo No.6, Ngupasan, Gondomanan',
    address_en: 'Jl. Margo Mulyo No.6, Ngupasan, Gondomanan',
    entryFee: { local: 10000 },
    openingHours: '08:00 - 15:30 (Senin tutup)',
    facilities: ['Toilet', 'Parkir', 'Mushola', 'Cafe'],
    googleMapsUrl: 'https://goo.gl/maps/vredeburg',
  },

  // ===== MONUMENTS (3) =====
  {
    id: 'tugu-yogya',
    name_id: 'Tugu Yogyakarta',
    name_en: 'Yogyakarta Monument',
    description_id: 'Tugu bersejarah yang menjadi simbol kota Yogyakarta dan bagian dari Sumbu Filosofi yang menghubungkan Keraton, Tugu, dan Panggung Krapyak.',
    description_en: 'A historical monument symbolizing Yogyakarta city and part of the Philosophical Axis connecting the Palace, Tugu, and Panggung Krapyak.',
    category: 'monument',
    coordinates: { lat: -7.782778, lng: 110.367222 },
    address_id: 'Jl. Jenderal Sudirman, Gowongan, Jetis',
    address_en: 'Jl. Jenderal Sudirman, Gowongan, Jetis',
    googleMapsUrl: 'https://goo.gl/maps/tugu',
  },
  {
    id: 'panggung-krapyak',
    name_id: 'Panggung Krapyak',
    name_en: 'Panggung Krapyak',
    description_id: 'Bangunan bersejarah di ujung selatan Sumbu Filosofi, dulunya digunakan sebagai tempat pertemuan Sultan dengan rakyat.',
    description_en: 'A historical building at the southern end of the Philosophical Axis, formerly used as a meeting place between the Sultan and the people.',
    category: 'monument',
    coordinates: { lat: -7.873333, lng: 110.369722 },
    address_id: 'Panggungharjo, Sewon, Bantul',
    address_en: 'Panggungharjo, Sewon, Bantul',
    googleMapsUrl: 'https://goo.gl/maps/krapyak',
  },
  {
    id: 'monumen-jogja-kembali',
    name_id: 'Monumen Jogja Kembali (Monjali)',
    name_en: 'Yogyakarta Kembali Monument',
    description_id: 'Museum dan monumen peringatan perjuangan kemerdekaan Indonesia di Yogyakarta.',
    description_en: 'Museum and memorial monument commemorating the Indonesian independence struggle in Yogyakarta.',
    category: 'monument',
    coordinates: { lat: -7.749167, lng: 110.368056 },
    address_id: 'Jl. Ring Road Utara, Jongkang, Sariharjo, Ngaglik, Sleman',
    address_en: 'Jl. Ring Road Utara, Jongkang, Sariharjo, Ngaglik, Sleman',
    entryFee: { local: 10000 },
    openingHours: '08:00 - 16:00',
    googleMapsUrl: 'https://goo.gl/maps/monjali',
  },

  // ===== TOURISM (4) =====
  {
    id: 'malioboro',
    name_id: 'Jalan Malioboro',
    name_en: 'Malioboro Street',
    description_id: 'Jalan legendaris di jantung kota Yogyakarta, pusat perbelanjaan dan wisata budaya.',
    description_en: 'Legendary street in the heart of Yogyakarta, shopping and cultural tourism center.',
    category: 'tourism',
    subcategory: 'shopping',
    coordinates: { lat: -7.792778, lng: 110.365278 },
    address_id: 'Jl. Malioboro, Sosromenduran, Gedong Tengen',
    address_en: 'Jl. Malioboro, Sosromenduran, Gedong Tengen',
    openingHours: '24 jam',
    facilities: ['Toilet Umum', 'Parkir', 'ATM', 'Food Court'],
    googleMapsUrl: 'https://goo.gl/maps/malioboro',
  },
  {
    id: 'alun-alun-kidul',
    name_id: 'Alun-alun Kidul',
    name_en: 'South Square',
    description_id: 'Lapangan terbuka di selatan Keraton, terkenal dengan tradisi masangin dan wisata malam.',
    description_en: 'Open square south of the Palace, famous for the masangin tradition and night tourism.',
    category: 'tourism',
    subcategory: 'park',
    coordinates: { lat: -7.812500, lng: 110.363611 },
    address_id: 'Patehan, Kraton',
    address_en: 'Patehan, Kraton',
    openingHours: '24 jam',
    facilities: ['Parkir', 'Toilet', 'Warung Makan'],
    googleMapsUrl: 'https://goo.gl/maps/alunalunkidul',
  },
  {
    id: 'pantai-parangtritis',
    name_id: 'Pantai Parangtritis',
    name_en: 'Parangtritis Beach',
    description_id: 'Pantai terkenal di selatan Yogyakarta dengan pemandangan indah dan nilai mistis dalam kepercayaan Jawa.',
    description_en: 'Famous beach in southern Yogyakarta with beautiful views and mystical value in Javanese belief.',
    category: 'tourism',
    subcategory: 'beach',
    coordinates: { lat: -8.025000, lng: 110.330833 },
    address_id: 'Parangtritis, Kretek, Bantul',
    address_en: 'Parangtritis, Kretek, Bantul',
    entryFee: { local: 10000 },
    openingHours: '24 jam',
    facilities: ['Toilet', 'Parkir', 'Warung Makan', 'Penyewaan ATV'],
    googleMapsUrl: 'https://goo.gl/maps/parangtritis',
  },
  {
    id: 'kaliurang',
    name_id: 'Wisata Kaliurang',
    name_en: 'Kaliurang Tourism',
    description_id: 'Kawasan wisata pegunungan di lereng Merapi dengan udara sejuk dan pemandangan alam.',
    description_en: 'Mountain tourism area on the slopes of Mount Merapi with cool air and natural scenery.',
    category: 'tourism',
    subcategory: 'nature',
    coordinates: { lat: -7.601667, lng: 110.423056 },
    address_id: 'Hargobinangun, Pakem, Sleman',
    address_en: 'Hargobinangun, Pakem, Sleman',
    openingHours: '24 jam',
    facilities: ['Toilet', 'Parkir', 'Hotel', 'Restaurant'],
    googleMapsUrl: 'https://goo.gl/maps/kaliurang',
  },

  // ===== UMKM (5) =====
  {
    id: 'batik-winotosastro',
    name_id: 'Batik Winotosastro',
    name_en: 'Batik Winotosastro',
    description_id: 'Pengrajin batik tulis tradisional dengan kualitas tinggi, warisan turun temurun.',
    description_en: 'Traditional hand-drawn batik craftsman with high quality, passed down through generations.',
    category: 'umkm',
    subcategory: 'batik',
    coordinates: { lat: -7.805833, lng: 110.361111 },
    address_id: 'Jl. Taman Siswa, Wirogunan, Mergangsan',
    address_en: 'Jl. Taman Siswa, Wirogunan, Mergangsan',
    products: ['Batik Tulis', 'Batik Cap', 'Kain Jarik', 'Kemeja Batik'],
    priceRange: 'Rp 150.000 - Rp 2.500.000',
    openingHours: '09:00 - 17:00',
    contact: {
      phone: '+62 274 123456',
      whatsapp: '+62 812 3456 7890',
      email: 'info@batikwino.com',
    },
    socialMedia: {
      instagram: '@batikwinotosastro',
      facebook: 'batikwinotosastro',
    },
    googleMapsUrl: 'https://goo.gl/maps/batikwino',
  },
  {
    id: 'kerajinan-perak-kotagede',
    name_id: 'Kerajinan Perak Kotagede',
    name_en: 'Kotagede Silver Craft',
    description_id: 'Sentra kerajinan perak dengan desain tradisional dan modern berkualitas tinggi.',
    description_en: 'Silver craft center with high-quality traditional and modern designs.',
    category: 'umkm',
    subcategory: 'silver',
    coordinates: { lat: -7.827778, lng: 110.398056 },
    address_id: 'Jl. Mondorakan, Prenggan, Kotagede',
    address_en: 'Jl. Mondorakan, Prenggan, Kotagede',
    products: ['Perhiasan Perak', 'Miniatur', 'Souvenir', 'Aksesoris'],
    priceRange: 'Rp 50.000 - Rp 5.000.000',
    openingHours: '08:00 - 17:00',
    contact: {
      phone: '+62 274 234567',
      whatsapp: '+62 813 4567 8901',
    },
    socialMedia: {
      instagram: '@perakkotagede',
    },
    googleMapsUrl: 'https://goo.gl/maps/perakkotagede',
  },
  {
    id: 'wayang-kulit-pak-tomo',
    name_id: 'Wayang Kulit Pak Tomo',
    name_en: "Pak Tomo's Shadow Puppets",
    description_id: 'Pengrajin wayang kulit dengan keahlian tinggi, melayani pesanan custom dan souvenir.',
    description_en: 'Shadow puppet craftsman with high expertise, serving custom orders and souvenirs.',
    category: 'umkm',
    subcategory: 'wayang',
    coordinates: { lat: -7.795000, lng: 110.370000 },
    address_id: 'Jl. Parangtritis Km 4.5, Brontokusuman, Mergangsan',
    address_en: 'Jl. Parangtritis Km 4.5, Brontokusuman, Mergangsan',
    products: ['Wayang Kulit', 'Wayang Golek', 'Miniatur Wayang', 'Gunungan'],
    priceRange: 'Rp 200.000 - Rp 5.000.000',
    openingHours: '09:00 - 16:00',
    contact: {
      phone: '+62 274 345678',
      whatsapp: '+62 814 5678 9012',
    },
    googleMapsUrl: 'https://goo.gl/maps/wayangpaktomo',
  },
  {
    id: 'keris-empu-joko',
    name_id: 'Keris Empu Joko',
    name_en: "Empu Joko's Keris",
    description_id: 'Pandai besi pembuat keris pusaka dengan teknik tradisional Jawa.',
    description_en: 'Blacksmith making heirloom keris with traditional Javanese techniques.',
    category: 'umkm',
    subcategory: 'keris',
    coordinates: { lat: -7.798333, lng: 110.368333 },
    address_id: 'Jl. Ngadisuryan, Ngupasan, Gondomanan',
    address_en: 'Jl. Ngadisuryan, Ngupasan, Gondomanan',
    products: ['Keris Luk 5', 'Keris Luk 9', 'Keris Luk 13', 'Keris Pamor'],
    priceRange: 'Rp 3.000.000 - Rp 50.000.000',
    openingHours: 'By appointment',
    contact: {
      phone: '+62 274 456789',
      whatsapp: '+62 815 6789 0123',
    },
    googleMapsUrl: 'https://goo.gl/maps/kerisempujoko',
  },
  {
    id: 'gerabah-kasongan',
    name_id: 'Sentra Gerabah Kasongan',
    name_en: 'Kasongan Pottery Center',
    description_id: 'Kampung kerajinan gerabah dan keramik dengan berbagai produk berkualitas.',
    description_en: 'Pottery and ceramics craft village with various quality products.',
    category: 'umkm',
    subcategory: 'pottery',
    coordinates: { lat: -7.839722, lng: 110.345833 },
    address_id: 'Kasongan, Bangunjiwo, Kasihan, Bantul',
    address_en: 'Kasongan, Bangunjiwo, Kasihan, Bantul',
    products: ['Vas Bunga', 'Guci', 'Patung', 'Peralatan Rumah Tangga'],
    priceRange: 'Rp 20.000 - Rp 2.000.000',
    openingHours: '08:00 - 17:00',
    contact: {
      phone: '+62 274 567890',
    },
    socialMedia: {
      instagram: '@gerabahkasongan',
      facebook: 'gerabahkasongan',
    },
    googleMapsUrl: 'https://goo.gl/maps/kasongan',
  },

  // ===== CULINARY (2) =====
  {
    id: 'gudeg-yu-djum',
    name_id: 'Gudeg Yu Djum',
    name_en: 'Gudeg Yu Djum',
    description_id: 'Rumah makan gudeg legendaris dengan cita rasa autentik khas Yogyakarta.',
    description_en: 'Legendary gudeg restaurant with authentic Yogyakarta taste.',
    category: 'culinary',
    coordinates: { lat: -7.801944, lng: 110.362778 },
    address_id: 'Jl. Kemetiran Kidul No.34, Pringgokusuman, Gedongtengen',
    address_en: 'Jl. Kemetiran Kidul No.34, Pringgokusuman, Gedongtengen',
    openingHours: '24 jam',
    priceRange: 'Rp 15.000 - Rp 50.000',
    contact: {
      phone: '+62 274 515235',
    },
    facilities: ['Parkir', 'Toilet', 'Takeaway'],
    googleMapsUrl: 'https://goo.gl/maps/gudegyudjum',
  },
  {
    id: 'bakpia-pathok-25',
    name_id: 'Bakpia Pathok 25',
    name_en: 'Bakpia Pathok 25',
    description_id: 'Toko bakpia terkenal dengan berbagai varian rasa dan kualitas terjaga.',
    description_en: 'Famous bakpia shop with various flavors and maintained quality.',
    category: 'culinary',
    coordinates: { lat: -7.782222, lng: 110.368889 },
    address_id: 'Jl. K.H. Ali Maksum, Keparakan, Mergangsan',
    address_en: 'Jl. K.H. Ali Maksum, Keparakan, Mergangsan',
    openingHours: '08:00 - 20:00',
    priceRange: 'Rp 20.000 - Rp 100.000',
    contact: {
      phone: '+62 274 414222',
    },
    facilities: ['Parkir', 'Toilet'],
    googleMapsUrl: 'https://goo.gl/maps/bakpiapathok25',
  },

  // ===== RELIGIOUS SITES (2) =====
  {
    id: 'masjid-gedhe-kauman',
    name_id: 'Masjid Gedhe Kauman',
    name_en: 'Great Mosque of Kauman',
    description_id: 'Masjid bersejarah peninggalan Sultan Hamengku Buwono I yang masih aktif hingga kini.',
    description_en: 'Historical mosque from Sultan Hamengku Buwono I era, still active today.',
    category: 'religious',
    subcategory: 'mosque',
    coordinates: { lat: -7.805556, lng: 110.363889 },
    address_id: 'Jl. Kauman No.4, Ngupasan, Gondomanan',
    address_en: 'Jl. Kauman No.4, Ngupasan, Gondomanan',
    openingHours: 'Waktu sholat (open for prayer times)',
    facilities: ['Tempat Wudhu', 'Parkir', 'Toilet'],
    googleMapsUrl: 'https://goo.gl/maps/masjidgedhe',
  },
  {
    id: 'gereja-santo-fransiskus-xaverius',
    name_id: 'Gereja Santo Fransiskus Xaverius',
    name_en: 'Saint Francis Xavier Church',
    description_id: 'Gereja Katolik bersejarah dengan arsitektur khas di pusat kota Yogyakarta.',
    description_en: 'Historical Catholic church with distinctive architecture in downtown Yogyakarta.',
    category: 'religious',
    subcategory: 'church',
    coordinates: { lat: -7.792500, lng: 110.363056 },
    address_id: 'Jl. Senopati No.5-7, Cokrodiningratan, Jetis',
    address_en: 'Jl. Senopati No.5-7, Cokrodiningratan, Jetis',
    openingHours: 'Minggu 06:00, 08:00, 17:00 (Mass schedules)',
    facilities: ['Parkir', 'Toilet'],
    googleMapsUrl: 'https://goo.gl/maps/gerejasantoxaverius',
  },
];

// Category metadata
export const categoryMetadata = {
  heritage: {
    icon: 'Landmark',
    color: '#D4AF37', // Gold
    label_id: 'Warisan Budaya',
    label_en: 'Cultural Heritage',
  },
  monument: {
    icon: 'Mountain',
    color: '#3D2817', // Brown
    label_id: 'Monumen',
    label_en: 'Monument',
  },
  religious: {
    icon: 'Building',
    color: '#2D5A3D', // Green
    label_id: 'Tempat Ibadah',
    label_en: 'Religious Site',
  },
  tourism: {
    icon: 'MapPin',
    color: '#4A90E2', // Blue
    label_id: 'Wisata',
    label_en: 'Tourism',
  },
  umkm: {
    icon: 'Store',
    color: '#C85A3E', // Terracotta
    label_id: 'UMKM',
    label_en: 'MSME',
  },
  culinary: {
    icon: 'UtensilsCrossed',
    color: '#E67E22', // Orange
    label_id: 'Kuliner',
    label_en: 'Culinary',
  },
  attraction: {
    icon: 'Sparkles',
    color: '#9B59B6', // Purple
    label_id: 'Atraksi',
    label_en: 'Attraction',
  },
} as const;
