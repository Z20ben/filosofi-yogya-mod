'use client';

import { useLocale } from 'next-intl';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
          {locale === 'id' ? 'Laporan & Statistik' : 'Reports & Statistics'}
        </h2>
        <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
          {locale === 'id' ? 'Lihat analitik dan statistik website' : 'View website analytics and statistics'}
        </p>
      </div>

      <div className="bg-card p-8 rounded-xl border border-border text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[var(--javanese-gold)]/20 to-[var(--javanese-gold)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-[var(--javanese-brown-text)]" />
        </div>
        <h3 className="text-xl font-bold text-[var(--javanese-brown-text)] mb-2">
          {locale === 'id' ? 'Halaman Sedang Dikembangkan' : 'Page Under Development'}
        </h3>
        <p className="text-[var(--javanese-brown-text)]/60">
          {locale === 'id'
            ? 'Fitur analitik dan laporan akan segera tersedia.'
            : 'Analytics and reporting feature will be available soon.'}
        </p>
      </div>
    </div>
  );
}
