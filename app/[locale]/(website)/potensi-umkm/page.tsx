'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Store, Users, Sparkles, TrendingUp, Award, MapPin, X, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { UMKMCard, UMKMData } from '@/components/shared/UMKMCard';
import { mockUMKMData } from '@/lib/admin/mock-data/umkm';

// ISR Configuration - uncomment when migrating to database
// export const revalidate = 300; // Cache 5 minutes
// NOTE: ISR (revalidate) akan diimplementasikan saat migrasi ke database
// menggunakan Server Component + Client Component hybrid approach

export default function UMKMPage() {
  const t = useTranslations('umkmPotential');
  const locale = useLocale();
  const [selectedUmkm, setSelectedUmkm] = useState<UMKMData | null>(null);

  // Featured UMKM from mock data
  const featuredBusinesses: UMKMData[] = mockUMKMData
    .filter(u => u.status === 'published' && u.featured)
    .map(u => ({
      id: u.id,
      name_id: u.business_name,
      name_en: u.business_name,
      description_id: u.description_id,
      description_en: u.description_en,
      category_id: u.category,
      category_en: u.category,
      location_id: u.location_id || u.location.address,
      location_en: u.location_en || u.location.address,
      products_id: u.products_id || u.products.map(p => p.name_id),
      products_en: u.products_en || u.products.map(p => p.name_en),
      priceRange_id: u.price_range_id || u.products[0]?.price_range || '',
      priceRange_en: u.price_range_en || u.products[0]?.price_range || '',
      contact: {
        phone: u.contact.phone,
        email: u.contact.email,
      },
      social_links: {
        instagram: u.social_media.instagram,
        facebook: u.social_media.facebook,
      },
    }));

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
            <Store className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
            <span className="text-[var(--javanese-gold)] dark:text-white">
              {t('badge')}
            </span>
          </div>

          <h1 className="font-serif text-5xl">
            {t('title')}
          </h1>

          <p className="text-[var(--javanese-ivory)]/90 text-xl mt-4 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-[var(--javanese-gold)] text-3xl font-serif">12+</p>
              <p className="text-[var(--javanese-ivory)]/80 mt-2">{t('stats.registered')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-[var(--javanese-gold)] text-3xl font-serif">6</p>
              <p className="text-[var(--javanese-ivory)]/80 mt-2">{t('stats.categories')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-[var(--javanese-gold)] text-3xl font-serif">50+</p>
              <p className="text-[var(--javanese-ivory)]/80 mt-2">{t('stats.localProducts')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeInSection>
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
            {/* Map Header */}
            <div className="p-6 bg-[var(--javanese-brown-bg)] text-[var(--javanese-ivory)] dark:bg-[var(--javanese-ivory)] dark:text-primary-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[var(--javanese-gold)]" />
                <h2 className="font-serif">
                  {t('map.title')}
                </h2>
              </div>
              <p className="opacity-80 mt-2">
                {t('map.subtitle')}
              </p>
            </div>

            {/* Map Container */}
            <div className="aspect-video bg-muted flex items-center justify-center p-8">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[var(--javanese-brown-text)]/30 mx-auto mb-4" />
                <h3 className="text-[var(--javanese-brown-text)] mb-2 text-xl">
                  {t('map.notConfigured')}
                </h3>
                <p className="text-[var(--javanese-brown-text)] opacity-60 max-w-md">
                  {t('map.notConfiguredDesc')}
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Featured UMKM Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-[var(--javanese-brown-text)] mb-4 font-serif text-4xl">
              {t('featured.title')}
            </h2>
            <p className="text-javanese-brown-70 text-lg max-w-3xl mx-auto">
              {t('featured.description')}
            </p>
          </div>
        </FadeInSection>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredBusinesses.map((business, index) => (
            <FadeInSection key={business.id} delay={200 + index * 50}>
              <UMKMCard data={business} onViewDetails={setSelectedUmkm} />
            </FadeInSection>
          ))}
        </div>

        {/* View Full Catalog CTA */}
        <FadeInSection>
          <div className="text-center mt-8">
            <a
              href={`/${locale}/potensi-umkm/katalog`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] dark:from-[var(--javanese-gold)] dark:to-[var(--javanese-gold)] dark:text-javanese-brown rounded-lg hover:opacity-90 transition-all font-semibold text-lg shadow-lg"
            >
              {t('featured.viewCatalog')}
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* Why Support UMKM & CTA Section */}
      <section className="batik-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 - Local Economy */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif text-lg">
                  {t('benefits.localEconomy.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm leading-relaxed">
                  {t('benefits.localEconomy.description')}
                </p>
              </div>

              {/* Benefit 2 - Authentic Quality */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif text-lg">
                  {t('benefits.authenticQuality.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm leading-relaxed">
                  {t('benefits.authenticQuality.description')}
                </p>
              </div>

              {/* Benefit 3 - Sustainable Growth */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif text-lg">
                  {t('benefits.sustainableGrowth.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm leading-relaxed">
                  {t('benefits.sustainableGrowth.description')}
                </p>
              </div>

              {/* Benefit 4 - Cultural Preservation */}
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-14 h-14 rounded-full bg-javanese-gold-20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-[var(--javanese-brown-text)]" />
                </div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-serif text-lg">
                  {t('benefits.culturalPreservation.title')}
                </h3>
                <p className="text-javanese-brown-70 text-sm leading-relaxed">
                  {t('benefits.culturalPreservation.description')}
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection>
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl mt-12">
              <h2 className="text-[var(--javanese-brown-text)] mb-4 font-serif text-3xl">
                {t('cta.title')}
              </h2>
              <p className="text-javanese-brown-70 mb-6 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <a
                href="mailto:info@filosofiyogya.id"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] dark:from-[var(--javanese-gold)] dark:to-[var(--javanese-gold)] dark:text-javanese-brown rounded-lg hover:opacity-90 transition-all shadow-lg"
              >
                {t('cta.button')}
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedUmkm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div
              className="sticky top-0 z-20 rounded-t-2xl border-b border-[var(--javanese-brown-text)]/10 p-6 flex items-center justify-between shadow-md flex-shrink-0"
              style={{
                backgroundColor: 'var(--card)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <h2 className="text-[var(--javanese-brown-text)] font-serif text-2xl">
                {locale === 'id' ? selectedUmkm.name_id : selectedUmkm.name_en}
              </h2>
              <button
                onClick={() => setSelectedUmkm(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-[var(--javanese-brown-text)]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 flex-1">
              {/* Gallery */}
              {selectedUmkm.gallery_images && selectedUmkm.gallery_images.length > 0 && (
                <div className="relative z-0">
                  <div
                    className="overflow-x-scroll overflow-y-hidden flex gap-3 bg-muted p-3 rounded-xl cursor-grab active:cursor-grabbing"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(155, 135, 110, 0.3) transparent'
                    }}
                    onMouseDown={(e) => {
                      const ele = e.currentTarget;
                      const startX = e.pageX - ele.offsetLeft;
                      const scrollLeft = ele.scrollLeft;

                      const handleMouseMove = (e: MouseEvent) => {
                        const x = e.pageX - ele.offsetLeft;
                        const walk = (x - startX) * 2;
                        ele.scrollLeft = scrollLeft - walk;
                      };

                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };

                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    {selectedUmkm.gallery_images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex-shrink-0"
                        style={{ width: 'calc(100% - 4rem)' }}
                      >
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`${locale === 'id' ? selectedUmkm.name_id : selectedUmkm.name_en} ${idx + 1}`}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-[var(--javanese-brown-text)] mb-2 font-semibold">
                  Deskripsi
                </h3>
                <p className="text-javanese-brown-70 leading-relaxed">
                  {locale === 'id' ? selectedUmkm.description_id : selectedUmkm.description_en}
                </p>
              </div>

              {/* Products in Modal */}
              {selectedUmkm.products_id && selectedUmkm.products_en && (
                <div>
                  <h3 className="text-[var(--javanese-brown-text)] mb-2 font-semibold">
                    Produk
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(locale === 'id' ? selectedUmkm.products_id : selectedUmkm.products_en).map((product: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1.5 bg-javanese-gold-20 text-[var(--javanese-brown-text)] rounded-full text-sm"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Category, Location & Price Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-[var(--javanese-brown-text)] mb-2 font-semibold">
                    Kategori
                  </h3>
                  <span className="inline-block px-3 py-1 bg-javanese-gold-20 text-[var(--javanese-brown-text)] rounded-full">
                    {locale === 'id' ? selectedUmkm.category_id : selectedUmkm.category_en}
                  </span>
                </div>

                {selectedUmkm.location_id && (
                  <div>
                    <h3 className="text-[var(--javanese-brown-text)] mb-2 font-semibold">
                      Lokasi
                    </h3>
                    <p className="text-javanese-brown-70">
                      {locale === 'id' ? selectedUmkm.location_id : selectedUmkm.location_en}
                    </p>
                  </div>
                )}

                {selectedUmkm.priceRange_id && (
                  <div>
                    <h3 className="text-[var(--javanese-brown-text)] mb-2 font-semibold">
                      Kisaran Harga
                    </h3>
                    <p className="text-javanese-brown-70">
                      {locale === 'id' ? selectedUmkm.priceRange_id : selectedUmkm.priceRange_en}
                    </p>
                  </div>
                )}
              </div>

              {/* Contact & Social Media */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact */}
                {selectedUmkm.contact && selectedUmkm.contact.phone && (
                  <div>
                    <h3 className="text-[var(--javanese-brown-text)] mb-3 font-semibold">
                      Kontak
                    </h3>
                    <div className="space-y-2">
                      <a
                        href={`https://wa.me/${selectedUmkm.contact.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-javanese-brown-70 hover:text-[var(--javanese-brown-text)]"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{selectedUmkm.contact.phone}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Social Media */}
                {selectedUmkm.social_links && (
                  <div>
                    <h3 className="text-[var(--javanese-brown-text)] mb-3 font-semibold">
                      Media Sosial
                    </h3>
                    <div className="flex items-start gap-2">
                      {selectedUmkm.social_links.instagram && (
                        <a
                          href={`https://instagram.com/${selectedUmkm.social_links.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-javanese-gold-10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm whitespace-nowrap"
                        >
                          <Instagram className="w-4 h-4" />
                          <span>{selectedUmkm.social_links.instagram}</span>
                        </a>
                      )}
                      {selectedUmkm.social_links.facebook && (
                        <a
                          href={`https://facebook.com/${selectedUmkm.social_links.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-javanese-gold-10 text-[var(--javanese-brown-text)] rounded-lg hover:bg-[var(--javanese-gold)] hover:text-[#4A2C2A] transition-colors text-sm whitespace-nowrap"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>{selectedUmkm.social_links.facebook}</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
