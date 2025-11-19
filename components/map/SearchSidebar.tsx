'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, MapPin } from 'lucide-react';
import { categoryMetadata, type SiteLocation } from '@/lib/data/mapLocations';
import Image from 'next/image';

interface SearchSidebarProps {
  locations: SiteLocation[];
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: SiteLocation) => void;
}

export function SearchSidebar({ locations, isOpen, onClose, onLocationSelect }: SearchSidebarProps) {
  const locale = useLocale();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset collapsed state when sidebar opens
  useEffect(() => {
    if (isOpen) {
      setIsCollapsed(false);
    }
  }, [isOpen]);

  // Filter locations based on search query
  const searchResults = searchQuery.trim() === ''
    ? []
    : locations.filter((location) => {
        const query = searchQuery.toLowerCase();
        const name = locale === 'id' ? location.name_id.toLowerCase() : location.name_en.toLowerCase();
        const description = locale === 'id' ? location.description_id.toLowerCase() : location.description_en.toLowerCase();
        const address = locale === 'id' ? location.address_id.toLowerCase() : location.address_en.toLowerCase();

        return name.includes(query) || description.includes(query) || address.includes(query);
      });

  const handleLocationClick = (location: SiteLocation) => {
    onLocationSelect(location);
    onClose();
  };

  if (!isOpen) return null;

  const categoryColor = (category: string) => categoryMetadata[category as keyof typeof categoryMetadata]?.color || '#gray';

  return (
    <>
      {/* Overlay - only show when sidebar is open and NOT collapsed */}
      {isOpen && !isCollapsed && (
        <div
          className="absolute inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Collapsed State - Small Button */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute
            bottom-4 left-1/2 -translate-x-1/2
            lg:top-1/2 lg:left-4 lg:bottom-auto lg:translate-x-0 lg:-translate-y-1/2
            z-50 p-3 rounded-lg shadow-lg transition-all duration-200
            bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Show Search"
        >
          <ChevronUp className="w-5 h-5 lg:hidden" />
          <ChevronRight className="w-5 h-5 hidden lg:block" />
        </button>
      )}

      {/* Sidebar */}
      {!isCollapsed && (
        <div
          className={`absolute
            bottom-0 left-0 right-0
            lg:top-0 lg:bottom-0 lg:left-0 lg:right-auto
            bg-background border-border shadow-2xl z-50
            transition-transform duration-300 ease-in-out
            rounded-t-2xl lg:rounded-t-none lg:rounded-r-2xl
            h-[65vh] lg:h-full
            w-full lg:w-96 xl:w-[28rem]
            ${isOpen
              ? 'translate-y-0 lg:translate-x-0'
              : 'translate-y-full lg:translate-y-0 lg:-translate-x-full'
            }
            border-t lg:border-t-0 lg:border-r`}
        >
          {/* Mobile Handle Bar - Top Center */}
          <div className="lg:hidden flex justify-center pt-3 pb-2">
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              title="Hide"
            />
          </div>

          {/* Desktop Toggle & Close Buttons */}
          <div className="hidden lg:flex absolute top-4 right-2 gap-2 z-50">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-background hover:bg-accent transition-colors shadow-md"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 rounded-lg bg-background hover:bg-accent transition-colors shadow-md"
              title="Collapse"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="h-full overflow-y-auto">
            {/* Search Header */}
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold mb-3">
                {locale === 'id' ? 'Cari Lokasi' : 'Search Location'}
              </h2>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={locale === 'id' ? 'Masukkan kata kunci...' : 'Enter keyword...'}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="p-4">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    {locale === 'id' ? 'Masukkan kata kunci untuk mencari lokasi' : 'Enter keyword to search locations'}
                  </p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    {locale === 'id' ? 'Tidak ada hasil ditemukan' : 'No results found'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground mb-3">
                    {locale === 'id' ? `${searchResults.length} lokasi ditemukan` : `${searchResults.length} locations found`}
                  </p>
                  {searchResults.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationClick(location)}
                      className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {location.images && location.images.length > 0 ? (
                            <Image
                              src={location.images[0]}
                              alt={locale === 'id' ? location.name_id : location.name_en}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          {/* Category Badge */}
                          <div
                            className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold text-white mb-1"
                            style={{ backgroundColor: categoryColor(location.category) }}
                          >
                            {locale === 'id'
                              ? categoryMetadata[location.category].label_id
                              : categoryMetadata[location.category].label_en}
                          </div>

                          {/* Name */}
                          <h3 className="font-semibold text-sm mb-1 truncate">
                            {locale === 'id' ? location.name_id : location.name_en}
                          </h3>

                          {/* Address */}
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {locale === 'id' ? location.address_id : location.address_en}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
