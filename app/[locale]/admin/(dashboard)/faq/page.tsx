'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin/tables/DataTable';
import { getFaqColumns } from '@/components/admin/tables/columns/faq-columns';
import { mockFAQData, FAQ } from '@/lib/admin/mock-data/faq';

export default function FAQPage() {
  const locale = useLocale();
  const [faqData, setFaqData] = useState<FAQ[]>(mockFAQData);

  // Handle toggle status
  const handleToggleStatus = (id: string, newStatus: 'active' | 'inactive') => {
    setFaqData((prev) =>
      prev.map((faq) =>
        faq.id === id
          ? { ...faq, status: newStatus, updated_at: new Date() }
          : faq
      )
    );
    console.log('FAQ status updated:', id, newStatus);
    // TODO: Call API to update status in database
  };

  // Handle reorder
  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newData = [...faqData];
    const [movedItem] = newData.splice(fromIndex, 1);
    newData.splice(toIndex, 0, movedItem);

    // Update order numbers
    const reorderedData = newData.map((item, index) => ({
      ...item,
      order: index + 1,
      updated_at: new Date(),
    }));

    setFaqData(reorderedData);
    console.log('FAQ reordered:', fromIndex, '->', toIndex);
    // TODO: Call API to update order in database
  };

  const columns = getFaqColumns({ onToggleStatus: handleToggleStatus, onReorder: handleReorder });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Manajemen FAQ' : 'FAQ Management'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola pertanyaan yang sering diajukan' : 'Manage frequently asked questions'}
          </p>
        </div>
        <Link href={`/${locale}/admin/faq/new`}>
          <Button size="sm" className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
            <Plus className="w-4 h-4 mr-2" />
            {locale === 'id' ? 'Tambah FAQ' : 'Add FAQ'}
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={faqData}
        searchKey="question_id"
        searchPlaceholder={locale === 'id' ? 'Cari pertanyaan...' : 'Search question...'}
        filterableColumns={[
          {
            id: 'category_id',
            title: locale === 'id' ? 'Kategori' : 'Category',
            options: locale === 'id' ? [
              { label: 'Umum', value: 'Umum' },
              { label: 'Navigasi', value: 'Navigasi' },
              { label: 'UMKM', value: 'UMKM' },
              { label: 'Acara', value: 'Acara' },
              { label: 'Kontak', value: 'Kontak' },
            ] : [
              { label: 'General', value: 'General' },
              { label: 'Navigation', value: 'Navigation' },
              { label: 'MSME', value: 'MSME' },
              { label: 'Events', value: 'Events' },
              { label: 'Contact', value: 'Contact' },
            ],
          },
          {
            id: 'status',
            title: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        ]}
      />
    </div>
  );
}
