'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { Compass, MapPin, Star, ExternalLink, ChevronLeft, ChevronRight, Navigation, Clock, Camera, Heart } from 'lucide-react';

// ISR Configuration - uncomment when migrating to database
// export const revalidate = 300; // Cache 5 minutes
// NOTE: ISR (revalidate) akan diimplementasikan saat migrasi ke database
// menggunakan Server Component + Client Component hybrid approach

export default function WisataPage() {
  const t = useTranslations('wisata');
  const locale = useLocale();

  // Sample destinations data - database-ready structure
  const destinations = [
    {
      id: 'parangtritis',
      name_id: 'Pantai Parangtritis',
      name_en: 'Parangtritis Beach',
      description_id: 'Pantai legendaris dengan pemandangan sunset spektakuler, pasir hitam vulkanik, dan tradisi Labuhan. Tempat sempurna untuk menikmati olahraga air dan wisata budaya.',
      description_en: 'Legendary beach with spectacular sunsets, volcanic black sand, and Labuhan tradition. Perfect place to enjoy water sports and cultural tourism.',
      category_id: 'nature',
      category_en: 'nature',
      facilities_id: ['Parkir', 'Toilet', 'Warung Makan', 'Penginapan'],
      facilities_en: ['Parking', 'Restrooms', 'Food Stalls', 'Accommodation'],
      image: 'https://images.unsplash.com/photo-1655793488799-1ffba5b22cbd?w=800&q=80',
      rating: 4.7,
      lat: -8.024917,
      lng: 110.329285,
    },
    {
      id: 'alunAlunKidul',
      name_id: 'Alun-Alun Kidul',
      name_en: 'South Square',
      description_id: 'Lapangan terbuka dengan pohon beringin kembar yang ikonik. Terkenal dengan tradisi "Masangin" - berjalan dengan mata tertutup melewati dua pohon beringin. Area kuliner malam yang ramai.',
      description_en: 'Open square with iconic twin banyan trees. Famous for "Masangin" tradition - walking blindfolded between two banyan trees. Bustling night culinary area.',
      category_id: 'cultural',
      category_en: 'cultural',
      facilities_id: ['Area Parkir', 'Penerangan', 'Food Court', 'Toilet Umum'],
      facilities_en: ['Parking Area', 'Lighting', 'Food Court', 'Public Restrooms'],
      image: 'https://images.unsplash.com/photo-1721747994983-96d23e197487?w=800&q=80',
      rating: 4.5,
      lat: -7.811389,
      lng: 110.364444,
    },
    {
      id: 'kraton',
      name_id: 'Keraton Yogyakarta',
      name_en: 'Yogyakarta Palace',
      description_id: 'Istana Sultan yang masih berfungsi hingga kini. Kunjungi museum, saksikan pertunjukan tari dan gamelan, dan pelajari arsitektur Jawa tradisional yang megah.',
      description_en: "The Sultan's palace still in use today. Visit museums, watch dance and gamelan performances, and learn about magnificent traditional Javanese architecture.",
      category_id: 'historical',
      category_en: 'historical',
      facilities_id: ['Museum', 'Guide', 'Gift Shop', 'Audio Tour'],
      facilities_en: ['Museum', 'Guide', 'Gift Shop', 'Audio Tour'],
      image: '/assets/e68ea45479378a6003bae5ab6b785184768f6914.png',
      rating: 4.8,
      lat: -7.805278,
      lng: 110.364444,
    },
    {
      id: 'malioboro',
      name_id: 'Malioboro',
      name_en: 'Malioboro Street',
      description_id: 'Jantung wisata belanja Yogyakarta. Jalanan ikonik dengan batik, kerajinan tangan, kuliner khas, dan pertunjukan jalanan. Pengalaman berbelanja yang tak terlupakan.',
      description_en: 'The heart of Yogyakarta shopping tourism. Iconic street with batik, handicrafts, local cuisine, and street performances. An unforgettable shopping experience.',
      category_id: 'shopping',
      category_en: 'shopping',
      facilities_id: ['Toko', 'ATM', 'Hotel', 'Restoran'],
      facilities_en: ['Shops', 'ATM', 'Hotels', 'Restaurants'],
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
      rating: 4.6,
      lat: -7.792778,
      lng: 110.365278,
    },
    {
      id: 'tugu',
      name_id: 'Tugu Yogyakarta',
      name_en: 'Yogyakarta Monument',
      description_id: 'Monumen ikonik yang menjadi landmark kota. Simbol perlawanan rakyat Yogyakarta. Area publik yang indah untuk foto dan bersantai.',
      description_en: "Iconic monument that serves as the city's landmark. Symbol of Yogyakarta people's resistance. Beautiful public area for photos and relaxation.",
      category_id: 'historical',
      category_en: 'historical',
      facilities_id: ['Taman', 'Spot Foto', 'Penerangan', 'Akses Mudah'],
      facilities_en: ['Park', 'Photo Spots', 'Lighting', 'Easy Access'],
      image: '/assets/9f169dd83a8981e7aedcf8dbab93b79692f0d10d.png',
      rating: 4.4,
      lat: -7.783056,
      lng: 110.366667,
    },
    {
      id: 'bentengVredeburg',
      name_id: 'Museum Benteng Vredeburg',
      name_en: 'Fort Vredeburg Museum',
      description_id: 'Benteng bersejarah yang kini menjadi museum. Pelajari sejarah perjuangan kemerdekaan Indonesia melalui diorama dan pameran interaktif.',
      description_en: "Historic fort now serving as a museum. Learn about Indonesia's independence struggle through dioramas and interactive exhibitions.",
      category_id: 'historical',
      category_en: 'historical',
      facilities_id: ['Museum', 'Perpustakaan', 'Auditorium', 'Kantin'],
      facilities_en: ['Museum', 'Library', 'Auditorium', 'Canteen'],
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
      rating: 4.5,
      lat: -7.799167,
      lng: 110.365833,
    },
    {
      id: 'tamanSari',
      name_id: 'Taman Sari',
      name_en: 'Taman Sari Water Castle',
      description_id: 'Kompleks taman air bekas istana Sultan. Arsitektur unik perpaduan Jawa dan Eropa. Kolam pemandian, terowongan bawah tanah, dan Sumur Gumuling yang misterius.',
      description_en: "Former Sultan's water palace complex. Unique architecture blending Javanese and European styles. Bathing pools, underground tunnels, and the mysterious Sumur Gumuling.",
      category_id: 'historical',
      category_en: 'historical',
      facilities_id: ['Guide', 'Toilet', 'Spot Foto', 'Parkir'],
      facilities_en: ['Guide', 'Restrooms', 'Photo Spots', 'Parking'],
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
      rating: 4.6,
      lat: -7.810278,
      lng: 110.359444,
    },
    {
      id: 'prambanan',
      name_id: 'Candi Prambanan',
      name_en: 'Prambanan Temple',
      description_id: 'Kompleks candi Hindu terbesar di Indonesia. Warisan Dunia UNESCO dengan relief cerita Ramayana yang memukau. Pertunjukan Ramayana Ballet setiap malam.',
      description_en: 'The largest Hindu temple complex in Indonesia. UNESCO World Heritage Site with stunning Ramayana reliefs. Ramayana Ballet performances every night.',
      category_id: 'religious',
      category_en: 'religious',
      facilities_id: ['Museum', 'Guide', 'Restoran', 'Teater'],
      facilities_en: ['Museum', 'Guide', 'Restaurant', 'Theater'],
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      rating: 4.9,
      lat: -7.752056,
      lng: 110.491389,
    },
    {
      id: 'kaliurang',
      name_id: 'Kaliurang',
      name_en: 'Kaliurang',
      description_id: 'Kawasan wisata pegunungan yang sejuk di lereng Gunung Merapi. Udara segar, pemandangan alam, dan berbagai aktivitas outdoor seperti hiking dan camping.',
      description_en: "Cool mountain resort area on Mount Merapi's slopes. Fresh air, natural scenery, and various outdoor activities like hiking and camping.",
      category_id: 'nature',
      category_en: 'nature',
      facilities_id: ['Hotel', 'Restoran', 'Jalur Hiking', 'Area Camping'],
      facilities_en: ['Hotels', 'Restaurants', 'Hiking Trails', 'Camping Areas'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      rating: 4.5,
      lat: -7.599167,
      lng: 110.416667,
    },
  ];

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get unique categories from destinations
  const categories = ['all', ...new Set(destinations.map(d => d.category_id))];

  // Filter destinations by category
  const filteredDestinations = selectedCategory === 'all'
    ? destinations
    : destinations.filter(dest => dest.category_id === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex);

  // Handle category change - reset to page 1
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
            <Compass className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
            <span className="text-[var(--javanese-gold)] dark:text-white">
              {t('badge')}
            </span>
          </div>

          <h1 className="font-serif text-5xl">
            {t('title')}
          </h1>

          <p className="text-[var(--javanese-ivory)]/90 text-xl mt-4 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-6 justify-center">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
              <p className="text-[var(--javanese-gold)] text-3xl font-serif">
                {destinations.length}+
              </p>
              <p className="text-[var(--javanese-ivory)]/80 text-sm">
                {t('stats.destinations')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
              <p className="text-[var(--javanese-gold)] text-3xl font-serif">
                {categories.length - 1}
              </p>
              <p className="text-[var(--javanese-ivory)]/80 text-sm">
                {t('stats.categories')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInSection>
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 bg-[var(--javanese-brown-bg)] text-[var(--javanese-ivory)] dark:bg-[var(--javanese-ivory)] dark:text-primary-foreground">
              <div className="flex items-center gap-3">
                <Navigation className="w-6 h-6 text-[var(--javanese-gold)]" />
                <h2 className="font-serif">
                  {t('map.title')}
                </h2>
              </div>
              <p className="opacity-80 mt-2">
                {t('map.subtitle')}
              </p>
            </div>

            <div className="aspect-video bg-muted flex items-center justify-center p-8">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[var(--javanese-brown-text)]/30 mx-auto mb-4" />
                <h3 className="text-[var(--javanese-brown-text)] mb-2 text-xl">
                  {t('map.notConfigured')}
                </h3>
                <p className="text-[var(--javanese-brown-text)] opacity-60 max-w-md">
                  {t('map.notConfiguredDesc')}
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-[var(--javanese-brown-text)] mb-4 font-serif text-4xl">
              {t('section.title')}
            </h2>
            <p className="text-javanese-brown-60 max-w-2xl mx-auto">
              {t('section.description')}
            </p>
          </div>
        </FadeInSection>

        {/* Category Filter */}
        <FadeInSection>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--javanese-gold)] text-[#4A2C2A] shadow-lg'
                    : 'bg-card text-[var(--javanese-brown-text)] hover:bg-[var(--javanese-gold)]/20 border border-[var(--javanese-brown-text)]/20'
                }`}
              >
                {t(`filter.${category}`)}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Results Info */}
        <p className="text-[var(--javanese-brown-text)] opacity-60 text-center mb-8">
          {t('results.showing')} {startIndex + 1}-{Math.min(endIndex, filteredDestinations.length)} {t('results.of')} {filteredDestinations.length} {t('results.results')}
        </p>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDestinations.map((destination, index) => (
            <FadeInSection key={destination.id} delay={index * 100} direction="up">
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group h-full flex flex-col">
                {/* Image */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={locale === 'id' ? destination.name_id : destination.name_en}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 landmark-overlay-gradient"></div>

                  {/* Category Badge - Kanan Atas */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-javanese-gold-90 text-[#4A2C2A] text-sm rounded-full font-medium">
                      {t(`filter.${destination.category_id}`)}
                    </span>
                  </div>

                  {/* Rating - Kiri Bawah */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    <Star className="w-4 h-4 text-[var(--javanese-gold)] fill-[var(--javanese-gold)]" />
                    <span className="text-white text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif">
                    {locale === 'id' ? destination.name_id : destination.name_en}
                  </h3>
                  <p className="text-javanese-brown-70 text-sm leading-relaxed mb-4 flex-1">
                    {locale === 'id' ? destination.description_id : destination.description_en}
                  </p>

                  {/* Facilities */}
                  <div className="border-t border-[var(--javanese-brown-text)]/10 pt-4 mb-4">
                    <p className="text-javanese-brown-60 text-xs mb-2">
                      {t('card.facilities')}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(locale === 'id' ? destination.facilities_id : destination.facilities_en).slice(0, 3).map((facility, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-javanese-gold-10 text-[var(--javanese-brown-text)] rounded"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--javanese-gold)] text-[#4A2C2A] rounded-lg hover:opacity-90 transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{t('card.getDirections')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed bg-card'
                  : 'bg-card hover:bg-[var(--javanese-gold)]/20 text-[var(--javanese-brown-text)]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-[var(--javanese-gold)] text-[#4A2C2A] shadow-lg'
                    : 'bg-card text-[var(--javanese-brown-text)] hover:bg-[var(--javanese-gold)]/20'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed bg-card'
                  : 'bg-card hover:bg-[var(--javanese-gold)]/20 text-[var(--javanese-brown-text)]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>

      {/* Tourism Tips Section */}
      <section className="batik-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tip 1 - Best Time */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif">
                  {t('tips.bestTime.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm">
                  {t('tips.bestTime.description')}
                </p>
              </div>

              {/* Tip 2 - Photo Spots */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif">
                  {t('tips.photoSpots.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm">
                  {t('tips.photoSpots.description')}
                </p>
              </div>

              {/* Tip 3 - Local Culture */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif">
                  {t('tips.localCulture.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm">
                  {t('tips.localCulture.description')}
                </p>
              </div>

              {/* Tip 4 - Accessibility */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif">
                  {t('tips.accessibility.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm">
                  {t('tips.accessibility.description')}
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection direction="up">
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl mt-12">
              <h2 className="text-[var(--javanese-brown-text)] mb-4 font-serif text-3xl">
                {t('cta.title')}
              </h2>
              <p className="text-javanese-brown-70 mb-6 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <a
                href="mailto:info@sumbufilosofi.id"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--javanese-gold)] text-[#1A1412] rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                <span className="font-medium">{t('cta.button')}</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
