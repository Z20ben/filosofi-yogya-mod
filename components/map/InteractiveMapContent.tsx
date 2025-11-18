'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { mapLocations, categoryMetadata, type SiteCategory } from '@/lib/data/mapLocations';

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMap = dynamic(
  () => import('./LeafletMap').then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }
);

export function InteractiveMapContent() {
  const locale = useLocale();
  const t = useTranslations('interactiveMap');
  const [selectedCategory, setSelectedCategory] = useState<SiteCategory | 'all'>('all');

  // Filter locations based on selected category
  const filteredLocations = useMemo(() => {
    if (selectedCategory === 'all') {
      return mapLocations;
    }
    return mapLocations.filter((loc) => loc.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Filters */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('filters.title')}</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-card text-card-foreground hover:bg-accent'
            }`}
          >
            {t('categories.all')} ({mapLocations.length})
          </button>
          {(Object.keys(categoryMetadata) as SiteCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'text-white shadow-md'
                  : 'bg-card text-card-foreground hover:bg-accent'
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? categoryMetadata[category].color
                    : undefined,
              }}
            >
              {locale === 'id'
                ? categoryMetadata[category].label_id
                : categoryMetadata[category].label_en}{' '}
              ({mapLocations.filter((loc) => loc.category === category).length})
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4 text-sm text-muted-foreground">
        {t('stats.showing')} <span className="font-semibold">{filteredLocations.length}</span>{' '}
        {t('stats.of')} <span className="font-semibold">{mapLocations.length}</span>{' '}
        {t('stats.totalLocations').toLowerCase()}
      </div>

      {/* Map Container */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-border">
        <LeafletMap locations={filteredLocations} />
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-card rounded-lg border border-border">
        <h3 className="font-semibold mb-3 text-sm">{t('categories.all')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {(Object.keys(categoryMetadata) as SiteCategory[]).map((category) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: categoryMetadata[category].color }}
              />
              <span className="text-xs">
                {locale === 'id'
                  ? categoryMetadata[category].label_id
                  : categoryMetadata[category].label_en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
