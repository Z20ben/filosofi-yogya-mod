'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MapPin, Book, Store, Calendar, Image as ImageIcon, ArrowRight, Video, Landmark, ExternalLink } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { ImageLightbox } from '@/components/shared/ImageLightbox';
import { HeroSlideshow } from './HeroSlideshow';
import { StatisticsSection } from './StatisticsSection';

export function HomePageContent() {
  const t = useTranslations('home');

  const features = [
    {
      icon: MapPin,
      translationKey: 'kawasan',
      href: '/kawasan-sumbu-filosofi',
    },
    {
      icon: Book,
      translationKey: 'sejarah',
      href: '/sejarah-dan-riset',
    },
    {
      icon: Store,
      translationKey: 'umkm',
      href: '/potensi-umkm/katalog',
    },
    {
      icon: Calendar,
      translationKey: 'agenda',
      href: '/agenda-seni-budaya',
    },
    {
      icon: ImageIcon,
      translationKey: 'galeri',
      href: '/galeri-foto',
    },
    {
      icon: Video,
      translationKey: 'cctv',
      href: 'https://cctv.jogjakota.go.id/',
      isExternal: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow */}
      <HeroSlideshow
        title={t('title')}
        subtitle={t('subtitle')}
        welcomeText={t('welcome')}
        exploreText={t('explore')}
      />

      {/* Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInSection direction="right">
            <h2
              className="text-[var(--javanese-brown-text)] mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}
            >
              {t('aboutTitle')}
            </h2>
            <p className="text-[var(--javanese-brown-text)] opacity-90 leading-relaxed mb-4">
              {t('description')}
            </p>
            <p className="text-[var(--javanese-brown-text)] opacity-90 leading-relaxed mb-6">
              {t('description2')}
            </p>
            <p className="text-[var(--javanese-brown-text)] opacity-90 leading-relaxed mb-8">
              {t('description3')}
            </p>

            <Link
              href="/kawasan-sumbu-filosofi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--javanese-gold)] text-[#1A1412] rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              <Book className="w-5 h-5" />
              <span className="font-medium">{t('learnMore')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeInSection>

          <FadeInSection direction="left" delay={200}>
            {/* Old Image - Commented for reference */}
            {/* <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <ImageLightbox
                src="/assets/886c6bc1ce68b717af693495bab82e00764eb15c.png"
                alt={t('imageAlt')}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-javanese-brown/20 to-transparent pointer-events-none"></div>
            </div> */}

            {/* Google Maps Embed */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] w-full">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1_NlABnyyjY7LOPr-oENcLjMhJQbpFRQ&ehbc=2E312F&noprof=1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  allow="geolocation"
                  title={t('imageAlt')}
                ></iframe>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Statistics Section */}
      <StatisticsSection
        title={t('statisticsTitle')}
        subtitle={t('statisticsDescription')}
        badgeText={t('statisticsLabel')}
        stats={{
          destinations: t('stats.tourism'),
          businesses: t('stats.umkm'),
          photos: t('stats.gallery'),
          events: t('stats.events'),
        }}
      />

      {/* Features Grid */}
      <section className="batik-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2
                className="text-[var(--javanese-brown-text)] mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}
              >
                {t('featured')}
              </h2>
              <p className="text-[var(--javanese-brown-text)] opacity-80 max-w-2xl mx-auto">
                {t('featuredDescription')}
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isExternal = feature.isExternal || false;
              const tCommon = useTranslations('common');

              return (
                <FadeInSection key={index} delay={index * 100} direction="up">
                  <Link
                    href={feature.href}
                    className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all group text-left w-full h-full block"
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-[var(--javanese-gold)] dark:text-white" />
                    </div>

                    <h3 className="text-[var(--javanese-brown-text)] mb-2 text-xl font-semibold">
                      {t(`features.${feature.translationKey}.title`)}
                    </h3>

                    <p className="text-[var(--javanese-brown-text)] opacity-85 mb-4">
                      {t(`features.${feature.translationKey}.description`)}
                    </p>

                    <div className="flex items-center gap-2 text-[var(--javanese-gold)] dark:text-white group-hover:gap-3 transition-all">
                      <span>
                        {isExternal
                          ? t(`features.${feature.translationKey}.visit`)
                          : tCommon('learnMore')
                        }
                      </span>
                      {isExternal ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </div>
                  </Link>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeInSection direction="up">
          <div className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] rounded-2xl p-12 text-center shadow-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
              <Landmark className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
              <span className="text-[var(--javanese-gold)] dark:text-white">
                {t('cta.badge')}
              </span>
            </div>

            <h2
              className="text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}
            >
              {t('cta.title')}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://jogjaheritage.com/reservasi/reservasi_user"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--javanese-gold)] text-[#1A1412] rounded-lg hover:opacity-90 transition-all shadow-lg"
              >
                {t('cta.bookNow')}
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/potensi-wisata"
                className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                {t('cta.viewDestinations')}
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
