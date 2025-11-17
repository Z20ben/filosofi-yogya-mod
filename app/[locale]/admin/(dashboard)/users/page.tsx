'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Plus, ShieldCheck, Pencil, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DataTable } from '@/components/admin/tables/DataTable';
import { userColumns } from '@/components/admin/tables/columns/user-columns';
import { mockUsersData } from '@/lib/admin/mock-data/users';

export default function UsersPage() {
  const locale = useLocale();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const getRoleStats = () => {
    return {
      admin: mockUsersData.filter((u) => u.role === 'Admin').length,
      editor: mockUsersData.filter((u) => u.role === 'Editor').length,
      viewer: mockUsersData.filter((u) => u.role === 'Viewer').length,
    };
  };

  const stats = getRoleStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Manajemen Pengguna' : 'User Management'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola pengguna dan hak akses' : 'Manage users and permissions'}
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
              <Plus className="w-4 h-4 mr-2" />
              {locale === 'id' ? 'Tambah User' : 'Add User'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{locale === 'id' ? 'Tambah Pengguna Baru' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground text-center py-8">
              {locale === 'id' ? '🔨 Form akan terintegrasi dengan backend' : '🔨 Form will be integrated with backend'}
            </p>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-red-700 dark:text-red-300">{stats.admin}</p>
              <p className="text-sm text-red-600 dark:text-red-400">Admin</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Pencil className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{stats.editor}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Editor</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">{stats.viewer}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Viewer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users DataTable */}
      <DataTable
        columns={userColumns}
        data={mockUsersData}
        searchKey="name"
        searchPlaceholder={locale === 'id' ? 'Cari nama atau email...' : 'Search name or email...'}
        filterableColumns={[
          {
            id: 'role',
            title: locale === 'id' ? 'Peran' : 'Role',
            options: [
              { label: 'Admin', value: 'Admin' },
              { label: 'Editor', value: 'Editor' },
              { label: 'Viewer', value: 'Viewer' },
            ],
          },
          {
            id: 'status',
            title: 'Status',
            options: [
              { label: locale === 'id' ? 'Aktif' : 'Active', value: 'active' },
              { label: locale === 'id' ? 'Nonaktif' : 'Inactive', value: 'inactive' },
            ],
          },
        ]}
      />
    </div>
  );
}
