'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Search, MapPin, Book, Store, Calendar, Camera, ExternalLink, Navigation, Coffee } from 'lucide-react';
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
  if (result.type === 'umkm') {
    const products = result.umkmData ? (locale === 'id' ? result.umkmData.products_id : result.umkmData.products_en) : undefined;
    const location = result.umkmData ? (locale === 'id' ? result.umkmData.location_id : result.umkmData.location_en) : undefined;

    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full flex flex-col border border-amber-200 dark:border-slate-700">
        <div className="relative">
          <div className="aspect-video overflow-hidden bg-amber-50 dark:bg-slate-800">
            {hasValidThumbnail(result.thumbnail) ? (
              <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full relative bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Store className="w-16 h-16 text-amber-400 dark:text-amber-600 opacity-50" />
                </div>
              </div>
            )}
          </div>
          {/* Category Badge - Top Right - UMKM Gold */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-semibold shadow-lg">
              <Store className="w-3.5 h-3.5" />
              UMKM
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-stone-800 dark:text-white font-serif text-xl mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{result.title}</h3>
          <p className="text-stone-600 dark:text-slate-400 mb-4 text-sm leading-relaxed line-clamp-2 flex-1">{result.excerpt}</p>
          {location && (
            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-slate-500 mb-3">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
          {products && products.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {products.slice(0, 3).map((product, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">{product}</span>
              ))}
              {products.length > 3 && <span className="text-xs px-2 py-1 text-stone-400">+{products.length - 3}</span>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.title + ' Yogyakarta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 text-[#4A2C2A] rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <Navigation className="w-4 h-4" />
            </a>
            <Link
              href={result.url}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-stone-700 to-orange-600 text-white rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Wisata Card Style
  if (result.type === 'wisata') {
    const facilities = result.wisataData ? (locale === 'id' ? result.wisataData.facilities_id : result.wisataData.facilities_en) : undefined;

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
          <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">{result.title}</h3>
          <p className="text-sm text-stone-600 dark:text-slate-400 line-clamp-2 mb-3 flex-1">{result.excerpt}</p>
          {facilities && facilities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {facilities.slice(0, 4).map((facility, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-amber-500/10 dark:bg-amber-500/20 text-stone-700 dark:text-amber-200 rounded">{facility}</span>
              ))}
              {facilities.length > 4 && <span className="text-xs px-2 py-1 text-stone-500 dark:text-slate-500">+{facilities.length - 4}</span>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.title + ' Yogyakarta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 text-[#4A2C2A] rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <Navigation className="w-4 h-4" />
            </a>
            <Link
              href={result.url}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-stone-700 to-orange-600 text-white rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Agenda Card Style
  if (result.type === 'agenda') {
    return (
      <Link href={result.url} className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {hasValidThumbnail(result.thumbnail) ? (
            <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-600/20 to-stone-700/20">
              <Calendar className="w-12 h-12 text-orange-600/40" />
            </div>
          )}
          {/* Category Badge - Top Right - Agenda Terracotta */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-600 dark:bg-orange-800/80 text-white dark:text-orange-100 rounded-full text-xs font-medium shadow-lg">
              <Calendar className="w-4 h-4" />
              {result.category}
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 dark:bg-orange-800/60"></div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">{result.title}</h3>
          <p className="text-sm text-stone-600 dark:text-slate-400 line-clamp-2 mb-3 flex-1">{result.excerpt}</p>
          <div className="space-y-2 text-sm text-stone-500 dark:text-slate-500">
            {result.agendaData?.time_start && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{result.agendaData.time_start}{result.agendaData.time_end ? ` - ${result.agendaData.time_end}` : ''}</span>
              </div>
            )}
            {result.agendaData?.location && (
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

  // Nongkrong Card Style
  if (result.type === 'nongkrong') {
    const location = result.umkmData ? (locale === 'id' ? result.umkmData.location_id : result.umkmData.location_en) : undefined;

    return (
      <Link href={result.url} className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {hasValidThumbnail(result.thumbnail) ? (
            <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-amber-600/20">
              <Coffee className="w-12 h-12 text-orange-500/40" />
            </div>
          )}
          {/* Category Badge - Top Right - Nongkrong Orange */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-medium shadow-lg">
              <Coffee className="w-4 h-4" />
              {result.category}
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">{result.title}</h3>
          <p className="text-sm text-stone-600 dark:text-slate-400 line-clamp-2 mb-3 flex-1">{result.excerpt}</p>
          {location && (
            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-slate-500">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Galeri Card Style
  if (result.type === 'galeri') {
    return (
      <Link href={result.url} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full border border-stone-200 dark:border-slate-700">
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
              {result.category || (locale === 'id' ? 'Galeri' : 'Gallery')}
            </span>
          </div>
          {/* Type indicator line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500 dark:bg-violet-700/60"></div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">{result.title}</h3>
          <p className="text-sm text-stone-600 dark:text-slate-400 line-clamp-2">{result.excerpt}</p>
        </div>
      </Link>
    );
  }

  // Default Card Style (kawasan, sejarah, lokasi)
  // Type-specific gradient colors
  const typeGradients: Record<SearchResultType, string> = {
    sejarah: 'from-indigo-500/20 to-purple-600/20',
    kawasan: 'from-cyan-500/20 to-blue-600/20',
    lokasi: 'from-green-500/20 to-emerald-600/20',
    wisata: 'from-emerald-500/20 to-teal-600/20',
    umkm: 'from-amber-500/20 to-orange-600/20',
    agenda: 'from-rose-500/20 to-pink-600/20',
    galeri: 'from-violet-500/20 to-purple-600/20',
    nongkrong: 'from-orange-500/20 to-amber-600/20',
  };

  const typeBadgeColors: Record<SearchResultType, string> = {
    sejarah: 'bg-indigo-600 dark:bg-indigo-700/80',
    kawasan: 'bg-cyan-600 dark:bg-cyan-700/80',
    lokasi: 'bg-green-600 dark:bg-green-700/80',
    wisata: 'bg-emerald-600 dark:bg-emerald-700/80',
    umkm: 'bg-amber-600 dark:bg-amber-700/80',
    agenda: 'bg-rose-600 dark:bg-rose-700/80',
    galeri: 'bg-violet-600 dark:bg-violet-700/80',
    nongkrong: 'bg-orange-500 dark:bg-orange-600/80',
  };

  const typeLineColors: Record<SearchResultType, string> = {
    sejarah: 'bg-indigo-600 dark:bg-indigo-700/60',
    kawasan: 'bg-cyan-600 dark:bg-cyan-700/60',
    lokasi: 'bg-green-600 dark:bg-green-700/60',
    wisata: 'bg-emerald-600 dark:bg-emerald-700/60',
    umkm: 'bg-amber-600 dark:bg-amber-700/60',
    agenda: 'bg-rose-600 dark:bg-rose-700/60',
    galeri: 'bg-violet-600 dark:bg-violet-700/60',
    nongkrong: 'bg-orange-500 dark:bg-orange-600/60',
  };

  return (
    <Link href={result.url} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group block h-full border border-stone-200 dark:border-slate-700">
      <div className="aspect-video relative overflow-hidden bg-muted">
        {hasValidThumbnail(result.thumbnail) ? (
          <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${typeGradients[result.type]}`}>
            {result.type === 'sejarah' ? <Book className="w-12 h-12 text-indigo-600/40" /> : <MapPin className="w-12 h-12 text-stone-600/40" />}
          </div>
        )}
        {/* Category Badge - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center gap-2 px-3 py-1 ${typeBadgeColors[result.type]} text-white rounded-full text-xs font-medium shadow-lg`}>
            {getTypeIcon(result.type)}
            {getSearchCategoryLabel(result.type, locale)}
          </span>
        </div>
        {/* Type indicator line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${typeLineColors[result.type]}`}></div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-stone-800 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">{result.title}</h3>
        <p className="text-sm text-stone-600 dark:text-slate-400 line-clamp-3">{result.excerpt}</p>
        {result.category && (
          <div className="mt-3">
            <span className="text-xs px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">{result.category}</span>
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
      nongkrong: <Coffee className="w-4 h-4" />,
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 pt-20">
      {/* Simple Header */}
      <div className="border-b border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {query ? (
                <>
                  <h1 className="font-serif text-2xl md:text-3xl text-stone-800 dark:text-white">
                    {t('subtitle')} <span className="text-amber-600 dark:text-amber-500">&quot;{query}&quot;</span>
                  </h1>
                  <p className="text-stone-500 dark:text-slate-400 mt-1">
                    {filteredResults.length} {t('results')}
                  </p>
                </>
              ) : (
                <h1 className="font-serif text-2xl md:text-3xl text-stone-800 dark:text-white">
                  {t('title')}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        {results.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-stone-800 dark:bg-white text-white dark:text-stone-900'
                    : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700'
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      selectedType === type
                        ? 'bg-stone-800 dark:bg-white text-white dark:text-stone-900'
                        : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700'
                    }`}
                  >
                    {getTypeIcon(type)}
                    {getSearchCategoryLabel(type, locale)} ({count})
                  </button>
                );
              })}
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
              <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'opacity-40 cursor-not-allowed text-stone-400'
                        : 'text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tPagination('previous')}
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-stone-800 dark:bg-white text-white dark:text-stone-900'
                          : 'text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'opacity-40 cursor-not-allowed text-stone-400'
                        : 'text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tPagination('next')}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : query ? (
          /* No Results */
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-stone-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="font-serif text-xl text-stone-800 dark:text-white mb-2">
              {t('noResults')}
            </h2>
            <p className="text-stone-500 dark:text-slate-400 text-sm">
              {t('noResultsDesc')}
            </p>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-stone-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="font-serif text-xl text-stone-800 dark:text-white mb-2">
              {t('placeholder')}
            </h2>
            <p className="text-stone-500 dark:text-slate-400 text-sm max-w-md mx-auto">
              {locale === 'id'
                ? 'Gunakan kolom pencarian untuk menemukan destinasi, UMKM, artikel, dan agenda di Yogyakarta'
                : 'Use the search bar to find destinations, local businesses, articles, and events in Yogyakarta'}
            </p>
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
        <div className="inline-block w-12 h-12 border-4 border-stone-800/20 border-t-stone-700 rounded-full animate-spin"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
