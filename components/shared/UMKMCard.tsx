'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Store, MapPin, Instagram, Facebook, Package, ShoppingBag, MessageCircle, ExternalLink } from 'lucide-react';

export interface UMKMData {
  id: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  category_id: string;
  category_en: string;
  location_id?: string;
  location_en?: string;
  logo_url?: string;
  gallery_images?: string[];
  products_id?: string[];
  products_en?: string[];
  priceRange_id?: string;
  priceRange_en?: string;
  contact?: {
    phone: string;
    email?: string;
  };
  social_links?: {
    instagram?: string;
    facebook?: string;
  };
}

interface UMKMCardProps {
  data: UMKMData;
  onViewDetails?: (data: UMKMData) => void; // Optional callback for external modal control
}

export function UMKMCard({ data, onViewDetails }: UMKMCardProps) {
  const locale = useLocale();
  const t = useTranslations('umkmCard');

  const name = locale === 'id' ? data.name_id : data.name_en;
  const description = locale === 'id' ? data.description_id : data.description_en;
  const category = locale === 'id' ? data.category_id : data.category_en;
  const location = locale === 'id' ? data.location_id : data.location_en;
  const products = locale === 'id' ? data.products_id : data.products_en;
  const priceRange = locale === 'id' ? data.priceRange_id : data.priceRange_en;

  return (
    <>
      <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group h-full flex flex-col">
        {/* Image Gallery */}
        <div className="relative">
          <div
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex bg-muted"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {data.gallery_images && data.gallery_images.length > 0 ? (
              data.gallery_images.map((img: string, idx: number) => (
                <div key={idx} className="w-full flex-shrink-0 snap-center">
                  <div className="aspect-video relative">
                    <Image
                      src={img}
                      alt={`${name} ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                </div>
              ))
            ) : data.logo_url ? (
              <div className="w-full flex-shrink-0">
                <div className="aspect-video relative">
                  <Image
                    src={data.logo_url}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    unoptimized
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex-shrink-0">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-javanese-gold-20 to-javanese-gold-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Store className="w-16 h-16 text-javanese-gold-40 opacity-50" />
                  </div>
                  <div className="absolute inset-0 landmark-overlay-gradient"></div>
                </div>
              </div>
            )}
          </div>

          {/* Category Badge - Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <span className="umkm-category-badge inline-flex items-center gap-2 px-3 py-1 bg-javanese-gold-90 text-javanese-brown rounded-full text-xs border border-javanese-gold backdrop-blur-sm shadow-lg font-medium">
              <Store className="w-4 h-4 text-javanese-brown" />
              {category}
            </span>
          </div>

          {/* Price Range Badge - Bottom Left */}
          {priceRange && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
              <ShoppingBag className="w-4 h-4 text-[var(--javanese-gold)]" />
              <span className="text-white text-sm font-semibold">{priceRange}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Business Name */}
          <h3 className="text-[var(--javanese-brown-text)] font-serif text-xl mb-3">
            {name}
          </h3>

          {/* Description */}
          <p className="text-javanese-brown-70 mb-4 text-sm leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 text-javanese-brown-60 text-sm mb-4">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}

          {/* Products */}
          {products && products.length > 0 && (
            <div className="border-t border-[var(--javanese-brown-text)]/10 pt-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-[var(--javanese-gold)]" />
                <p className="text-xs font-semibold text-javanese-brown-70">
                  {t('products')}:
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {products.map((product: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 bg-javanese-gold-10 rounded text-xs text-javanese-brown-70"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Icons */}
          {data.social_links && (
            <div className="flex flex-wrap gap-2 mb-4">
              {data.contact?.phone && (
                <a
                  href={`https://wa.me/${data.contact.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-javanese-gold-10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              )}

              {data.social_links.facebook && (
                <a
                  href={`https://facebook.com/${data.social_links.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-javanese-gold-10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}

              {data.social_links.instagram && (
                <a
                  href={`https://instagram.com/${data.social_links.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-javanese-gold-10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Yogyakarta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[var(--javanese-gold)] text-javanese-brown border border-transparent dark:bg-white dark:border-[var(--javanese-gold)] dark:text-white rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{t('getDirections')}</span>
            </a>

            <button
              onClick={() => onViewDetails?.(data)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white dark:from-[var(--javanese-terracotta)] dark:to-[var(--javanese-terracotta)] rounded-lg hover:opacity-90 transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-medium">{t('viewDetails')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
