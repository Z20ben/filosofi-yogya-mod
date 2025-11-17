'use client';

import { useLocale } from 'next-intl';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/tables/DataTable';
import { kawasanColumns } from '@/components/admin/tables/columns/kawasan-columns';
import { mockKawasanData } from '@/lib/admin/mock-data/kawasan';
import { Button } from '@/components/ui/button';

export default function KawasanPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Kawasan & Landmarks' : 'Districts & Landmarks'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola data kawasan dan landmark budaya' : 'Manage district and cultural landmark data'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href={`/${locale}/admin/kawasan/new`}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>{locale === 'id' ? 'Tambah Kawasan' : 'Add Landmark'}</span>
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={kawasanColumns}
        data={mockKawasanData}
        searchKey="name_id"
        searchPlaceholder={locale === 'id' ? 'Cari nama kawasan...' : 'Search landmark name...'}
        filterableColumns={[
          {
            id: 'category',
            title: locale === 'id' ? 'Kategori' : 'Category',
            options: [
              { label: 'Keraton', value: 'Keraton' },
              { label: 'Candi', value: 'Candi' },
              { label: 'Alun-alun', value: 'Alun-alun' },
              { label: 'Kampung', value: 'Kampung' },
              { label: 'Museum', value: 'Museum' },
              { label: 'Tugu', value: 'Tugu' },
              { label: 'Lainnya', value: 'Lainnya' },
            ],
          },
          {
            id: 'status',
            title: 'Status',
            options: [
              { label: 'Published', value: 'published' },
              { label: 'Draft', value: 'draft' },
              { label: 'Archived', value: 'archived' },
            ],
          },
        ]}
      />
    </div>
  );
}
