'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Filter, Image as ImageIcon, MapPin, Book, Store, Calendar, Camera, X } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { searchAllData, getAllSearchTypes, getSearchCategoryLabel } from '@/lib/search';
import type { SearchResult, SearchResultType } from '@/lib/search';

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
                  <Link
                    href={result.url}
                    className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      {result.thumbnail ? (
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--javanese-brown-bg)]/20 to-[var(--javanese-terracotta)]/20">
                          <ImageIcon className="w-12 h-12 text-[var(--javanese-brown-text)]/30" />
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-[var(--javanese-gold)]/90 text-[#4A2C2A] rounded-full text-xs font-medium flex items-center gap-1">
                          {getTypeIcon(result.type)}
                          {getSearchCategoryLabel(result.type, locale)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-serif text-lg font-semibold text-[var(--javanese-brown-text)] mb-2 line-clamp-2 group-hover:text-[var(--javanese-gold)] transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-sm text-[var(--javanese-brown-text)]/70 line-clamp-3">
                        {result.excerpt}
                      </p>
                      {result.category && (
                        <div className="mt-3">
                          <span className="text-xs px-2 py-1 bg-[var(--javanese-gold)]/10 text-[var(--javanese-brown-text)] rounded">
                            {result.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
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
