'use client';

import { useTranslations } from 'next-intl';
import { FadeInSection } from '@/components/shared/FadeInSection';
import { MapPin, Navigation, Award, ExternalLink } from 'lucide-react';

export default function KawasanPage() {
  const t = useTranslations('kawasan');

  const landmarks = [
    {
      key: 'tugu',
      image: '/assets/9f169dd83a8981e7aedcf8dbab93b79692f0d10d.png',
    },
    {
      key: 'kraton',
      image: '/assets/e68ea45479378a6003bae5ab6b785184768f6914.png',
    },
    {
      key: 'panggung',
      image: '/assets/6503837eba87dc083593e8a3ad9478adf75c2c83.png',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
            <MapPin className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
            <span className="text-[var(--javanese-gold)] dark:text-white">
              {t('badge')}
            </span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem' }}>
            {t('title')}
          </h1>

          <p className="text-[var(--javanese-ivory)]/90 text-xl mt-4 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Filosofi Sangkan Paraning Dumadi - Detailed Explanation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInSection>
          <div className="bg-gradient-to-br from-[var(--javanese-ivory)] to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-gray-950/50 p-8 md:p-12 dark:border dark:border-gray-700/50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-[var(--javanese-brown-text)] dark:text-amber-200 mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}>
                {t('philosophy.title')}
              </h2>

              {/* Introduction */}
              <div className="prose prose-lg max-w-none">
                <p className="text-[var(--javanese-brown-text)] opacity-80 dark:text-gray-300 leading-relaxed mb-6">
                  {t('philosophy.intro')}
                </p>

                {/* Sangkan - Origin */}
                <div className="bg-javanese-gold-10 rounded-xl p-6 mb-6 border-l-4 border-[var(--javanese-gold)] dark:border-amber-500">
                  <h3 className="text-[var(--javanese-brown-text)] dark:text-amber-300 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('philosophy.sangkan.title')}
                  </h3>
                  <p className="text-[var(--javanese-brown-text)] opacity-80 dark:text-gray-300 leading-relaxed mb-4">
                    {t('philosophy.sangkan.description')}
                  </p>

                  <div className="space-y-4">
                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-amber-200 mb-2">
                        {t('philosophy.sangkan.panggung.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.sangkan.panggung.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-amber-200 mb-2">
                        {t('philosophy.sangkan.road.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.sangkan.road.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-amber-200 mb-2">
                        {t('philosophy.sangkan.alunAlun.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.sangkan.alunAlun.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-amber-200 mb-2">
                        {t('philosophy.sangkan.sitiHinggil.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.sangkan.sitiHinggil.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-amber-200 mb-2">
                        {t('philosophy.sangkan.pamengkang.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.sangkan.pamengkang.description')}
                      </p>
                    </div>
                  </div>

                  <p className="text-[var(--javanese-brown-text)] opacity-80 dark:text-gray-300 leading-relaxed mt-6 italic">
                    {t('philosophy.sangkan.conclusion')}
                  </p>
                </div>

                {/* Paran - Return to Creator */}
                <div className="bg-javanese-terracotta-10 rounded-xl p-6 mb-6 border-l-4 border-[var(--javanese-terracotta)] dark:border-orange-500">
                  <h3 className="text-[var(--javanese-brown-text)] dark:text-orange-300 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('philosophy.paran.title')}
                  </h3>
                  <p className="text-[var(--javanese-brown-text)] opacity-80 dark:text-gray-300 leading-relaxed mb-4">
                    {t('philosophy.paran.description')}
                  </p>

                  <div className="space-y-4">
                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-orange-200 mb-2">
                        {t('philosophy.paran.tugu.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.paran.tugu.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-orange-200 mb-2">
                        {t('philosophy.paran.margatama.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.paran.margatama.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-orange-200 mb-2">
                        {t('philosophy.paran.margamulya.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.paran.margamulya.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-orange-200 mb-2">
                        {t('philosophy.paran.pangurakan.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.paran.pangurakan.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-orange-200 mb-2">
                        {t('philosophy.paran.vegetation.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.paran.vegetation.description')}
                      </p>
                    </div>

                    <div className="pl-4">
                      <h4 className="text-[var(--javanese-brown-text)] dark:text-orange-200 mb-2">
                        {t('philosophy.paran.alunAlun.title')}
                      </h4>
                      <p className="text-[var(--javanese-brown-text)] opacity-70 dark:text-gray-400 leading-relaxed">
                        {t('philosophy.paran.alunAlun.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Interactive Map Section - temporarily hidden */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInSection>
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 bg-[var(--javanese-brown-bg)] text-[var(--javanese-ivory)] dark:bg-[var(--javanese-ivory)] dark:text-primary-foreground">
              <div className="flex items-center gap-3">
                <Navigation className="w-6 h-6 text-[var(--javanese-gold)]" />
                <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('map.title')}
                </h2>
              </div>
              <p className="opacity-80 mt-2">
                {t('map.subtitle')}
              </p>
            </div>

            <div className="aspect-video bg-muted">
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <MapPin className="w-16 h-16 text-[var(--javanese-brown-text)]/30 mb-4" />
                <h3 className="text-[var(--javanese-brown-text)] mb-2">
                  {t('map.notConfigured')}
                </h3>
                <p className="text-[var(--javanese-brown-text)] opacity-60 max-w-md">
                  {t('map.notConfiguredDesc')}
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section> */}

      {/* Landmarks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-[var(--javanese-brown-text)] mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}>
              {t('landmarks.title')}
            </h2>
            <p className="text-[var(--javanese-brown-text)] opacity-60 max-w-2xl mx-auto">
              {t('landmarks.subtitle')}
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landmarks.map((landmark, index) => (
            <FadeInSection key={landmark.key} delay={index * 100} direction="up">
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={landmark.image}
                    alt={t(`landmarks.${landmark.key}.name`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Lighter overlay for landmark cards */}
                  <div className="absolute inset-0 landmark-overlay-gradient"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--javanese-gold)] text-[#4A2C2A] flex items-center justify-center mb-2">
                      {index + 1}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-[var(--javanese-brown-text)] mb-2">
                    {t(`landmarks.${landmark.key}.name`)}
                  </h3>
                  <p className="text-[var(--javanese-brown-text)] opacity-70">
                    {t(`landmarks.${landmark.key}.description`)}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* UNESCO World Heritage Section */}
      <section className="batik-pattern py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection direction="up">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full border border-javanese-gold/30">
                  <Award className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
                  <span className="text-[var(--javanese-gold)] dark:text-white">
                    {t('unesco.badge')}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-[var(--javanese-brown-text)] mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>
                {t('unesco.title')}
              </h2>

              {/* Description */}
              <div className="text-[var(--javanese-brown-text)] opacity-80 leading-relaxed mb-8 whitespace-pre-line">
                {t('unesco.description')}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="https://whc.unesco.org/en/list/1671/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--javanese-gold)] text-[#1A1412] rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  <span className="font-medium">{t('unesco.ctaButton')}</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
