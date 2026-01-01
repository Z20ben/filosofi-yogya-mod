'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Filter, Image as ImageIcon, MapPin, Book, Store, Calendar, Camera, ExternalLink, Navigation } from 'lucide-react';
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
          <h3 className="font-serif text-lg font-semibold text-stone-800 mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">{result.title}</h3>
          <p className="text-sm text-stone-800/70 line-clamp-2 mb-3 flex-1">{result.excerpt}</p>
          {facilities && facilities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {facilities.slice(0, 4).map((facility, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-amber-500/10 text-stone-800 rounded">{facility}</span>
              ))}
              {facilities.length > 4 && <span className="text-xs px-2 py-1 text-stone-800/50">+{facilities.length - 4}</span>}
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
  };

  const typeBadgeColors: Record<SearchResultType, string> = {
    sejarah: 'bg-indigo-600 dark:bg-indigo-700/80',
    kawasan: 'bg-cyan-600 dark:bg-cyan-700/80',
    lokasi: 'bg-green-600 dark:bg-green-700/80',
    wisata: 'bg-emerald-600 dark:bg-emerald-700/80',
    umkm: 'bg-amber-600 dark:bg-amber-700/80',
    agenda: 'bg-rose-600 dark:bg-rose-700/80',
    galeri: 'bg-violet-600 dark:bg-violet-700/80',
  };

  const typeLineColors: Record<SearchResultType, string> = {
    sejarah: 'bg-indigo-600 dark:bg-indigo-700/60',
    kawasan: 'bg-cyan-600 dark:bg-cyan-700/60',
    lokasi: 'bg-green-600 dark:bg-green-700/60',
    wisata: 'bg-emerald-600 dark:bg-emerald-700/60',
    umkm: 'bg-amber-600 dark:bg-amber-700/60',
    agenda: 'bg-rose-600 dark:bg-rose-700/60',
    galeri: 'bg-violet-600 dark:bg-violet-700/60',
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
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50/30 dark:from-slate-950 dark:via-stone-950/50 dark:to-amber-950/30 pt-20">
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-amber-400/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-orange-400/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-amber-300/15 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <section className="relative bg-gradient-to-r from-stone-800 via-orange-700 to-stone-800 text-white py-16">
        {/* Batik Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30L30 0z\' fill=\'%23ffffff\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/30 backdrop-blur-sm rounded-full mb-6 border border-amber-400/50 shadow-lg">
            <Search className="w-5 h-5 text-amber-300" />
            <span className="text-amber-200 font-medium">{t('title')}</span>
          </div>

          {query && (
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {t('subtitle')} <span className="text-amber-400">&quot;{query}&quot;</span>
            </h1>
          )}

          <p className="text-amber-100 text-lg">
            <span className="font-semibold text-amber-300">{filteredResults.length}</span> {t('results')}
          </p>
        </div>
      </section>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        {results.length > 0 && (
          <div className="mb-10">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800/30 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-stone-800 dark:text-white text-lg">
                  {locale === 'id' ? 'Filter Hasil' : 'Filter Results'}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-5 py-2.5 rounded-xl transition-all font-medium shadow-sm ${
                    selectedType === 'all'
                      ? 'bg-gradient-to-r from-stone-700 to-stone-800 text-white shadow-lg ring-2 ring-amber-400'
                      : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 border border-stone-300 dark:border-slate-600'
                  }`}
                >
                  {t('filterAll')} <span className="ml-1 opacity-70">({results.length})</span>
                </button>

                {allTypes.map((type) => {
                  const count = getTypeCount(type);
                  if (count === 0) return null;

                  // Type-specific colors
                  const typeColors: Record<SearchResultType, string> = {
                    sejarah: 'from-indigo-500 to-purple-600',
                    wisata: 'from-emerald-500 to-teal-600',
                    umkm: 'from-amber-500 to-orange-600',
                    agenda: 'from-rose-500 to-pink-600',
                    galeri: 'from-violet-500 to-purple-600',
                    kawasan: 'from-cyan-500 to-blue-600',
                    lokasi: 'from-green-500 to-emerald-600',
                  };

                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-5 py-2.5 rounded-xl transition-all font-medium flex items-center gap-2 shadow-sm ${
                        selectedType === type
                          ? `bg-gradient-to-r ${typeColors[type]} text-white shadow-lg ring-2 ring-white/50`
                          : 'bg-white dark:bg-slate-800 text-stone-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 border border-stone-300 dark:border-slate-600'
                      }`}
                    >
                      {getTypeIcon(type)}
                      {getSearchCategoryLabel(type, locale)} <span className="opacity-70">({count})</span>
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
              <div className="mt-12 flex justify-center">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 dark:border-slate-700 p-2 flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-5 py-2.5 rounded-xl transition-all font-medium ${
                      currentPage === 1
                        ? 'opacity-40 cursor-not-allowed text-slate-400'
                        : 'text-stone-700 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tPagination('previous')}
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-11 h-11 rounded-xl transition-all font-medium ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                          : 'text-stone-700 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-5 py-2.5 rounded-xl transition-all font-medium ${
                      currentPage === totalPages
                        ? 'opacity-40 cursor-not-allowed text-slate-400'
                        : 'text-stone-700 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-700'
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
          <div className="text-center py-20">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200 dark:border-slate-700 p-12 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                <Search className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="font-serif text-2xl text-stone-800 dark:text-white mb-3">
                {t('noResults')}
              </h2>
              <p className="text-stone-600 dark:text-slate-400">
                {t('noResultsDesc')}
              </p>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200 dark:border-slate-700 p-12 max-w-lg mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40 flex items-center justify-center">
                <Search className="w-12 h-12 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="font-serif text-2xl text-stone-800 dark:text-white mb-3">
                {t('placeholder')}
              </h2>
              <p className="text-stone-600 dark:text-slate-400">
                {locale === 'id'
                  ? 'Gunakan kolom pencarian di atas untuk menemukan destinasi, UMKM, artikel, dan agenda menarik di Yogyakarta'
                  : 'Use the search bar above to find destinations, local businesses, articles, and events in Yogyakarta'}
              </p>
            </div>
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
