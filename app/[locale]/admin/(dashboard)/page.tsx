'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Store, Image as ImageIcon, Calendar, MapPin, Plus, Activity, Database, Palmtree, Landmark, BookOpen, TrendingUp, FileText, CheckCircle2 } from 'lucide-react';
import { SimpleCounter } from '@/components/shared/SimpleCounter';
import Link from 'next/link';
import { mockUMKMData } from '@/lib/admin/mock-data/umkm';
import { mockGaleriData } from '@/lib/admin/mock-data/galeri';
import { mockAgendaData } from '@/lib/admin/mock-data/agenda';
import { mockKawasanData } from '@/lib/admin/mock-data/kawasan';
import { mockWisataData } from '@/lib/admin/mock-data/wisata';
import { mockSejarahData } from '@/lib/admin/mock-data/sejarah';
import { formatDate } from '@/lib/admin/utils/slug';

export default function AdminDashboardPage() {
  const locale = useLocale();

  // Calculate real stats from mock data
  const stats = {
    totalUmkm: mockUMKMData.length,
    totalGallery: mockGaleriData.length,
    totalEvents: mockAgendaData.length,
    totalKawasan: mockKawasanData.length,
    totalWisata: mockWisataData.length,
    totalSejarah: mockSejarahData.length,
  };

  // Calculate status counts
  const statusCounts = {
    published: [
      ...mockUMKMData.filter((i) => i.status === 'published'),
      ...mockGaleriData.filter((i) => i.status === 'published'),
      ...mockAgendaData.filter((i) => i.status === 'published'),
      ...mockKawasanData.filter((i) => i.status === 'published'),
      ...mockWisataData.filter((i) => i.status === 'published'),
      ...mockSejarahData.filter((i) => i.status === 'published'),
    ].length,
    draft: [
      ...mockUMKMData.filter((i) => i.status === 'draft'),
      ...mockGaleriData.filter((i) => i.status === 'draft'),
      ...mockAgendaData.filter((i) => i.status === 'draft'),
      ...mockKawasanData.filter((i) => i.status === 'draft'),
      ...mockWisataData.filter((i) => i.status === 'draft'),
      ...mockSejarahData.filter((i) => i.status === 'draft'),
    ].length,
  };

  // Get recent items
  const allItems = [
    ...mockUMKMData.map((i) => ({ ...i, type: 'UMKM', typeName: locale === 'id' ? 'UMKM' : 'MSME', name: i.business_name })),
    ...mockGaleriData.map((i) => ({ ...i, type: 'Galeri', typeName: locale === 'id' ? 'Galeri' : 'Gallery', name: i.title_id })),
    ...mockAgendaData.map((i) => ({ ...i, type: 'Agenda', typeName: locale === 'id' ? 'Agenda' : 'Event', name: i.event_name_id })),
    ...mockKawasanData.map((i) => ({ ...i, type: 'Kawasan', typeName: locale === 'id' ? 'Kawasan' : 'Landmark', name: i.name_id })),
    ...mockWisataData.map((i) => ({ ...i, type: 'Wisata', typeName: locale === 'id' ? 'Wisata' : 'Tourism', name: i.name_id })),
    ...mockSejarahData.map((i) => ({ ...i, type: 'Sejarah', typeName: locale === 'id' ? 'Sejarah' : 'History', name: i.title_id })),
  ].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards - Content */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--javanese-brown-text)] mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {locale === 'id' ? 'Statistik Konten' : 'Content Statistics'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-card p-4 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center mb-3">
              <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-[var(--javanese-brown-text)] mb-1">
              <SimpleCounter end={stats.totalUmkm} />
            </div>
            <p className="text-xs text-[var(--javanese-brown-text)]/60">UMKM</p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center mb-3">
              <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-[var(--javanese-brown-text)] mb-1">
              <SimpleCounter end={stats.totalGallery} />
            </div>
            <p className="text-xs text-[var(--javanese-brown-text)]/60">{locale === 'id' ? 'Galeri' : 'Gallery'}</p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-[var(--javanese-brown-text)] mb-1">
              <SimpleCounter end={stats.totalEvents} />
            </div>
            <p className="text-xs text-[var(--javanese-brown-text)]/60">Agenda</p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-lg flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-[var(--javanese-brown-text)] mb-1">
              <SimpleCounter end={stats.totalKawasan} />
            </div>
            <p className="text-xs text-[var(--javanese-brown-text)]/60">Kawasan</p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-lg flex items-center justify-center mb-3">
              <Palmtree className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-[var(--javanese-brown-text)] mb-1">
              <SimpleCounter end={stats.totalWisata} />
            </div>
            <p className="text-xs text-[var(--javanese-brown-text)]/60">Wisata</p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500/20 to-teal-500/10 rounded-lg flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-[var(--javanese-brown-text)] mb-1">
              <SimpleCounter end={stats.totalSejarah} />
            </div>
            <p className="text-xs text-[var(--javanese-brown-text)]/60">Sejarah</p>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                <SimpleCounter end={statusCounts.published} />
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">{locale === 'id' ? 'Konten Published' : 'Published Content'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                <SimpleCounter end={statusCounts.draft} />
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">{locale === 'id' ? 'Konten Draft' : 'Draft Content'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--javanese-brown-text)] mb-3 sm:mb-4">
          {locale === 'id' ? 'Aksi Cepat' : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href={`/${locale}/admin/umkm`}
            className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:shadow-md transition-all group"
          >
            <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {locale === 'id' ? 'Tambah UMKM' : 'Add MSME'}
            </span>
          </Link>

          <Link
            href={`/${locale}/admin/galeri`}
            className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg hover:shadow-md transition-all group"
          >
            <Plus className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {locale === 'id' ? 'Upload Foto' : 'Upload Photo'}
            </span>
          </Link>

          <Link
            href={`/${locale}/admin/agenda`}
            className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:shadow-md transition-all group"
          >
            <Plus className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {locale === 'id' ? 'Buat Agenda' : 'Create Event'}
            </span>
          </Link>

          <Link
            href={`/${locale}/admin/wisata`}
            className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg hover:shadow-md transition-all group"
          >
            <Plus className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              {locale === 'id' ? 'Tambah Wisata' : 'Add Tourism'}
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Items */}
      <div className="bg-card p-4 sm:p-6 rounded-xl border border-border">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--javanese-brown-text)] mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          {locale === 'id' ? 'Aktivitas Terbaru' : 'Recent Activity'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-[var(--javanese-brown-text)]/60 pb-3">{locale === 'id' ? 'Nama' : 'Name'}</th>
                <th className="text-left text-xs font-semibold text-[var(--javanese-brown-text)]/60 pb-3">{locale === 'id' ? 'Tipe' : 'Type'}</th>
                <th className="text-left text-xs font-semibold text-[var(--javanese-brown-text)]/60 pb-3">Status</th>
                <th className="text-left text-xs font-semibold text-[var(--javanese-brown-text)]/60 pb-3">{locale === 'id' ? 'Terakhir Update' : 'Last Updated'}</th>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item) => (
                <tr key={`${item.type}-${item.id}`} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3">
                    <span className="text-sm font-medium text-[var(--javanese-brown-text)]">{item.name}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 rounded bg-muted text-[var(--javanese-brown-text)]">{item.typeName}</span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30'
                          : item.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30'
                      }`}
                    >
                      {item.status === 'published' ? 'Published' : item.status === 'draft' ? 'Draft' : 'Archived'}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-[var(--javanese-brown-text)]/60">{formatDate(item.updated_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-[var(--javanese-gold)]/10 to-[var(--javanese-gold)]/5 border border-[var(--javanese-gold)]/30 rounded-xl p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--javanese-gold)]/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--javanese-brown-text)]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[var(--javanese-brown-text)] mb-2">
              {locale === 'id' ? 'Selamat Datang di Dashboard Admin' : 'Welcome to Admin Dashboard'}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--javanese-brown-text)]/70 mb-3">
              {locale === 'id'
                ? 'Ini adalah versi pengembangan awal dari dashboard admin. Gunakan menu di sebelah kiri untuk mengelola konten website Ensiklopedia Sumbu Filosofi Yogyakarta.'
                : 'This is an early development version of the admin dashboard. Use the menu on the left to manage content for the Yogyakarta Philosophical Axis Encyclopedia website.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--javanese-brown-text)]/60">
              <Database className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>
                {locale === 'id' ? 'Data saat ini menggunakan mock data untuk demonstrasi' : 'Currently using mock data for demonstration'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
