'use client';

import { useLocale } from 'next-intl';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/tables/DataTable';
import { wisataColumns } from '@/components/admin/tables/columns/wisata-columns';
import { mockWisataData } from '@/lib/admin/mock-data/wisata';
import { Button } from '@/components/ui/button';

export default function WisataPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Potensi Wisata' : 'Tourism Potential'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola data destinasi wisata budaya' : 'Manage cultural tourism destination data'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href={`/${locale}/admin/wisata/new`}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>{locale === 'id' ? 'Tambah Wisata' : 'Add Tourism'}</span>
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={wisataColumns}
        data={mockWisataData}
        searchKey="name_id"
        searchPlaceholder={locale === 'id' ? 'Cari destinasi wisata...' : 'Search tourism destination...'}
        filterableColumns={[
          {
            id: 'category',
            title: locale === 'id' ? 'Kategori' : 'Category',
            options: [
              { label: 'Alam', value: 'Alam' },
              { label: 'Budaya', value: 'Budaya' },
              { label: 'Kuliner', value: 'Kuliner' },
              { label: 'Petualangan', value: 'Petualangan' },
              { label: 'Religi', value: 'Religi' },
              { label: 'Belanja', value: 'Belanja' },
              { label: 'Lainnya', value: 'Lainnya' },
            ],
          },
          {
            id: 'difficulty_level',
            title: locale === 'id' ? 'Tingkat Kesulitan' : 'Difficulty',
            options: [
              { label: 'Easy', value: 'Easy' },
              { label: 'Moderate', value: 'Moderate' },
              { label: 'Hard', value: 'Hard' },
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
