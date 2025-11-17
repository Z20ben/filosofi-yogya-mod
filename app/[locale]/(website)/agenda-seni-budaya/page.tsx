'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock, Sparkles, Image } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';

// ISR Configuration - uncomment when migrating to database
// export const revalidate = 300; // Cache 5 minutes
// NOTE: ISR (revalidate) akan diimplementasikan saat migrasi ke database
// menggunakan Server Component + Client Component hybrid approach

// Sample events data - will be replaced with actual API/database data later
const sampleEvents = [
  {
    id: '1',
    title_id: 'Festival Wayang Kulit Yogyakarta',
    title_en: 'Yogyakarta Shadow Puppet Festival',
    description_id: 'Festival wayang kulit yang menampilkan dalang-dalang terbaik dari seluruh Jawa. Nikmati pertunjukan wayang dengan cerita klasik Ramayana dan Mahabharata, diiringi gamelan tradisional.',
    description_en: 'Shadow puppet festival featuring the best puppeteers from across Java. Enjoy wayang performances with classic Ramayana and Mahabharata stories, accompanied by traditional gamelan.',
    date: '2024-12-15T19:00:00',
    location: 'Keraton Yogyakarta',
    category_id: 'Pertunjukan',
    category_en: 'Performance',
    image_url: undefined,
  },
  {
    id: '2',
    title_id: 'Pameran Batik Nusantara',
    title_en: 'Indonesian Batik Exhibition',
    description_id: 'Pameran batik dari berbagai daerah di Indonesia dengan workshop membatik untuk umum. Dapatkan kesempatan belajar langsung dari pengrajin batik berpengalaman.',
    description_en: 'Batik exhibition from various regions in Indonesia with public batik-making workshops. Get the opportunity to learn directly from experienced batik craftsmen.',
    date: '2024-12-20T09:00:00',
    location: 'Museum Batik Yogyakarta',
    category_id: 'Pameran',
    category_en: 'Exhibition',
    image_url: undefined,
  },
  {
    id: '3',
    title_id: 'Pasar Seni & Kuliner Tradisional',
    title_en: 'Traditional Art & Culinary Market',
    description_id: 'Pasar mingguan yang menampilkan produk seni dan kuliner khas Yogyakarta. Temukan kerajinan tangan unik dan makanan tradisional yang lezat.',
    description_en: 'Weekly market featuring traditional Yogyakarta art and culinary products. Discover unique handicrafts and delicious traditional foods.',
    date: '2024-12-22T10:00:00',
    location: 'Alun-alun Selatan',
    category_id: 'Pasar',
    category_en: 'Market',
    image_url: undefined,
  },
];

