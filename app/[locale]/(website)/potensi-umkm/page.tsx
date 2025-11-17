'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Store, Users, Sparkles, TrendingUp, Award, MapPin, X, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { UMKMCard, UMKMData } from '@/components/shared/UMKMCard';

// ISR Configuration - uncomment when migrating to database
// export const revalidate = 300; // Cache 5 minutes
// NOTE: ISR (revalidate) akan diimplementasikan saat migrasi ke database
// menggunakan Server Component + Client Component hybrid approach

export default function UMKMPage() {
  const t = useTranslations('umkmPotential');
  const locale = useLocale();
  const [selectedUmkm, setSelectedUmkm] = useState<UMKMData | null>(null);

  // Featured UMKM - database-ready structure (highlighting best/popular ones)
  const featuredBusinesses: UMKMData[] = [
    {
      id: 'batikWinotosastro',
      name_id: 'Batik Winotosastro',
      name_en: 'Batik Winotosastro',
      description_id: 'Pengrajin batik tulis tradisional dengan motif klasik Yogyakarta. Menyediakan batik cap dan tulis berkualitas tinggi dengan pewarna alami.',
      description_en: 'Traditional hand-drawn batik artisan with classic Yogyakarta motifs. Provides high-quality stamped and hand-drawn batik with natural dyes.',
      category_id: 'Batik & Tekstil',
      category_en: 'Batik & Textile',
      location_id: 'Kawasan Keraton',
      location_en: 'Palace Area',
      products_id: ['Batik Tulis', 'Batik Cap', 'Kain Jarik', 'Kemeja Batik'],
      products_en: ['Hand-drawn Batik', 'Stamped Batik', 'Jarik Cloth', 'Batik Shirts'],
      priceRange_id: 'Rp 150.000 - Rp 2.500.000',
      priceRange_en: 'Rp 150,000 - Rp 2,500,000',
      contact: {
        phone: '+62 274 123456',
        email: 'info@batikwino.com'
      },
      social_links: {
        instagram: '@batikwinotosastro',
        facebook: 'batikwinotosastro'
      },
    },
    {
      id: 'wayangPakJoko',
      name_id: 'Kerajinan Wayang Pak Joko',
      name_en: 'Wayang Kulit Pak Joko',
      description_id: 'Pembuat wayang kulit tradisional dengan detail rumit. Setiap wayang dibuat dengan teknik ukir dan sungging yang autentik.',
      description_en: 'Handcrafted shadow puppets made by experienced craftsmen. Each puppet is meticulously carved with high artistic value.',
      category_id: 'Kerajinan Tangan',
      category_en: 'Handicrafts',
      location_id: 'Kawasan Keraton',
      location_en: 'Palace Area',
      products_id: ['Wayang Kulit', 'Wayang Golek', 'Miniatur Wayang', 'Gunungan'],
      products_en: ['Shadow Puppets', 'Miniature Puppets', 'Puppet Accessories', 'Customized Puppets'],
      priceRange_id: 'Rp 200.000 - Rp 5.000.000',
      priceRange_en: 'Rp 250,000 - Rp 5,000,000',
      contact: {
        phone: '+62 274 234567',
        email: 'paktomo@wayang.com'
      },
      social_links: {
        instagram: '@wayangpakjoko',
        facebook: 'wayangpakjoko'
      },
    },
    {
      id: 'gudegYuDjum',
      name_id: 'Gudeg Yu Djum',
      name_en: 'Gudeg Yu Djum',
      description_id: 'Warung gudeg legendaris dengan resep turun temurun. Menyajikan gudeg khas Yogyakarta dengan cita rasa manis yang khas.',
      description_en: 'Legendary authentic Yogyakarta gudeg with recipes passed down through generations. Sweet, savory, and tender flavors in every bite.',
      category_id: 'Kuliner',
      category_en: 'Culinary',
      location_id: 'Kawasan Malioboro',
      location_en: 'Malioboro Area',
      products_id: ['Gudeg Kering', 'Gudeg Basah', 'Ayam Kampung', 'Telur Pindang'],
      products_en: ['Dry Gudeg', 'Wet Gudeg', 'Packaged Gudeg', 'Complete Gudeg Set'],
      priceRange_id: 'Rp 15.000 - Rp 35.000',
      priceRange_en: 'Rp 15,000 - Rp 100,000',
      contact: {
        phone: '+62 274 345678',
        email: 'info@gudegyudjum.com'
      },
      social_links: {
        instagram: '@gudegyudjum',
        facebook: 'gudegyudjum'
      },
    },
    {
      id: 'silverKotagede',
      name_id: 'Silver Kotagede',
      name_en: 'Silver Kotagede',
      description_id: 'Pengrajin perak dengan teknik tatah dan ukir tradisional. Produk perhiasan dan souvenir perak berkualitas ekspor.',
      description_en: 'Fine silver craftsmen from the historic Kotagede area. Creates jewelry and accessories with intricate details and guaranteed quality.',
      category_id: 'Perhiasan & Aksesoris',
      category_en: 'Jewelry & Accessories',
      location_id: 'Kawasan Kota Gede',
      location_en: 'Kota Gede Area',
      products_id: ['Cincin Perak', 'Gelang', 'Liontin', 'Miniatur Perak'],
      products_en: ['Silver Jewelry', 'Silver Brooches', 'Silver Accessories', 'Custom Silver'],
      priceRange_id: 'Rp 100.000 - Rp 3.000.000',
      priceRange_en: 'Rp 200,000 - Rp 3,000,000',
      contact: {
        phone: '+62 274 456789',
        email: 'info@silverkotagede.com'
      },
      social_links: {
        instagram: '@silverkotagede',
        facebook: 'silverkotagede'
      },
    },
    {
      id: 'gerabahKasongan',
      name_id: 'Gerabah Kasongan',
      name_en: 'Gerabah Kasongan',
      description_id: 'Sentra kerajinan gerabah dan keramik dengan berbagai bentuk dan ukuran. Dari peralatan dapur hingga dekorasi rumah.',
      description_en: 'Handcrafted ceramics from Kasongan Village, famous for creative ceramic products. Perfect for home decoration and souvenirs.',
      category_id: 'Kerajinan Tangan',
      category_en: 'Handicrafts',
      location_id: 'Kawasan Kota Gede',
      location_en: 'Kota Gede Area',
      products_id: ['Vas Bunga', 'Guci', 'Piring Keramik', 'Patung Tanah Liat'],
      products_en: ['Decorative Vases', 'Clay Pots', 'Statues', 'Utensils'],
      priceRange_id: 'Rp 25.000 - Rp 500.000',
      priceRange_en: 'Rp 25,000 - Rp 500,000',
      contact: {
        phone: '+62 274 567890',
        email: 'info@gerabahkasongan.com'
      },
      social_links: {
        instagram: '@gerabahkasongan',
        facebook: 'gerabahkasongan'
      },
    },
    {
      id: 'bakpiaPathok25',
      name_id: 'Bakpia Pathok 25',
      name_en: 'Bakpia Pathok 25',
      description_id: 'Produsen bakpia legendaris dengan berbagai varian rasa. Oleh-oleh khas Yogyakarta yang wajib dibawa pulang.',
      description_en: 'Legendary Bakpia Pathok with various flavors. The most popular souvenir from Yogyakarta with authentic taste and guaranteed quality.',
      category_id: 'Kuliner',
      category_en: 'Culinary',
      location_id: 'Kawasan Malioboro',
      location_en: 'Malioboro Area',
      products_id: ['Bakpia Kacang Hijau', 'Bakpia Coklat', 'Bakpia Keju', 'Bakpia Kumbu'],
      products_en: ['Mung Bean Bakpia', 'Chocolate Bakpia', 'Cheese Bakpia', 'Durian Bakpia'],
      priceRange_id: 'Rp 35.000 - Rp 75.000',
      priceRange_en: 'Rp 35,000 - Rp 80,000',
      contact: {
        phone: '+62 274 678901',
        email: 'info@bakpiapathok.com'
      },
      social_links: {
        instagram: '@bakpiapathok25',
        facebook: 'bakpiapathok25'
      },
    },
  ];

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
