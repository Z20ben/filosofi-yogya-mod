'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2, MapPin, Star, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StatusBadge } from '../../shared/StatusBadge';
import { Wisata } from '@/lib/admin/types';

export const wisataColumns: ColumnDef<Wisata>[] = [
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
    accessorKey: 'name_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-md">
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue('name_id')}</span>
          {row.original.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
        </div>
        <p className="text-xs text-muted-foreground">{row.original.name_en}</p>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const cat = row.getValue('category') as string;
      const colors: Record<string, string> = {
        Alam: 'bg-green-100 text-green-800 dark:bg-green-900/30',
        Budaya: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30',
        Kuliner: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30',
        Petualangan: 'bg-red-100 text-red-800 dark:bg-red-900/30',
        Religi: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30',
        Belanja: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30',
        Lainnya: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30',
      };
      return <span className={`inline-flex px-2 py-0.5 rounded text-xs ${colors[cat] || colors.Lainnya}`}>{cat}</span>;
    },
  },
  {
    accessorKey: 'district',
    header: 'District',
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <MapPin className="h-3 w-3 text-muted-foreground" />
        <span>{row.getValue('district')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'difficulty_level',
    header: 'Difficulty',
    cell: ({ row }) => {
      const level = row.getValue('difficulty_level') as string | undefined;
      if (!level) return <span className="text-xs text-muted-foreground">-</span>;
      const colors: Record<string, string> = {
        Easy: 'bg-green-100 text-green-700 dark:bg-green-900/30',
        Moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30',
        Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30',
      };
      return <span className={`inline-flex px-2 py-0.5 rounded text-xs ${colors[level]}`}>{level}</span>;
    },
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      const duration = row.getValue('duration') as string | undefined;
      return duration ? (
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span>{duration}</span>
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'entry_fee_type',
    header: 'Entry Fee',
    cell: ({ row }) => {
      const type = row.getValue('entry_fee_type');
      return type === 'free' ? (
        <span className="text-green-600 dark:text-green-400 text-sm font-medium">Free</span>
      ) : (
        <span className="text-sm">Rp {row.original.entry_fee_amount?.toLocaleString('id-ID')}</span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
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
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
