'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { Search, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSearchSuggestions } from '@/lib/search';

// Lazy load AgendaCarousel to reduce initial bundle
const AgendaCarousel = dynamic(
  () => import('./AgendaCarousel').then((mod) => mod.AgendaCarousel),
  { loading: () => <div className="h-[420px] md:h-[380px] bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl animate-pulse" /> }
);

export function SearchHero() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions when query changes
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = getSearchSuggestions(searchQuery, locale as 'id' | 'en', 5);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [searchQuery, locale]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    } else {
      router.push(`/${locale}/encyclopedia`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSearch(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearQuery = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Background Pattern - simplified for performance */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-300 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 py-12 md:py-20 pt-24 md:pt-20">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full mb-4 md:mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
              <span className="text-xs md:text-sm">Sumbu Filosofi Yogyakarta</span>
            </div>

            <h1 className="text-base font-normal mb-3 md:mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-cyan-600 bg-clip-text text-transparent">
              {t('title') || 'Jelajah Jogja Versimu'}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 mb-6 md:mb-8 text-base md:text-lg px-4">
              {t('subtitle') || 'Temukan spot nongkrong, UMKM lokal, dan tren terbaru di kawasan Sumbu Filosofi Yogyakarta'}
            </p>

            {/* Search Bar - Responsive */}
            <div className="relative max-w-3xl mx-auto mb-8 md:mb-12">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
                <div className="flex items-center flex-1">
                  <div className="pl-4 md:pl-6 pr-3 md:pr-4 py-4 sm:py-0">
                    <Search className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onFocus={() => searchQuery.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder={t('placeholder') || 'Cari cafe, UMKM, atau destinasi...'}
                    className="flex-1 py-4 md:py-5 pr-4 bg-transparent outline-none text-base md:text-lg placeholder:text-slate-400"
                    aria-label="Search"
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                    aria-expanded={showSuggestions}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearQuery}
                      className="px-3 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <Button
                  onClick={() => handleSearch()}
                  size="lg"
                  className="m-2 px-6 md:px-8 py-3 md:py-0 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm md:text-base"
                >
                  {t('search') || 'Cari'}
                </Button>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  id="search-suggestions"
                  role="listbox"
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50 animate-slide-down"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      role="option"
                      aria-selected={index === selectedIndex}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full px-4 md:px-6 py-3 text-left flex items-center gap-3 transition-colors ${
                        index === selectedIndex
                          ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="truncate text-sm md:text-base">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Agenda Carousel */}
          <div>
            <AgendaCarousel />
          </div>
        </div>
      </div>

    </section>
  );
}
