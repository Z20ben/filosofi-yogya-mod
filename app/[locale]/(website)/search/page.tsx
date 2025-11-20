'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Filter, Image as ImageIcon, MapPin, Book, Store, Calendar, Camera, X, ShoppingBag, Phone, Instagram, Facebook, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import { useTranslations as useTranslationsIntl } from 'next-intl';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { searchAllData, getAllSearchTypes, getSearchCategoryLabel } from '@/lib/search';
import type { SearchResult, SearchResultType } from '@/lib/search';

// Render card based on type
function SearchResultCard({ result, locale, getTypeIcon }: {
  result: SearchResult;
  locale: 'id' | 'en';
  getTypeIcon: (type: SearchResultType) => React.ReactNode;
}) {
  // Helper to check if thumbnail is valid (not mock path)
  const hasValidThumbnail = (thumbnail?: string) => {
    if (!thumbnail) return false;
    if (thumbnail.startsWith('/mock/')) return false;
    return true;
  };

  // UMKM Card Style
  if (result.type === 'umkm' && result.umkmData) {
    const products = locale === 'id' ? result.umkmData.products_id : result.umkmData.products_en;
    const priceRange = locale === 'id' ? result.umkmData.price_range_id : result.umkmData.price_range_en;
    const location = locale === 'id' ? result.umkmData.location_id : result.umkmData.location_en;

    return (
      <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full flex flex-col">
        <div className="relative">
          <div className="aspect-video overflow-hidden bg-muted">
            {hasValidThumbnail(result.thumbnail) ? (
              <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full relative bg-gradient-to-br from-[var(--javanese-gold)]/20 to-[var(--javanese-gold)]/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Store className="w-16 h-16 text-[var(--javanese-gold)]/40 opacity-50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            )}
          </div>
          {/* Category Badge - Top Right - UMKM Gold */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--javanese-gold)] dark:bg-amber-700/80 text-[#4A2C2A] dark:text-amber-100 rounded-full text-xs font-medium shadow-lg">
              <Store className="w-4 h-4" />
              {result.category}
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--javanese-gold)] dark:bg-amber-700/60"></div>
          {/* Price Range Badge - Bottom Left */}
          {priceRange && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
              <ShoppingBag className="w-4 h-4 text-[var(--javanese-gold)]" />
              <span className="text-white text-sm font-semibold">{priceRange}</span>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-[var(--javanese-brown-text)] font-serif text-xl mb-3">{result.title}</h3>
          <p className="text-[var(--javanese-brown-text)]/70 mb-4 text-sm leading-relaxed line-clamp-2 flex-1">{result.excerpt}</p>
          {location && (
            <div className="flex items-center gap-2 text-sm text-[var(--javanese-brown-text)]/60 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
          {products && products.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {products.slice(0, 3).map((product, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded">{product}</span>
              ))}
              {products.length > 3 && <span className="text-xs px-2 py-1 text-[var(--javanese-brown-text)]/50">+{products.length - 3}</span>}
            </div>
          )}

          {/* Social Media Icons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {result.umkmData.contact?.phone && (
              <a
                href={`https://wa.me/${result.umkmData.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            )}
            {result.umkmData.social_media?.facebook && (
              <a
                href={`https://facebook.com/${result.umkmData.social_media.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            )}
            {result.umkmData.social_media?.instagram && (
              <a
                href={`https://instagram.com/${result.umkmData.social_media.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.title + ' Yogyakarta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[var(--javanese-gold)] text-[#4A2C2A] rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <Navigation className="w-4 h-4" />
            </a>
            <Link
              href={result.url}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Wisata Card Style
  if (result.type === 'wisata' && result.wisataData) {
    const facilities = locale === 'id' ? result.wisataData.facilities_id : result.wisataData.facilities_en;

    return (
      <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {hasValidThumbnail(result.thumbnail) ? (
            <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
              <MapPin className="w-12 h-12 text-emerald-500/40" />
            </div>
          )}
          {/* Category Badge - Top Right - Wisata Emerald */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500 dark:bg-emerald-700/80 text-white dark:text-emerald-100 rounded-full text-xs font-medium shadow-lg">
              <MapPin className="w-4 h-4" />
              {result.category}
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 dark:bg-emerald-700/60"></div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-[var(--javanese-brown-text)] mb-2 line-clamp-2 group-hover:text-[var(--javanese-gold)] transition-colors">{result.title}</h3>
          <p className="text-sm text-[var(--javanese-brown-text)]/70 line-clamp-2 mb-3 flex-1">{result.excerpt}</p>
          {facilities && facilities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {facilities.slice(0, 4).map((facility, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded">{facility}</span>
              ))}
              {facilities.length > 4 && <span className="text-xs px-2 py-1 text-[var(--javanese-brown-text)]/50">+{facilities.length - 4}</span>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.title + ' Yogyakarta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[var(--javanese-gold)] text-[#4A2C2A] rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <Navigation className="w-4 h-4" />
            </a>
            <Link
              href={result.url}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Agenda Card Style
  if (result.type === 'agenda' && result.agendaData) {
    const formatDate = (date?: Date) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
      <Link href={result.url} className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {hasValidThumbnail(result.thumbnail) ? (
            <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--javanese-terracotta)]/20 to-[var(--javanese-brown-bg)]/20">
              <Calendar className="w-12 h-12 text-[var(--javanese-terracotta)]/40" />
            </div>
          )}
          {/* Category Badge - Top Right - Agenda Terracotta */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--javanese-terracotta)] dark:bg-orange-800/80 text-white dark:text-orange-100 rounded-full text-xs font-medium shadow-lg">
              <Calendar className="w-4 h-4" />
              {result.category}
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--javanese-terracotta)] dark:bg-orange-800/60"></div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-[var(--javanese-brown-text)] mb-2 line-clamp-2 group-hover:text-[var(--javanese-gold)] transition-colors">{result.title}</h3>
          <p className="text-sm text-[var(--javanese-brown-text)]/70 line-clamp-2 mb-3 flex-1">{result.excerpt}</p>
          <div className="space-y-2 text-sm text-[var(--javanese-brown-text)]/60">
            {result.agendaData.date_start && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(result.agendaData.date_start)}</span>
              </div>
            )}
            {result.agendaData.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{result.agendaData.location}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Galeri Card Style
  if (result.type === 'galeri') {
    return (
      <Link href={result.url} className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {hasValidThumbnail(result.thumbnail) ? (
            <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-purple-500/20">
              <Camera className="w-12 h-12 text-violet-500/40" />
            </div>
          )}
          {/* Category Badge - Top Right - Galeri Violet */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500 dark:bg-violet-700/80 text-white dark:text-violet-100 rounded-full text-xs font-medium shadow-lg">
              <Camera className="w-4 h-4" />
              {result.category}
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500 dark:bg-violet-700/60"></div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-[var(--javanese-brown-text)] mb-2 line-clamp-2 group-hover:text-[var(--javanese-gold)] transition-colors">{result.title}</h3>
          {result.galeriData?.tags && result.galeriData.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {result.galeriData.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Default Card Style (kawasan, sejarah, lokasi)
  return (
    <Link href={result.url} className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full">
      <div className="aspect-video relative overflow-hidden bg-muted">
        {hasValidThumbnail(result.thumbnail) ? (
          <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--javanese-brown-bg)]/20 to-[var(--javanese-terracotta)]/20">
            <ImageIcon className="w-12 h-12 text-[var(--javanese-brown-bg)]/40" />
          </div>
        )}
        {/* Category Badge - Top Right - Default Brown */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--javanese-brown-bg)] dark:bg-stone-700/80 text-white dark:text-stone-100 rounded-full text-xs font-medium shadow-lg">
            {getTypeIcon(result.type)}
            {getSearchCategoryLabel(result.type, locale)}
          </span>
        </div>
        {/* Type indicator line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--javanese-brown-bg)] dark:bg-stone-700/60"></div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-[var(--javanese-brown-text)] mb-2 line-clamp-2 group-hover:text-[var(--javanese-gold)] transition-colors">{result.title}</h3>
        <p className="text-sm text-[var(--javanese-brown-text)]/70 line-clamp-3">{result.excerpt}</p>
        {result.category && (
          <div className="mt-3">
            <span className="text-xs px-2 py-1 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded">{result.category}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const locale = useLocale() as 'id' | 'en';
  const t = useTranslations('search');
  const tPagination = useTranslations('pagination');

  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedType, setSelectedType] = useState<SearchResultType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allTypes = getAllSearchTypes();

  // Search when query changes
  useEffect(() => {
    if (query) {
      const searchResults = searchAllData(query, { locale, limit: 100 });
      setResults(searchResults);
      setSelectedType('all');
      setCurrentPage(1);
    } else {
      setResults([]);
    }
  }, [query, locale]);

  // Filter results when type changes
  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(r => r.type === selectedType));
    }
    setCurrentPage(1);
  }, [selectedType, results]);

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, startIndex + itemsPerPage);

  // Get count per type
  const getTypeCount = (type: SearchResultType) => {
    return results.filter(r => r.type === type).length;
  };

  // Get icon for type
  const getTypeIcon = (type: SearchResultType) => {
    const icons: Record<SearchResultType, React.ReactNode> = {
      kawasan: <MapPin className="w-4 h-4" />,
      wisata: <MapPin className="w-4 h-4" />,
      umkm: <Store className="w-4 h-4" />,
      sejarah: <Book className="w-4 h-4" />,
      agenda: <Calendar className="w-4 h-4" />,
      galeri: <Camera className="w-4 h-4" />,
      lokasi: <MapPin className="w-4 h-4" />,
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--javanese-gold)]/20 backdrop-blur-sm rounded-full mb-4 border border-[var(--javanese-gold)]/30">
            <Search className="w-5 h-5 text-[var(--javanese-gold)]" />
            <span className="text-[var(--javanese-gold)]">{t('title')}</span>
          </div>

          {query && (
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              {t('subtitle')} &quot;{query}&quot;
            </h1>
          )}

          <p className="text-[var(--javanese-ivory)]/80">
            {filteredResults.length} {t('results')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        {results.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-[var(--javanese-brown-text)]">
                <Filter className="w-5 h-5" />
                <span className="font-medium">{t('filterAll')}:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg transition-all font-medium ${
                    selectedType === 'all'
                      ? 'bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] shadow-md'
                      : 'bg-card text-[var(--javanese-brown-text)] hover:bg-[var(--javanese-gold)]/10 border border-[var(--javanese-brown-text)]/20'
                  }`}
                >
                  {t('filterAll')} ({results.length})
                </button>

                {allTypes.map((type) => {
                  const count = getTypeCount(type);
                  if (count === 0) return null;

                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2 ${
                        selectedType === type
                          ? 'bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] shadow-md'
                          : 'bg-card text-[var(--javanese-brown-text)] hover:bg-[var(--javanese-gold)]/10 border border-[var(--javanese-brown-text)]/20'
                      }`}
                    >
                      {getTypeIcon(type)}
                      {getSearchCategoryLabel(type, locale)} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {paginatedResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedResults.map((result, index) => (
                <FadeInSection key={`${result.type}-${result.id}`} delay={index * 50} direction="up">
                  <SearchResultCard result={result} locale={locale} getTypeIcon={getTypeIcon} />
                </FadeInSection>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed bg-muted'
                      : 'bg-card hover:bg-[var(--javanese-gold)]/20 text-[var(--javanese-brown-text)]'
                  }`}
                >
                  {tPagination('previous')}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      currentPage === page
                        ? 'bg-[var(--javanese-gold)] text-[#4A2C2A] shadow-lg font-semibold'
                        : 'bg-card text-[var(--javanese-brown-text)] hover:bg-[var(--javanese-gold)]/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed bg-muted'
                      : 'bg-card hover:bg-[var(--javanese-gold)]/20 text-[var(--javanese-brown-text)]'
                  }`}
                >
                  {tPagination('next')}
                </button>
              </div>
            )}
          </>
        ) : query ? (
          /* No Results */
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-[var(--javanese-brown-text)]/30 mb-4" />
            <h2 className="font-serif text-2xl text-[var(--javanese-brown-text)] mb-2">
              {t('noResults')}
            </h2>
            <p className="text-[var(--javanese-brown-text)]/60">
              {t('noResultsDesc')}
            </p>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-[var(--javanese-brown-text)]/30 mb-4" />
            <h2 className="font-serif text-2xl text-[var(--javanese-brown-text)]">
              {t('placeholder')}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-[var(--javanese-brown-text)]/20 border-t-[var(--javanese-brown-bg)] rounded-full animate-spin"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