export default function AgendaPage() {
  const t = useTranslations('agenda');
  const locale = useLocale();
  const filterSectionRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldScroll, setShouldScroll] = useState(false);
  const itemsPerPage = 9;

  // Get unique categories based on locale
  const categories = ['all', ...new Set(sampleEvents.map(e =>
    locale === 'id' ? e.category_id : e.category_en
  ))];

  // Filter events by category
  const filteredEvents = selectedCategory === 'all'
    ? sampleEvents
    : sampleEvents.filter(e =>
        (locale === 'id' ? e.category_id : e.category_en) === selectedCategory
      );

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  // Scroll to filter section after page changes
  useEffect(() => {
    if (shouldScroll && filterSectionRef.current) {
      const headerOffset = 80;
      const elementPosition = filterSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setShouldScroll(false);
    }
  }, [currentPage, shouldScroll]);

  // Handle page change with scroll
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShouldScroll(true);
  };

  // Scroll to events section when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when filter changes
    setTimeout(() => {
      const eventsSection = document.querySelector('.events-list');
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', options);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale === 'id' ? 'id-ID' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateBadge = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        month: 'short'
      }).toUpperCase(),
      day: date.getDate()
    };
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
            <Calendar className="w-5 h-5 text-[var(--javanese-gold)]" />
            <span className="text-[var(--javanese-gold)]">
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
                {sampleEvents.length}
              </p>
              <p className="text-[var(--javanese-ivory)]/80 text-sm">
                {t('stats.upcomingEvents')}
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

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Sample Data Notice */}
        <FadeInSection>
          <div className="mb-8 bg-gradient-to-r from-javanese-gold/10 to-javanese-gold/5 border border-javanese-gold/30 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[var(--javanese-gold)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[var(--javanese-brown-text)]">
                {t('sampleNotice')}
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Category Filter */}
        <FadeInSection delay={100}>
          <div ref={filterSectionRef} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--javanese-brown-text)] font-serif">
                {t('filter.label')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-[var(--javanese-brown-bg)] text-[var(--javanese-ivory)] shadow-md'
                      : 'bg-card text-[var(--javanese-brown-text)] hover:bg-javanese-gold/10 border border-[var(--javanese-brown-text)]/20'
                  }`}
                >
                  {category === 'all' ? t('filter.all') : category}
                </button>
              ))}
            </div>
            <p className="text-javanese-brown-70 text-sm mt-3">
              {t('filter.showing')} <span className="font-semibold">{filteredEvents.length}</span> {t('filter.of')} <span className="font-semibold">{sampleEvents.length}</span> {t('filter.events')}
            </p>
          </div>
        </FadeInSection>

        {/* Events List */}
        <div className="space-y-6 events-list">
          {currentEvents.map((event, index) => (
            <FadeInSection key={event.id} delay={200 + index * 100}>
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Section */}
                  <div className="lg:col-span-1">
                    <div className="aspect-video lg:aspect-square relative overflow-hidden">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={locale === 'id' ? event.title_id : event.title_en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted dark:bg-gradient-to-br dark:from-[var(--javanese-brown-bg)] dark:to-[var(--javanese-terracotta)] group-hover:scale-110 transition-transform duration-500">
                          <Image className="w-16 h-16 text-muted-foreground dark:text-[var(--javanese-brown-text)]" />
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-javanese-gold-90 text-javanese-brown rounded-full text-sm shadow-lg font-medium">
                          {locale === 'id' ? event.category_id : event.category_en}
                        </span>
                      </div>

                      {/* Date Badge */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="bg-white/95 dark:bg-[#241c1a]/95 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg min-w-[60px]">
                          <p className="text-[var(--javanese-brown-text)] dark:text-white text-xs font-medium">
                            {formatDateBadge(event.date).month}
                          </p>
                          <p className="text-[var(--javanese-brown-text)] dark:text-white text-2xl leading-none font-serif font-bold">
                            {formatDateBadge(event.date).day}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-2 p-6 lg:py-6 lg:pr-8">
                    <h2 className="text-[var(--javanese-brown-text)] mb-3 font-serif text-2xl">
                      {locale === 'id' ? event.title_id : event.title_en}
                    </h2>

                    <p className="text-javanese-brown-70 leading-relaxed mb-6">
                      {locale === 'id' ? event.description_id : event.description_en}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-javanese-gold/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                        </div>
                        <div>
                          <p className="text-javanese-brown-70 text-sm">{t('card.date')}</p>
                          <p className="text-[var(--javanese-brown-text)] font-medium">{formatDate(event.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-javanese-gold/20 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                        </div>
                        <div>
                          <p className="text-javanese-brown-70 text-sm">{t('card.time')}</p>
                          <p className="text-[var(--javanese-brown-text)] font-medium">{formatTime(event.date)} WIB</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 md:col-span-2">
                        <div className="w-10 h-10 rounded-lg bg-javanese-gold/20 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[var(--javanese-brown-text)]" />
                        </div>
                        <div>
                          <p className="text-javanese-brown-70 text-sm">{t('card.location')}</p>
                          <p className="text-[var(--javanese-brown-text)] font-medium">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => {
                const newPage = Math.max(1, currentPage - 1);
                if (newPage !== currentPage) handlePageChange(newPage);
              }}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed bg-muted'
                  : 'bg-card hover:bg-javanese-gold-20 text-[var(--javanese-brown-text)]'
              }`}
            >
              {t('pagination.previous')}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-[var(--javanese-gold)] text-[#4A2C2A] shadow-lg font-semibold'
                    : 'bg-card text-[var(--javanese-brown-text)] hover:bg-javanese-gold-20'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => {
                const newPage = Math.min(totalPages, currentPage + 1);
                if (newPage !== currentPage) handlePageChange(newPage);
              }}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed bg-muted'
                  : 'bg-card hover:bg-javanese-gold-20 text-[var(--javanese-brown-text)]'
              }`}
            >
              {t('pagination.next')}
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="batik-pattern py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
              <h2 className="text-[var(--javanese-brown-text)] mb-4 font-serif text-3xl">
                {t('cta.title')}
              </h2>
              <p className="text-javanese-brown-70 mb-6 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <a
                href="mailto:info@filosofiyogya.id"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] dark:from-[var(--javanese-gold)] dark:to-[var(--javanese-gold)] dark:text-javanese-brown rounded-lg hover:opacity-90 transition-all shadow-lg"
              >
                {t('cta.button')}
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
