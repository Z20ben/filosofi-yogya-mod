'use client';

import { useLocale } from 'next-intl';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/admin/tables/DataTable';
import { agendaColumns } from '@/components/admin/tables/columns/agenda-columns';
import { mockAgendaData } from '@/lib/admin/mock-data/agenda';
import { Button } from '@/components/ui/button';

export default function AgendaPage() {
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Agenda Seni & Budaya' : 'Art & Culture Events'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola kalender acara seni dan budaya' : 'Manage art and culture event calendar'}
          </p>
        </div>
        <Link href={`/${locale}/admin/agenda/new`}>
          <Button size="sm" className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
            <Plus className="w-4 h-4 mr-2" />
            {locale === 'id' ? 'Tambah Agenda' : 'Add Event'}
          </Button>
        </Link>
      </div>
      <DataTable
        columns={agendaColumns}
        data={mockAgendaData}
        searchKey="event_name_id"
        searchPlaceholder={locale === 'id' ? 'Cari nama acara...' : 'Search event...'}
        filterableColumns={[
          {
            id: 'category',
            title: locale === 'id' ? 'Kategori' : 'Category',
            options: [
              { label: 'Seni', value: 'Seni' },
              { label: 'Budaya', value: 'Budaya' },
              { label: 'Festival', value: 'Festival' },
              { label: 'Pameran', value: 'Pameran' },
              { label: 'Pertunjukan', value: 'Pertunjukan' },
              { label: 'Workshop', value: 'Workshop' },
            ],
          },
          { id: 'status', title: 'Status', options: [{ label: 'Published', value: 'published' }, { label: 'Draft', value: 'draft' }] },
        ]}
      />
    </div>
  );
}
