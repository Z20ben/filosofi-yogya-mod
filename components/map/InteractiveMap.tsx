'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Filter, X, Loader2, Landmark, Mountain, Building, Store, UtensilsCrossed, ShoppingCart, Navigation, Clock, Ticket, Info, Image as ImageIcon, Link2, Search, MapPinned } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { mapLocations, categoryMetadata, type SiteLocation, type SiteCategory } from '@/lib/data/mapLocations';

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMap = dynamic(
  () => import('@/components/map/LeafletMap').then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    )
  }
);

// Extended type for locations with distance
type SiteLocationWithDistance = SiteLocation & { distance?: number };

// Search Sidebar Component
function ModernSearchSidebar({
  locations,
  isOpen,
  onClose,
  onLocationSelect,
}: {
  locations: SiteLocation[];
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: SiteLocation) => void;
}) {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = locations.filter((location) => {
    const name = locale === 'id' ? location.name_id : location.name_en;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 lg:bg-black/30 z-30"
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 bottom-0 w-full lg:w-96 bg-white dark:bg-slate-950 shadow-2xl z-40 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {locale === 'id' ? 'Cari Lokasi' : 'Search Location'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder={locale === 'id' ? 'Ketik nama lokasi...' : 'Type location name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
          />

          {/* Results */}
          <div className="space-y-3">
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-cyan-500"
                  onClick={() => {
                    onLocationSelect(location);
                    onClose();
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-lg overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                          {location.images && location.images.length > 0 ? (
                            <Image
                              src={location.images[0]}
                              alt={locale === 'id' ? location.name_id : location.name_en}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-slate-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {locale === 'id' ? location.name_id : location.name_en}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-xs mt-1"
                          style={{ borderColor: categoryMetadata[location.category].color, color: categoryMetadata[location.category].color }}
                        >
                          {locale === 'id'
                            ? categoryMetadata[location.category].label_id
                            : categoryMetadata[location.category].label_en}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Modern Location Sidebar Component
function ModernLocationSidebar({
  location,
  isOpen,
  onClose,
  allLocations,
  onLocationSelect,
}: {
  location: SiteLocation | null;
  isOpen: boolean;
  onClose: () => void;
  allLocations: SiteLocation[];
  onLocationSelect: (location: SiteLocation) => void;
}) {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'info' | 'media' | 'related'>('info');

  // Reset tab when location changes
  useEffect(() => {
    if (location && isOpen) {
      setActiveTab('info');
    }
  }, [location, isOpen]);

  if (!location || !isOpen) return null;

  const categoryColor = categoryMetadata[location.category].color;
  const categoryLabel = locale === 'id'
    ? categoryMetadata[location.category].label_id
    : categoryMetadata[location.category].label_en;

  const relatedLocations = allLocations.filter(
    (loc) => loc.category === location.category && loc.id !== location.id
  );

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 lg:bg-black/30 z-30"
        onClick={onClose}
      />

      {/* Sidebar - Bottom Sheet on Mobile, Right Sidebar on Desktop */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden absolute bottom-0 left-0 right-0 w-full bg-white dark:bg-slate-950 shadow-2xl z-40 overflow-y-auto max-h-[50%] rounded-t-3xl"
      >
        <div className="relative">
          {/* Handle Bar - Mobile Only */}
          <div className="flex justify-center pt-3 pb-2">
            <button
              onClick={onClose}
              className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-500 transition-colors"
            />
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video overflow-hidden">
            {location.images && location.images.length > 0 ? (
              <Image
                src={location.images[0]}
                alt={locale === 'id' ? location.name_id : location.name_en}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-slate-400" />
              </div>
            )}

            {/* Floating Get Directions Button */}
            <Button
              onClick={handleGetDirections}
              className="absolute bottom-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {locale === 'id' ? 'Petunjuk Arah' : 'Get Directions'}
            </Button>
          </div>

          {/* Header */}
          <div className="p-6">
            <Badge
              className="mb-3 text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryLabel}
            </Badge>
            <h2 className="text-2xl font-semibold mb-2">
              {locale === 'id' ? location.name_id : location.name_en}
            </h2>
            <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{locale === 'id' ? location.address_id : location.address_en}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex px-6">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'info'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Info className="w-4 h-4" />
                {locale === 'id' ? 'Info' : 'Info'}
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'media'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Media
              </button>
              <button
                onClick={() => setActiveTab('related')}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'related'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Link2 className="w-4 h-4" />
                {locale === 'id' ? 'Terkait' : 'Related'}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    {locale === 'id' ? 'Deskripsi' : 'Description'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {locale === 'id' ? location.description_id : location.description_en}
                  </p>
                </div>

                {/* Opening Hours */}
                {location.openingHours && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-500" />
                      {locale === 'id' ? 'Jam Buka' : 'Opening Hours'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{location.openingHours}</p>
                  </div>
                )}

                {/* Entry Fee */}
                {location.entryFee && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-cyan-500" />
                      {locale === 'id' ? 'Harga Tiket' : 'Entry Fee'}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {location.entryFee.local && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">{locale === 'id' ? 'Lokal' : 'Local'}:</span>
                          <span className="font-medium text-green-600">Rp {location.entryFee.local.toLocaleString()}</span>
                        </div>
                      )}
                      {location.entryFee.foreign && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">{locale === 'id' ? 'Asing' : 'Foreign'}:</span>
                          <span className="font-medium text-green-600">Rp {location.entryFee.foreign.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Facilities */}
                {location.facilities && location.facilities.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      {locale === 'id' ? 'Fasilitas' : 'Facilities'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products (for UMKM) */}
                {location.products && location.products.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      {locale === 'id' ? 'Produk' : 'Products'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.products.map((product, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyan-100 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 rounded-full text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                {location.priceRange && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      {locale === 'id' ? 'Kisaran Harga' : 'Price Range'}
                    </h3>
                    <p className="text-sm font-medium text-green-600">{location.priceRange}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-4">
                {location.images && location.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {location.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${locale === 'id' ? location.name_id : location.name_en} ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      {locale === 'id' ? 'Tidak ada media tersedia' : 'No media available'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'related' && (
              <div className="space-y-3">
                {relatedLocations.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Link2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      {locale === 'id' ? 'Tidak ada lokasi terkait' : 'No related locations'}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-500 mb-3">
                      {locale === 'id'
                        ? `${relatedLocations.length} lokasi dengan kategori yang sama`
                        : `${relatedLocations.length} locations in the same category`}
                    </p>
                    {relatedLocations.map((relatedLoc) => (
                      <Card
                        key={relatedLoc.id}
                        className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-cyan-500"
                        onClick={() => onLocationSelect(relatedLoc)}
                      >
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                              {relatedLoc.images && relatedLoc.images.length > 0 ? (
                                <Image
                                  src={relatedLoc.images[0]}
                                  alt={locale === 'id' ? relatedLoc.name_id : relatedLoc.name_en}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <MapPin className="w-6 h-6 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm mb-1 truncate">
                                {locale === 'id' ? relatedLoc.name_id : relatedLoc.name_en}
                              </h3>
                              <p className="text-xs text-slate-500 line-clamp-2">
                                {locale === 'id' ? relatedLoc.address_id : relatedLoc.address_en}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar - Right Side */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="hidden md:block absolute right-0 top-0 bottom-0 w-96 bg-white dark:bg-slate-950 shadow-2xl z-40 overflow-y-auto"
      >
        <div className="relative">
          {/* Handle Bar - Mobile Only */}
          <div className="md:hidden flex justify-center pt-3 pb-2">
            <button
              onClick={onClose}
              className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-500 transition-colors"
            />
          </div>

          {/* Close Button - Desktop Only */}
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image */}
          <div className="relative aspect-video overflow-hidden">
            {location.images && location.images.length > 0 ? (
              <Image
                src={location.images[0]}
                alt={locale === 'id' ? location.name_id : location.name_en}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-slate-400" />
              </div>
            )}

            {/* Floating Get Directions Button */}
            <Button
              onClick={handleGetDirections}
              className="absolute bottom-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {locale === 'id' ? 'Petunjuk Arah' : 'Get Directions'}
            </Button>
          </div>

          {/* Header */}
          <div className="p-6">
            <Badge
              className="mb-3 text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryLabel}
            </Badge>
            <h2 className="text-2xl font-semibold mb-2">
              {locale === 'id' ? location.name_id : location.name_en}
            </h2>
            <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{locale === 'id' ? location.address_id : location.address_en}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex px-6">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'info'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Info className="w-4 h-4" />
                {locale === 'id' ? 'Info' : 'Info'}
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'media'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Media
              </button>
              <button
                onClick={() => setActiveTab('related')}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'related'
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Link2 className="w-4 h-4" />
                {locale === 'id' ? 'Terkait' : 'Related'}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    {locale === 'id' ? 'Deskripsi' : 'Description'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {locale === 'id' ? location.description_id : location.description_en}
                  </p>
                </div>

                {/* Opening Hours */}
                {location.openingHours && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-500" />
                      {locale === 'id' ? 'Jam Buka' : 'Opening Hours'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{location.openingHours}</p>
                  </div>
                )}

                {/* Entry Fee */}
                {location.entryFee && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-cyan-500" />
                      {locale === 'id' ? 'Harga Tiket' : 'Entry Fee'}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {location.entryFee.local && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">{locale === 'id' ? 'Lokal' : 'Local'}:</span>
                          <span className="font-medium text-green-600">Rp {location.entryFee.local.toLocaleString()}</span>
                        </div>
                      )}
                      {location.entryFee.foreign && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">{locale === 'id' ? 'Asing' : 'Foreign'}:</span>
                          <span className="font-medium text-green-600">Rp {location.entryFee.foreign.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Facilities */}
                {location.facilities && location.facilities.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      {locale === 'id' ? 'Fasilitas' : 'Facilities'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products (for UMKM) */}
                {location.products && location.products.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      {locale === 'id' ? 'Produk' : 'Products'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.products.map((product, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyan-100 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 rounded-full text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                {location.priceRange && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      {locale === 'id' ? 'Kisaran Harga' : 'Price Range'}
                    </h3>
                    <p className="text-sm font-medium text-green-600">{location.priceRange}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-4">
                {location.images && location.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {location.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${locale === 'id' ? location.name_id : location.name_en} ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      {locale === 'id' ? 'Tidak ada media tersedia' : 'No media available'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'related' && (
              <div className="space-y-3">
                {relatedLocations.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Link2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      {locale === 'id' ? 'Tidak ada lokasi terkait' : 'No related locations'}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-500 mb-3">
                      {locale === 'id'
                        ? `${relatedLocations.length} lokasi dengan kategori yang sama`
                        : `${relatedLocations.length} locations in the same category`}
                    </p>
                    {relatedLocations.map((relatedLoc) => (
                      <Card
                        key={relatedLoc.id}
                        className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-cyan-500"
                        onClick={() => onLocationSelect(relatedLoc)}
                      >
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                              {relatedLoc.images && relatedLoc.images.length > 0 ? (
                                <Image
                                  src={relatedLoc.images[0]}
                                  alt={locale === 'id' ? relatedLoc.name_id : relatedLoc.name_en}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <MapPin className="w-6 h-6 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm mb-1 truncate">
                                {locale === 'id' ? relatedLoc.name_id : relatedLoc.name_en}
                              </h3>
                              <p className="text-xs text-slate-500 line-clamp-2">
                                {locale === 'id' ? relatedLoc.address_id : relatedLoc.address_en}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function InteractiveMap() {
  const locale = useLocale();
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);
  const [selectedLocation, setSelectedLocation] = useState<SiteLocation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showNearbyFromUser, setShowNearbyFromUser] = useState(false);
  const [isNearbyDrawerOpen, setIsNearbyDrawerOpen] = useState(false);

  // Icon mapping
  const iconMap: Record<string, any> = {
    'Landmark': Landmark,
    'Mountain': Mountain,
    'Building': Building,
    'MapPin': MapPin,
    'Store': Store,
    'UtensilsCrossed': UtensilsCrossed,
    'ShoppingCart': ShoppingCart
  };

  const translations = {
    id: {
      title: 'Peta Interaktif Sumbu Filosofi',
      subtitle: 'Jelajahi semua lokasi menarik dengan peta interaktif',
      filters: 'Filter Lokasi',
      showAll: 'Tampilkan Semua',
      viewDetails: 'Lihat Detail',
      getDirections: 'Rute ke Sini',
      nearbyPlaces: 'Tempat Terdekat',
      selectLocation: 'Pilih lokasi di peta untuk melihat tempat terdekat',
      locationsFound: 'lokasi ditemukan'
    },
    en: {
      title: 'Interactive Philosophical Axis Map',
      subtitle: 'Explore all interesting locations with interactive map',
      filters: 'Location Filters',
      showAll: 'Show All',
      viewDetails: 'View Details',
      getDirections: 'Get Directions',
      nearbyPlaces: 'Nearby Places',
      selectLocation: 'Select a location on the map to see nearby places',
      locationsFound: 'locations found'
    }
  };

  // Get categories from metadata
  const categories = [
    { id: 'all' as SiteCategory | 'all', label: locale === 'id' ? 'Semua Lokasi' : 'All Locations' },
    ...Object.entries(categoryMetadata).map(([key, meta]) => ({
      id: key as SiteCategory,
      label: locale === 'id' ? meta.label_id : meta.label_en
    }))
  ];

  const t = translations[locale as 'id' | 'en'] || translations.id;

  const toggleFilter = (filterId: string) => {
    if (filterId === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters.filter(f => f !== 'all');
      if (newFilters.includes(filterId)) {
        const updated = newFilters.filter(f => f !== filterId);
        setActiveFilters(updated.length === 0 ? ['all'] : updated);
      } else {
        setActiveFilters([...newFilters, filterId]);
      }
    }
  };

  const filteredLocations = activeFilters.includes('all')
    ? mapLocations
    : mapLocations.filter(loc => activeFilters.includes(loc.category));

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Get nearby locations based on selected location OR user location
  const nearbyLocations: SiteLocationWithDistance[] = useMemo(() => {
    // If showing nearby from user location
    if (showNearbyFromUser && userLocation) {
      return filteredLocations
        .map(loc => ({
          ...loc,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            loc.coordinates.lat,
            loc.coordinates.lng
          )
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 12);
    }

    // If showing nearby from selected marker
    if (selectedLocation) {
      return filteredLocations
        .filter(loc => loc.id !== selectedLocation.id)
        .map(loc => ({
          ...loc,
          distance: calculateDistance(
            selectedLocation.coordinates.lat,
            selectedLocation.coordinates.lng,
            loc.coordinates.lat,
            loc.coordinates.lng
          )
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 12);
    }

    // Default: no location selected
    return filteredLocations.slice(0, 12);
  }, [selectedLocation, filteredLocations, showNearbyFromUser, userLocation]);

  const handleLocationSelect = useCallback((location: SiteLocation) => {
    setSelectedLocation(location);
    setIsSearchOpen(false);
    setIsSidebarOpen(true);
    setShowNearbyFromUser(false); // Switch to marker-based nearby
  }, []);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchOpenChange = (open: boolean) => {
    if (open) {
      setIsSidebarOpen(false);
    }
    setIsSearchOpen(open);
  };

  // Handler for user location from LeafletMap
  const handleUserLocationUpdate = useCallback((location: {lat: number, lng: number} | null) => {
    setUserLocation(location);
    if (location) {
      // When user location is active, show nearby from user
      setShowNearbyFromUser(true);
      setSelectedLocation(null);
      setIsSidebarOpen(false);
    } else {
      setShowNearbyFromUser(false);
    }
  }, []);

  return (
    <section id="map" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full" />
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">{t.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-lg font-semibold">{t.filters}</h3>
                </div>

                <div className="space-y-3">
                  {categories.map((category) => {
                    const isActive = activeFilters.includes(category.id);
                    const isAll = category.id === 'all';

                    // Get icon and color from metadata
                    const meta = isAll ? null : categoryMetadata[category.id as SiteCategory];
                    const Icon = isAll ? MapPin : iconMap[meta?.icon || 'MapPin'];
                    const categoryColor = meta?.color || '#64748b';

                    return (
                      <button
                        key={category.id}
                        onClick={() => toggleFilter(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {/* Icon with circle background like marker */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                          style={{
                            backgroundColor: isActive ? 'white' : categoryColor,
                            opacity: isActive ? 0.9 : 1
                          }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: isActive ? categoryColor : 'white' }}
                          />
                        </div>
                        <span className="text-sm flex-1 text-left font-medium">{category.label}</span>
                        {isActive && !isAll && (
                          <X className="w-4 h-4" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong className="text-cyan-600 dark:text-cyan-400">{filteredLocations.length}</strong> {t.locationsFound}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl overflow-hidden">
              {/* Interactive Map */}
              <div className="relative aspect-[16/10] w-full">
                <LeafletMap
                  locations={filteredLocations}
                  onLocationSelect={handleLocationSelect}
                  isSearchOpen={isSearchOpen}
                  onSearchOpenChange={handleSearchOpenChange}
                  selectedLocation={selectedLocation}
                  initialLocationId={null}
                  onUserLocationChange={handleUserLocationUpdate}
                  searchSidebar={
                    <AnimatePresence>
                      {isSearchOpen && (
                        <ModernSearchSidebar
                          locations={mapLocations}
                          isOpen={isSearchOpen}
                          onClose={handleCloseSearch}
                          onLocationSelect={handleLocationSelect}
                        />
                      )}
                    </AnimatePresence>
                  }
                  locationSidebar={
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <ModernLocationSidebar
                          location={selectedLocation}
                          isOpen={isSidebarOpen}
                          onClose={handleCloseSidebar}
                          allLocations={mapLocations}
                          onLocationSelect={handleLocationSelect}
                        />
                      )}
                    </AnimatePresence>
                  }
                />

                {/* Floating Nearby Places Button - Mobile Only */}
                <button
                  onClick={() => setIsNearbyDrawerOpen(true)}
                  className="lg:hidden absolute bottom-4 right-4 z-20 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <div className="relative">
                    <MapPinned className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                    {nearbyLocations.length > 0 && (
                      <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {nearbyLocations.length}
                      </span>
                    )}
                  </div>
                </button>

                {/* Nearby Places Drawer - Mobile Only */}
                <AnimatePresence>
                  {isNearbyDrawerOpen && (
                    <>
                      {/* Overlay */}
                      <div
                        className="lg:hidden absolute inset-0 bg-black/30 z-30"
                        onClick={() => setIsNearbyDrawerOpen(false)}
                      />

                      {/* Drawer */}
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="lg:hidden absolute bottom-0 left-0 right-0 w-full bg-white dark:bg-slate-950 shadow-2xl z-40 overflow-y-auto max-h-[60%] rounded-t-3xl"
                      >
                        {/* Handle Bar */}
                        <div className="flex justify-center pt-3 pb-2">
                          <button
                            onClick={() => setIsNearbyDrawerOpen(false)}
                            className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-500 transition-colors"
                          />
                        </div>

                        {/* Drawer Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-4">
                            {t.nearbyPlaces}
                            {showNearbyFromUser && userLocation ? (
                              <span className="text-base font-normal">
                                {' '}{locale === 'id' ? 'dari' : 'from'}{' '}
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                  {locale === 'id' ? 'Lokasi Anda' : 'Your Location'}
                                </span>
                              </span>
                            ) : selectedLocation ? (
                              <span className="text-base font-normal">
                                {' '}{locale === 'id' ? 'dari' : 'from'}{' '}
                                <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                                  {locale === 'id' ? selectedLocation.name_id : selectedLocation.name_en}
                                </span>
                              </span>
                            ) : null}
                          </h3>

                          <div className="grid gap-3">
                            {nearbyLocations.map((location) => {
                              const categoryColor = categoryMetadata[location.category]?.color || '#666';
                              const categoryLabel = locale === 'id'
                                ? categoryMetadata[location.category]?.label_id
                                : categoryMetadata[location.category]?.label_en;
                              const Icon = iconMap[categoryMetadata[location.category]?.icon || 'MapPin'];

                              return (
                                <motion.div
                                  key={location.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:shadow-md transition-all cursor-pointer"
                                  onClick={() => {
                                    handleLocationSelect(location);
                                    setIsNearbyDrawerOpen(false);
                                  }}
                                >
                                  {/* Icon and Distance */}
                                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                    <div
                                      className="w-10 h-10 rounded-full flex items-center justify-center"
                                      style={{ backgroundColor: categoryColor }}
                                    >
                                      <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    {location.distance !== undefined && (
                                      <span className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                                        {location.distance < 1
                                          ? `${(location.distance * 1000).toFixed(0)}m`
                                          : `${location.distance.toFixed(1)}km`}
                                      </span>
                                    )}
                                  </div>

                                  {/* Name, Address, Category */}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold mb-0.5 truncate">
                                      {locale === 'id' ? location.name_id : location.name_en}
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate mb-1">
                                      {locale === 'id' ? location.address_id : location.address_en}
                                    </p>
                                    <Badge
                                      variant="outline"
                                      className="text-[10px] px-2 py-0"
                                      style={{ borderColor: categoryColor, color: categoryColor }}
                                    >
                                      {categoryLabel}
                                    </Badge>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Location List - Desktop Only */}
              <CardContent className="hidden lg:block p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t.nearbyPlaces}
                  {showNearbyFromUser && userLocation ? (
                    <span className="text-base font-normal">
                      {' '}{locale === 'id' ? 'dari' : 'from'}{' '}
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {locale === 'id' ? 'Lokasi Anda' : 'Your Location'}
                      </span>
                    </span>
                  ) : selectedLocation ? (
                    <span className="text-base font-normal">
                      {' '}{locale === 'id' ? 'dari' : 'from'}{' '}
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                        {locale === 'id' ? selectedLocation.name_id : selectedLocation.name_en}
                      </span>
                    </span>
                  ) : null}
                </h3>

                {!selectedLocation && !showNearbyFromUser ? (
                  <div className="text-center py-8 text-slate-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">{t.selectLocation}</p>
                  </div>
                ) : (
                  <div className="grid gap-3 max-h-96 overflow-y-auto">
                    {nearbyLocations.map((location) => {
                      const categoryColor = categoryMetadata[location.category]?.color || '#666';
                      const categoryLabel = locale === 'id'
                        ? categoryMetadata[location.category]?.label_id
                        : categoryMetadata[location.category]?.label_en;
                      const Icon = iconMap[categoryMetadata[location.category]?.icon || 'MapPin'];

                      return (
                        <motion.div
                          key={location.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: categoryColor }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold mb-1 truncate">
                              {locale === 'id' ? location.name_id : location.name_en}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                              {locale === 'id' ? location.address_id : location.address_en}
                            </p>
                          </div>
                          <div className="flex flex-col items-end justify-center gap-1 flex-shrink-0">
                            {location.distance !== undefined && (
                              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                                {location.distance < 1
                                  ? `${(location.distance * 1000).toFixed(0)}m`
                                  : `${location.distance.toFixed(1)}km`}
                              </span>
                            )}
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{ borderColor: categoryColor, color: categoryColor }}
                            >
                              {categoryLabel}
                            </Badge>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
