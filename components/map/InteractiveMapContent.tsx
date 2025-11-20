'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { mapLocations, type SiteLocation } from '@/lib/data/mapLocations';
import { LocationSidebar } from './LocationSidebar';
import { SearchSidebar } from './SearchSidebar';

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
  const [selectedLocation, setSelectedLocation] = useState<SiteLocation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sidebarKey, setSidebarKey] = useState(0);

  const handleLocationSelect = useCallback((location: SiteLocation) => {
    setSelectedLocation(location);
    setIsSearchOpen(false); // Close search first
    setIsSidebarOpen(true);
    setSidebarKey(prev => prev + 1); // Force sidebar to expand
  }, []);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchOpenChange = (open: boolean) => {
    if (open) {
      setIsSidebarOpen(false); // Close location sidebar when search opens
    }
    setIsSearchOpen(open);
  };

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 py-0 sm:py-12">
      {/* Map Container */}
      <div className="rounded-none sm:rounded-xl shadow-lg border-0 sm:border border-border overflow-hidden relative min-h-[600px]">
        <LeafletMap
          locations={mapLocations}
          onLocationSelect={handleLocationSelect}
          isSearchOpen={isSearchOpen}
          onSearchOpenChange={handleSearchOpenChange}
          selectedLocation={selectedLocation}
          searchSidebar={
            <SearchSidebar
              locations={mapLocations}
              isOpen={isSearchOpen}
              onClose={handleCloseSearch}
              onLocationSelect={handleLocationSelect}
            />
          }
          locationSidebar={
            <LocationSidebar
              location={selectedLocation}
              isOpen={isSidebarOpen}
              onClose={handleCloseSidebar}
              allLocations={mapLocations}
              onLocationSelect={handleLocationSelect}
              key={sidebarKey}
            />
          }
        />
      </div>
    </div>
  );
}
