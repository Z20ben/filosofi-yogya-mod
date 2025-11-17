'use client';

import { useLocale } from 'next-intl';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/tables/DataTable';
import { sejarahColumns } from '@/components/admin/tables/columns/sejarah-columns';
import { mockSejarahData } from '@/lib/admin/mock-data/sejarah';
import { Button } from '@/components/ui/button';

export default function SejarahPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Sejarah & Riset' : 'History & Research'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola artikel sejarah dan hasil riset' : 'Manage historical articles and research'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href={`/${locale}/admin/sejarah/new`}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>{locale === 'id' ? 'Tambah Artikel' : 'Add Article'}</span>
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={sejarahColumns}
        data={mockSejarahData}
        searchKey="title_id"
        searchPlaceholder={locale === 'id' ? 'Cari judul artikel...' : 'Search article title...'}
        filterableColumns={[
          {
            id: 'category',
            title: locale === 'id' ? 'Kategori' : 'Category',
            options: [
              { label: 'Sejarah', value: 'Sejarah' },
              { label: 'Arkeologi', value: 'Arkeologi' },
              { label: 'Antropologi', value: 'Antropologi' },
              { label: 'Filsafat', value: 'Filsafat' },
              { label: 'Seni', value: 'Seni' },
              { label: 'Arsitektur', value: 'Arsitektur' },
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
