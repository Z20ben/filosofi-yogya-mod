'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2, Eye } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '../../shared/StatusBadge';
import { Galeri } from '@/lib/admin/types';
import { formatDate } from '@/lib/admin/utils/slug';
import Image from 'next/image';

export const galeriColumns: ColumnDef<Galeri>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image_url',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('image_url') as string;
      return (
        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
          <Image
            src={imageUrl || '/placeholder.jpg'}
            alt={row.original.title_id}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'title_id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col max-w-md">
          <span className="font-medium text-[var(--javanese-brown-text)] truncate">
            {row.getValue('title_id')}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {row.original.title_en}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      const colorMap: Record<string, string> = {
        Kawasan: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        Wisata: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        UMKM: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        Agenda: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        Budaya: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[category] || 'bg-gray-100 text-gray-800'}`}>
          {category}
        </span>
      );
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.original.tags.slice(0, 2);
      const remaining = row.original.tags.length - 2;
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
          {remaining > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
              +{remaining}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'photographer',
    header: 'Photographer',
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.photographer || '-'}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <StatusBadge status={row.getValue('status')} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4"
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="text-sm">{formatDate(row.getValue('updated_at'))}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const galeri = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(galeri.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Image
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
