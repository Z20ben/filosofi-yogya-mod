'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { Compass, MapPin, ExternalLink, ChevronLeft, ChevronRight, Navigation, Clock, Camera, Heart } from 'lucide-react';
import { mockWisataData } from '@/lib/admin/mock-data/wisata';

// ISR Configuration - uncomment when migrating to database
// export const revalidate = 300; // Cache 5 minutes
// NOTE: ISR (revalidate) akan diimplementasikan saat migrasi ke database
// menggunakan Server Component + Client Component hybrid approach

export default function WisataPage() {
  const t = useTranslations('wisata');
  const locale = useLocale();

  // Filter only published data
  const destinations = mockWisataData.filter(w => w.status === 'published').map(w => ({
    id: w.id,
    slug: w.slug,
    name_id: w.name_id,
    name_en: w.name_en,
    description_id: w.description_id,
    description_en: w.description_en,
    category: w.category,
    facilities_id: w.facilities_id || [],
    facilities_en: w.facilities_en || [],
    image: w.featured_image,
    lat: w.coordinates?.lat || 0,
    lng: w.coordinates?.lng || 0,
  }));

  // Category mapping for translations
  const categoryMap: Record<string, string> = {
    'Alam': 'nature',
    'Budaya': 'cultural',
    'Kuliner': 'culinary',
    'Petualangan': 'adventure',
    'Religi': 'religious',
    'Belanja': 'shopping',
    'Sejarah': 'historical',
    'Lainnya': 'other',
  };

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get unique categories from destinations
  const categories = ['all', ...new Set(destinations.map(d => d.category))];

  // Filter destinations by category
  const filteredDestinations = selectedCategory === 'all'
    ? destinations
    : destinations.filter(dest => dest.category === selectedCategory);

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
                {category === 'all' ? t('filter.all') : t(`filter.${categoryMap[category] || 'other'}`)}
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
                      {t(`filter.${categoryMap[destination.category] || 'other'}`)}
                    </span>
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
