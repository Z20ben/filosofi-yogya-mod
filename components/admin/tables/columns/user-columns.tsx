'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2, Shield, ShieldCheck, Eye } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/lib/admin/mock-data/users';
import { formatDate } from '@/lib/admin/utils/slug';

export const userColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-[var(--javanese-brown-text)]">{row.getValue('name')}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as User['role'];
      const roleConfig = {
        Admin: {
          icon: <ShieldCheck className="w-3 h-3" />,
          className: 'bg-red-100 text-red-800 dark:bg-red-900/30',
        },
        Editor: {
          icon: <Pencil className="w-3 h-3" />,
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30',
        },
        Viewer: {
          icon: <Eye className="w-3 h-3" />,
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30',
        },
      };
      const config = roleConfig[role];
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${config.className}`}>
          {config.icon}
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as User['status'];
      return (
        <span
          className={`inline-flex px-2 py-1 rounded text-xs ${
            status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30'
          }`}
        >
          {status === 'active' ? 'Active' : 'Inactive'}
        </span>
      );
    },
  },
  {
    accessorKey: 'last_login',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Last Login <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const lastLogin = row.getValue('last_login') as Date | undefined;
      return <span className="text-sm">{lastLogin ? formatDate(lastLogin) : '-'}</span>;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Joined <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('created_at') as Date;
      return <span className="text-sm">{formatDate(createdAt)}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Shield className="mr-2 h-4 w-4" />
            Change Role
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
