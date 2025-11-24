'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { getSearchSuggestions } from '@/lib/search';

interface HeroSearchProps {
  placeholder?: string;
}

export function HeroSearch({ placeholder }: HeroSearchProps) {
  const router = useRouter();
  const locale = useLocale() as 'id' | 'en';
  const t = useTranslations('search');

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions when query changes
  useEffect(() => {
    if (query.length >= 2) {
      const results = getSearchSuggestions(query, locale, 5);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [query, locale]);

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

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

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
          handleSearch(query);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[var(--javanese-brown-text)]/50" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder || t('placeholder')}
          className="w-full pl-12 pr-12 py-4 bg-white/95 dark:bg-[#241c1a]/95 backdrop-blur-sm rounded-xl text-[var(--javanese-brown-text)] placeholder:text-[var(--javanese-brown-text)]/50 border border-[var(--javanese-gold)]/30 focus:border-[var(--javanese-gold)] focus:ring-2 focus:ring-[var(--javanese-gold)]/20 outline-none transition-all shadow-lg"
          aria-label={t('ariaLabel')}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={showSuggestions}
        />

        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute inset-y-0 right-12 flex items-center pr-2 text-[var(--javanese-brown-text)]/50 hover:text-[var(--javanese-brown-text)]"
            aria-label={t('clear')}
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <button
          type="submit"
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--javanese-gold)] hover:text-[var(--javanese-brown-text)] transition-colors"
          aria-label={t('submit')}
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id="search-suggestions"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#241c1a] rounded-xl shadow-xl border border-[var(--javanese-gold)]/20 overflow-hidden z-[100]"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                index === selectedIndex
                  ? 'bg-[var(--javanese-gold)]/20 text-[var(--javanese-brown-text)]'
                  : 'text-[var(--javanese-brown-text)] hover:bg-[var(--javanese-gold)]/10'
              }`}
            >
              <Search className="h-4 w-4 text-[var(--javanese-brown-text)]/50 flex-shrink-0" />
              <span className="truncate">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
