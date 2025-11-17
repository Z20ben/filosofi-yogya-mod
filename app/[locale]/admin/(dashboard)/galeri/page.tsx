'use client';

import { useLocale } from 'next-intl';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/tables/DataTable';
import { galeriColumns } from '@/components/admin/tables/columns/galeri-columns';
import { mockGaleriData } from '@/lib/admin/mock-data/galeri';
import { Button } from '@/components/ui/button';

export default function GaleriPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Galeri Foto' : 'Photo Gallery'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id'
              ? 'Kelola koleksi foto dan galeri'
              : 'Manage photo collections and galleries'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href={`/${locale}/admin/galeri/new`}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>{locale === 'id' ? 'Upload Foto' : 'Upload Photo'}</span>
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={galeriColumns}
        data={mockGaleriData}
        searchKey="title_id"
        searchPlaceholder={
          locale === 'id'
            ? 'Cari judul foto...'
            : 'Search photo title...'
        }
        filterableColumns={[
          {
            id: 'category',
            title: locale === 'id' ? 'Kategori' : 'Category',
            options: [
              { label: 'Kawasan', value: 'Kawasan' },
              { label: 'Wisata', value: 'Wisata' },
              { label: 'UMKM', value: 'UMKM' },
              { label: 'Agenda', value: 'Agenda' },
              { label: 'Budaya', value: 'Budaya' },
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
