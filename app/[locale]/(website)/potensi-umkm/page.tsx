'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Store, Package, ShoppingBag, MapPin, Mail, Phone, Users, Sparkles, TrendingUp, Award } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';

// ISR Configuration - uncomment when migrating to database
// export const revalidate = 300; // Cache 5 minutes
// NOTE: ISR (revalidate) akan diimplementasikan saat migrasi ke database
// menggunakan Server Component + Client Component hybrid approach

export default function UMKMPage() {
  const t = useTranslations('umkmPotential');
  const locale = useLocale();

  // Featured UMKM - database-ready structure (highlighting best/popular ones)
  const featuredBusinesses = [
    {
      id: 'batikWinotosastro',
      name_id: 'Batik Winotosastro',
      name_en: 'Batik Winotosastro',
      description_id: 'Pengrajin batik tulis tradisional dengan motif klasik Yogyakarta. Menyediakan batik cap dan tulis berkualitas tinggi dengan pewarna alami.',
      description_en: 'Traditional hand-drawn batik artisan with classic Yogyakarta motifs. Provides high-quality stamped and hand-drawn batik with natural dyes.',
      category_id: 'batikTextile',
      category_en: 'batikTextile',
      products_id: ['Batik Tulis', 'Batik Cap', 'Kain Jarik', 'Kemeja Batik'],
      products_en: ['Hand-drawn Batik', 'Stamped Batik', 'Jarik Cloth', 'Batik Shirts'],
      priceRange_id: 'Rp 150.000 - Rp 2.500.000',
      priceRange_en: 'Rp 150,000 - Rp 2,500,000',
    },
    {
      id: 'wayangPakJoko',
      name_id: 'Kerajinan Wayang Pak Joko',
      name_en: 'Wayang Kulit Pak Joko',
      description_id: 'Pembuat wayang kulit tradisional dengan detail rumit. Setiap wayang dibuat dengan teknik ukir dan sungging yang autentik.',
      description_en: 'Handcrafted shadow puppets made by experienced craftsmen. Each puppet is meticulously carved with high artistic value.',
      category_id: 'handicrafts',
      category_en: 'handicrafts',
      products_id: ['Wayang Kulit', 'Wayang Golek', 'Miniatur Wayang', 'Gunungan'],
      products_en: ['Shadow Puppets', 'Miniature Puppets', 'Puppet Accessories', 'Customized Puppets'],
      priceRange_id: 'Rp 200.000 - Rp 5.000.000',
      priceRange_en: 'Rp 250,000 - Rp 5,000,000',
    },
    {
      id: 'gudegYuDjum',
      name_id: 'Gudeg Yu Djum',
      name_en: 'Gudeg Yu Djum',
      description_id: 'Warung gudeg legendaris dengan resep turun temurun. Menyajikan gudeg khas Yogyakarta dengan cita rasa manis yang khas.',
      description_en: 'Legendary authentic Yogyakarta gudeg with recipes passed down through generations. Sweet, savory, and tender flavors in every bite.',
      category_id: 'culinary',
      category_en: 'culinary',
      products_id: ['Gudeg Kering', 'Gudeg Basah', 'Ayam Kampung', 'Telur Pindang'],
      products_en: ['Dry Gudeg', 'Wet Gudeg', 'Packaged Gudeg', 'Complete Gudeg Set'],
      priceRange_id: 'Rp 15.000 - Rp 35.000',
      priceRange_en: 'Rp 15,000 - Rp 100,000',
    },
    {
      id: 'silverKotagede',
      name_id: 'Silver Kotagede',
      name_en: 'Silver Kotagede',
      description_id: 'Pengrajin perak dengan teknik tatah dan ukir tradisional. Produk perhiasan dan souvenir perak berkualitas ekspor.',
      description_en: 'Fine silver craftsmen from the historic Kotagede area. Creates jewelry and accessories with intricate details and guaranteed quality.',
      category_id: 'jewelryAccessories',
      category_en: 'jewelryAccessories',
      products_id: ['Cincin Perak', 'Gelang', 'Liontin', 'Miniatur Perak'],
      products_en: ['Silver Jewelry', 'Silver Brooches', 'Silver Accessories', 'Custom Silver'],
      priceRange_id: 'Rp 100.000 - Rp 3.000.000',
      priceRange_en: 'Rp 200,000 - Rp 3,000,000',
    },
    {
      id: 'gerabahKasongan',
      name_id: 'Gerabah Kasongan',
      name_en: 'Gerabah Kasongan',
      description_id: 'Sentra kerajinan gerabah dan keramik dengan berbagai bentuk dan ukuran. Dari peralatan dapur hingga dekorasi rumah.',
      description_en: 'Handcrafted ceramics from Kasongan Village, famous for creative ceramic products. Perfect for home decoration and souvenirs.',
      category_id: 'handicrafts',
      category_en: 'handicrafts',
      products_id: ['Vas Bunga', 'Guci', 'Piring Keramik', 'Patung Tanah Liat'],
      products_en: ['Decorative Vases', 'Clay Pots', 'Statues', 'Utensils'],
      priceRange_id: 'Rp 25.000 - Rp 500.000',
      priceRange_en: 'Rp 25,000 - Rp 500,000',
    },
    {
      id: 'bakpiaPathok25',
      name_id: 'Bakpia Pathok 25',
      name_en: 'Bakpia Pathok 25',
      description_id: 'Produsen bakpia legendaris dengan berbagai varian rasa. Oleh-oleh khas Yogyakarta yang wajib dibawa pulang.',
      description_en: 'Legendary Bakpia Pathok with various flavors. The most popular souvenir from Yogyakarta with authentic taste and guaranteed quality.',
      category_id: 'culinary',
      category_en: 'culinary',
      products_id: ['Bakpia Kacang Hijau', 'Bakpia Coklat', 'Bakpia Keju', 'Bakpia Kumbu'],
      products_en: ['Mung Bean Bakpia', 'Chocolate Bakpia', 'Cheese Bakpia', 'Durian Bakpia'],
      priceRange_id: 'Rp 35.000 - Rp 75.000',
      priceRange_en: 'Rp 35,000 - Rp 80,000',
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
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group h-full flex flex-col">
                {/* Image Placeholder */}
                {/* TODO: Replace with real image - use: <img className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" /> */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-javanese-gold-20 to-javanese-gold-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Store className="w-16 h-16 text-javanese-gold-40 opacity-50" />
                  </div>
                  <div className="absolute inset-0 landmark-overlay-gradient"></div>

                  {/* Category Badge - Kanan Atas */}
                  <div className="absolute top-4 right-4">
                    <span className="umkm-category-badge inline-flex items-center gap-2 px-3 py-1 bg-javanese-gold-90 text-javanese-brown rounded-full text-xs border border-javanese-gold backdrop-blur-sm shadow-lg font-medium">
                      <Store className="w-4 h-4 text-javanese-brown" />
                      {t(`filter.${business.category_id}`)}
                    </span>
                  </div>

                  {/* Price Range - Kiri Bawah */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <ShoppingBag className="w-4 h-4 text-[var(--javanese-gold)]" />
                    <span className="text-white text-sm font-semibold">{locale === 'id' ? business.priceRange_id : business.priceRange_en}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Business Name */}
                  <h3 className="text-[var(--javanese-brown-text)] font-serif text-xl mb-3">
                    {locale === 'id' ? business.name_id : business.name_en}
                  </h3>

                  <p className="text-javanese-brown-70 mb-4 text-sm leading-relaxed flex-1">
                    {locale === 'id' ? business.description_id : business.description_en}
                  </p>

                  {/* Products */}
                  <div className="border-t border-[var(--javanese-brown-text)]/10 pt-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-[var(--javanese-gold)]" />
                      <p className="text-xs font-semibold text-javanese-brown-70">
                        {t('card.products')}:
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(locale === 'id' ? business.products_id : business.products_en).map((product: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-javanese-gold-10 rounded text-xs text-javanese-brown-70"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + ' Yogyakarta')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[var(--javanese-gold)] text-javanese-brown border border-transparent dark:bg-white dark:border-[var(--javanese-gold)] dark:text-white rounded-lg hover:opacity-90 transition-all text-sm"
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{t('card.getDirections')}</span>
                    </a>
                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white dark:from-[var(--javanese-terracotta)] dark:to-[var(--javanese-terracotta)] rounded-lg hover:opacity-90 transition-all text-sm">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{t('card.contact')}</span>
                    </button>
                  </div>
                </div>
              </div>
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
    </div>
  );
}
