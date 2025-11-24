'use client';

import { useTranslations } from 'next-intl';
import { Book } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';

export default function SejarahPage() {
  const t = useTranslations('sejarah');

  const sections = ['unesco', 'universal', 'philosophy', 'livingHeritage', 'responsibility'] as const;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
            <Book className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
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
        </div>
      </section>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <FadeInSection>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/assets/886c6bc1ce68b717af693495bab82e00764eb15c.png"
              alt={t('title')}
              className="w-full h-full object-cover"
            />
          </div>
        </FadeInSection>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <FadeInSection key={section} delay={index * 100}>
              <div>
                <h2 className="text-[var(--javanese-brown-text)] mb-4 text-2xl font-serif">
                  {t(`sections.${section}.title`)}
                </h2>
                <p className="text-javanese-brown-70 leading-relaxed text-lg">
                  {t(`sections.${section}.content`)}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Decorative Section with CTA */}
      <section className="batik-pattern py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
              <h2 className="text-[var(--javanese-brown-text)] mb-4 font-serif text-3xl">
                {t('cta.title')}
              </h2>
              <p className="text-javanese-brown-70 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
