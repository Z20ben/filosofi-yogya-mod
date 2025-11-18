'use client';

import { useTranslations } from 'next-intl';
import { InteractiveMapContent } from '@/components/map/InteractiveMapContent';

export default function PetaInteraktifPage() {
  const t = useTranslations('interactiveMap');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('title')}
          </h1>
          <p className="text-white/90 text-lg max-w-3xl">
            {t('subtitle')}
          </p>
        </div>
      </header>

      {/* Map Content */}
      <InteractiveMapContent />
    </div>
  );
}
