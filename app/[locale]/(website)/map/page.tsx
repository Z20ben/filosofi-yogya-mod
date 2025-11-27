'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X, Clock, Ticket, Info, Image as ImageIcon, Link2, Loader2, MapPinned, Landmark, Mountain, Building, Store, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { mapLocations, categoryMetadata, type SiteLocation, type SiteCategory } from '@/lib/data/mapLocations';

// Extended type for locations with distance
type SiteLocationWithDistance = SiteLocation & { distance?: number };

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMap = dynamic(
  () => import('@/components/map/LeafletMap').then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }
);

// Search Sidebar Component with modern styling
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
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
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
                  className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-orange-500"
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

      {/* Mobile Bottom Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden absolute bottom-0 left-0 right-0 w-full bg-white dark:bg-slate-950 shadow-2xl z-40 overflow-y-auto max-h-[50vh] rounded-t-3xl"
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
              className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
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
                    ? 'border-orange-500 text-orange-600'
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
                    ? 'border-orange-500 text-orange-600'
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
                    ? 'border-orange-500 text-orange-600'
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
                      <Clock className="w-4 h-4 text-orange-500" />
                      {locale === 'id' ? 'Jam Buka' : 'Opening Hours'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{location.openingHours}</p>
                  </div>
                )}

                {/* Entry Fee */}
                {location.entryFee && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-orange-500" />
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
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 rounded-full text-xs"
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
                        className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-orange-500"
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
          {/* Close Button - Desktop Only */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
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
              className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
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
                    ? 'border-orange-500 text-orange-600'
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
                    ? 'border-orange-500 text-orange-600'
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
                    ? 'border-orange-500 text-orange-600'
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
                      <Clock className="w-4 h-4 text-orange-500" />
                      {locale === 'id' ? 'Jam Buka' : 'Opening Hours'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{location.openingHours}</p>
                  </div>
                )}

                {/* Entry Fee */}
                {location.entryFee && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-orange-500" />
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
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 rounded-full text-xs"
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
                        className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-orange-500"
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

export default function MapPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<SiteLocation | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [initialLocationId, setInitialLocationId] = useState<string | null>(null);
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
    return R * c;
  };

  // Get nearby locations based on selected location
  const nearbyLocations: SiteLocationWithDistance[] = selectedLocation
    ? mapLocations
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
        .slice(0, 12)
    : [];

  // Handle initial location from URL query param
  useEffect(() => {
    const locationId = searchParams.get('location');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    // Try to find location by ID first
    if (locationId) {
      const location = mapLocations.find(loc => loc.id === locationId);
      if (location) {
        setInitialLocationId(locationId);
        setSelectedLocation(location);
        setIsSidebarOpen(true);
        return;
      }
    }

    // If not found by ID but has coordinates, try to find by coordinates
    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      if (!isNaN(latNum) && !isNaN(lngNum)) {
        // Find location by matching coordinates (with small tolerance for floating point comparison)
        const location = mapLocations.find(loc => {
          const latDiff = Math.abs(loc.coordinates.lat - latNum);
          const lngDiff = Math.abs(loc.coordinates.lng - lngNum);
          return latDiff < 0.0001 && lngDiff < 0.0001;
        });

        if (location) {
          setInitialLocationId(location.id);
          setSelectedLocation(location);
          setIsSidebarOpen(true);
        }
      }
    }
  }, [searchParams]);

  const handleLocationSelect = useCallback((location: SiteLocation) => {
    setSelectedLocation(location);
    setIsSearchOpen(false);
    setIsSidebarOpen(true);
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

  const translations = {
    id: {
      title: 'Peta Interaktif Sumbu Filosofi',
      subtitle: 'Jelajahi lokasi-lokasi penting di sepanjang Sumbu Filosofi Yogyakarta',
    },
    en: {
      title: 'Philosophical Axis Interactive Map',
      subtitle: 'Explore important locations along Yogyakarta\'s Philosophical Axis',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.id;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-16">
      {/* Simple Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            {t.title}
          </h1>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[calc(100vh-180px)] min-h-[500px] w-full relative">
        <LeafletMap
          locations={mapLocations}
          onLocationSelect={handleLocationSelect}
          isSearchOpen={isSearchOpen}
          onSearchOpenChange={handleSearchOpenChange}
          selectedLocation={selectedLocation}
          initialLocationId={initialLocationId}
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

        {/* Floating Nearby Places Button */}
        <button
          onClick={() => setIsNearbyDrawerOpen(true)}
          className="md:hidden absolute bottom-4 right-4 z-20 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        >
          <div className="relative">
            <MapPinned className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            {nearbyLocations.length > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {nearbyLocations.length}
              </span>
            )}
          </div>
        </button>

        {/* Desktop Nearby Places Button - Left Side */}
        <button
          onClick={() => setIsNearbyDrawerOpen(!isNearbyDrawerOpen)}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        >
          <div className="relative">
            <MapPinned className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            {nearbyLocations.length > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {nearbyLocations.length}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
            {locale === 'id' ? 'Terdekat' : 'Nearby'}
          </span>
        </button>

        {/* Nearby Places Drawer - Mobile */}
        <AnimatePresence>
          {isNearbyDrawerOpen && (
            <>
              {/* Overlay */}
              <div
                className="md:hidden absolute inset-0 bg-black/30 z-30"
                onClick={() => setIsNearbyDrawerOpen(false)}
              />

              {/* Mobile Drawer */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="md:hidden absolute bottom-0 left-0 right-0 w-full bg-white dark:bg-slate-950 shadow-2xl z-40 overflow-y-auto max-h-[60%] rounded-t-3xl"
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
                    {locale === 'id' ? 'Tempat Terdekat' : 'Nearby Places'}
                    {selectedLocation && (
                      <span className="text-base font-normal">
                        {' '}{locale === 'id' ? 'dari' : 'from'}{' '}
                        <span className="text-orange-600 dark:text-orange-400 font-medium">
                          {locale === 'id' ? selectedLocation.name_id : selectedLocation.name_en}
                        </span>
                      </span>
                    )}
                  </h3>

                  {nearbyLocations.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">
                        {locale === 'id' ? 'Pilih lokasi di peta untuk melihat tempat terdekat' : 'Select a location on the map to see nearby places'}
                      </p>
                    </div>
                  ) : (
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
                                <span className="text-[10px] font-medium text-orange-600 dark:text-orange-400 whitespace-nowrap">
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
                  )}
                </div>
              </motion.div>

              {/* Desktop Sidebar - Left Panel */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block absolute top-0 left-0 bottom-0 w-96 bg-white dark:bg-slate-950 shadow-2xl z-40 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {locale === 'id' ? 'Tempat Terdekat' : 'Nearby Places'}
                    </h3>
                    <button
                      onClick={() => setIsNearbyDrawerOpen(false)}
                      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {selectedLocation && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {locale === 'id' ? 'dari' : 'from'}{' '}
                      <span className="text-orange-600 dark:text-orange-400 font-medium">
                        {locale === 'id' ? selectedLocation.name_id : selectedLocation.name_en}
                      </span>
                    </p>
                  )}

                  {nearbyLocations.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">
                        {locale === 'id' ? 'Pilih lokasi di peta untuk melihat tempat terdekat' : 'Select a location on the map to see nearby places'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {nearbyLocations.map((location) => {
                        const categoryColor = categoryMetadata[location.category]?.color || '#666';
                        const categoryLabel = locale === 'id'
                          ? categoryMetadata[location.category]?.label_id
                          : categoryMetadata[location.category]?.label_en;
                        const Icon = iconMap[categoryMetadata[location.category]?.icon || 'MapPin'];

                        return (
                          <Card
                            key={location.id}
                            className="cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-orange-500"
                            onClick={() => {
                              handleLocationSelect(location);
                              setIsNearbyDrawerOpen(false);
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex gap-3">
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
                                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate mb-2">
                                    {locale === 'id' ? location.address_id : location.address_en}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                      style={{ borderColor: categoryColor, color: categoryColor }}
                                    >
                                      {categoryLabel}
                                    </Badge>
                                    {location.distance !== undefined && (
                                      <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                                        {location.distance < 1
                                          ? `${(location.distance * 1000).toFixed(0)}m`
                                          : `${location.distance.toFixed(1)}km`}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
