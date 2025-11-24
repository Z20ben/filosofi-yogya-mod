'use client';

import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import { FadeInSection } from '@/components/shared/FadeInSection';

export default function TentangPage() {
  const t = useTranslations('tentang');

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="wayang-border bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-[var(--javanese-ivory)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-javanese-gold/20 backdrop-blur-sm rounded-full mb-6 border border-javanese-gold/30">
            <Info className="w-5 h-5 text-[var(--javanese-gold)] dark:text-white" />
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

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeInSection>
          <div className="space-y-8">
            <p className="text-javanese-brown-70 leading-relaxed text-lg">
              {t('content.paragraph1')}
            </p>
            <p className="text-javanese-brown-70 leading-relaxed text-lg">
              {t('content.paragraph2')}
            </p>
            <p className="text-javanese-brown-70 leading-relaxed text-lg">
              {t('content.paragraph3')}
            </p>
          </div>
        </FadeInSection>
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
