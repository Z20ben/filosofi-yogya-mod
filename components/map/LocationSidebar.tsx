'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { X, ChevronLeft, ChevronRight, ChevronUp, MapPin, Info, Image as ImageIcon, Link2, Navigation } from 'lucide-react';
import { categoryMetadata, type SiteLocation } from '@/lib/data/mapLocations';
import Image from 'next/image';

interface LocationSidebarProps {
  location: SiteLocation | null;
  isOpen: boolean;
  onClose: () => void;
  allLocations: SiteLocation[];
  onLocationSelect: (location: SiteLocation) => void;
}

type TabType = 'info' | 'media' | 'related';

export function LocationSidebar({ location, isOpen, onClose, allLocations, onLocationSelect }: LocationSidebarProps) {
  const locale = useLocale();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('info');

  // Reset collapsed state when new location is selected OR when sidebar opens
  useEffect(() => {
    if (location && isOpen) {
      setIsCollapsed(false);
      setActiveTab('info');
    }
  }, [location, isOpen]);

  if (!location) return null;

  const categoryColor = categoryMetadata[location.category].color;
  const categoryLabel = locale === 'id'
    ? categoryMetadata[location.category].label_id
    : categoryMetadata[location.category].label_en;

  // Filter related locations (same category, excluding current location)
  const relatedLocations = allLocations.filter(
    (loc) => loc.category === location.category && loc.id !== location.id
  );

  const handleRelatedLocationClick = (relatedLocation: SiteLocation) => {
    onLocationSelect(relatedLocation);
  };

  return (
    <>
      {/* Overlay - show when sidebar is open and NOT collapsed */}
      {isOpen && !isCollapsed && (
        <div
          className="absolute inset-0 bg-black/20 lg:bg-black/30 z-30"
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
            z-40 p-3 rounded-lg shadow-lg transition-all duration-200
            bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Show Details"
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
            bg-background border-border shadow-2xl z-40
            transition-transform duration-300 ease-in-out
            rounded-t-2xl lg:rounded-t-none lg:rounded-r-2xl
            h-[60vh] lg:h-full
            w-full lg:w-96 xl:w-[28rem]
            ${isOpen
              ? 'translate-y-0 lg:translate-x-0'
              : 'translate-y-full lg:translate-y-0 lg:-translate-x-full'
            }
            border-t lg:border-t-0 lg:border-r
            flex flex-col`}
        >
          {/* Mobile Handle Bar - Top Center */}
          <div className="lg:hidden flex justify-center pt-3 pb-2 flex-shrink-0">
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-10 h-2 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              title="Hide"
            />
          </div>

          {/* Desktop Toggle & Close Buttons */}
          <div className="hidden lg:flex absolute top-4 right-2 gap-2 z-50">
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 rounded-lg bg-background hover:bg-accent transition-colors shadow-md"
              title="Collapse"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-background hover:bg-accent transition-colors shadow-md"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
            {/* Photo Section with Floating Get Directions Button */}
            <div className="relative h-48 bg-muted flex-shrink-0">
              {location.images && location.images.length > 0 ? (
                <Image
                  src={location.images[0]}
                  alt={locale === 'id' ? location.name_id : location.name_en}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                </div>
              )}

              {/* Floating Get Directions Button */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 map-button-active text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:opacity-90 font-medium text-sm"
              >
                <Navigation className="w-4 h-4" />
                {locale === 'id' ? 'Petunjuk Arah' : 'Get Directions'}
              </a>
            </div>

            {/* Header Section */}
            <div className="p-4 space-y-3">
              {/* Category Badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {categoryLabel}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-foreground">
                {locale === 'id' ? location.name_id : location.name_en}
              </h2>

              {/* Address */}
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{locale === 'id' ? location.address_id : location.address_en}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex px-4">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'info'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  {locale === 'id' ? 'Informasi' : 'Information'}
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'media'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Media
                </button>
                <button
                  onClick={() => setActiveTab('related')}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'related'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Link2 className="w-4 h-4" />
                  {locale === 'id' ? 'Terkait' : 'Related'}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === 'info' && (
                <div className="space-y-4 pb-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      {locale === 'id' ? 'Deskripsi' : 'Description'}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {locale === 'id' ? location.description_id : location.description_en}
                    </p>
                  </div>

                  {/* Opening Hours */}
                  {location.openingHours && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">
                        {locale === 'id' ? 'Jam Buka' : 'Opening Hours'}
                      </h3>
                      <p className="text-sm text-muted-foreground">{location.openingHours}</p>
                    </div>
                  )}

                  {/* Entry Fee */}
                  {location.entryFee && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">
                        {locale === 'id' ? 'Harga Tiket' : 'Entry Fee'}
                      </h3>
                      <div className="space-y-1 text-sm">
                        {location.entryFee.local && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {locale === 'id' ? 'Lokal' : 'Local'}:
                            </span>
                            <span className="font-medium">
                              Rp {location.entryFee.local.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {location.entryFee.foreign && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {locale === 'id' ? 'Asing' : 'Foreign'}:
                            </span>
                            <span className="font-medium">
                              Rp {location.entryFee.foreign.toLocaleString()}
                            </span>
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
                      <ul className="grid grid-cols-2 gap-2">
                        {location.facilities.map((facility, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {facility}
                          </li>
                        ))}
                      </ul>
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
                            className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
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
                      <p className="text-sm text-muted-foreground">{location.priceRange}</p>
                    </div>
                  )}

                  {/* Contact */}
                  {location.contact && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">
                        {locale === 'id' ? 'Kontak' : 'Contact'}
                      </h3>
                      <div className="space-y-1 text-sm">
                        {location.contact.phone && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone:</span>
                            <a href={`tel:${location.contact.phone}`} className="text-primary hover:underline">
                              {location.contact.phone}
                            </a>
                          </div>
                        )}
                        {location.contact.whatsapp && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">WhatsApp:</span>
                            <a href={`https://wa.me/${location.contact.whatsapp}`} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                              {location.contact.whatsapp}
                            </a>
                          </div>
                        )}
                        {location.contact.email && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <a href={`mailto:${location.contact.email}`} className="text-primary hover:underline">
                              {location.contact.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-4 pb-6">
                  {location.images && location.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {location.images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
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
                    <div className="text-center py-8 text-muted-foreground">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        {locale === 'id' ? 'Tidak ada media tersedia' : 'No media available'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'related' && (
                <div className="space-y-3 pb-6">
                  {relatedLocations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Link2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        {locale === 'id' ? 'Tidak ada lokasi terkait' : 'No related locations'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground mb-3">
                        {locale === 'id'
                          ? `${relatedLocations.length} lokasi dengan kategori yang sama`
                          : `${relatedLocations.length} locations in the same category`}
                      </p>
                      {relatedLocations.map((relatedLoc) => (
                        <button
                          key={relatedLoc.id}
                          onClick={() => handleRelatedLocationClick(relatedLoc)}
                          className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                          <div className="flex gap-3">
                            {/* Thumbnail */}
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              {relatedLoc.images && relatedLoc.images.length > 0 ? (
                                <Image
                                  src={relatedLoc.images[0]}
                                  alt={locale === 'id' ? relatedLoc.name_id : relatedLoc.name_en}
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
                              {/* Name */}
                              <h3 className="font-semibold text-sm mb-1 truncate">
                                {locale === 'id' ? relatedLoc.name_id : relatedLoc.name_en}
                              </h3>

                              {/* Address */}
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {locale === 'id' ? relatedLoc.address_id : relatedLoc.address_en}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
