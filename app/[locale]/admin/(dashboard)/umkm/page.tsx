'use client';

import { useLocale } from 'next-intl';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/tables/DataTable';
import { umkmColumns } from '@/components/admin/tables/columns/umkm-columns';
import { mockUMKMData } from '@/lib/admin/mock-data/umkm';
import { Button } from '@/components/ui/button';

export default function UMKMPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Potensi UMKM' : 'MSME Potential'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id'
              ? 'Kelola data UMKM dan produk lokal'
              : 'Manage MSME and local product data'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href={`/${locale}/admin/umkm/new`}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>{locale === 'id' ? 'Tambah UMKM' : 'Add MSME'}</span>
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={umkmColumns}
        data={mockUMKMData}
        searchKey="business_name"
        searchPlaceholder={
          locale === 'id'
            ? 'Cari nama usaha...'
            : 'Search business name...'
        }
        filterableColumns={[
          {
            id: 'category',
            title: locale === 'id' ? 'Kategori' : 'Category',
            options: [
              { label: 'Kerajinan', value: 'Kerajinan' },
              { label: 'Kuliner', value: 'Kuliner' },
              { label: 'Fashion', value: 'Fashion' },
              { label: 'Jasa', value: 'Jasa' },
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
