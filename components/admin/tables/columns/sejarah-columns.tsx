'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2, Star, BookOpen, Quote } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StatusBadge } from '../../shared/StatusBadge';
import { Sejarah } from '@/lib/admin/types';
import { formatDate } from '@/lib/admin/utils/slug';

export const sejarahColumns: ColumnDef<Sejarah>[] = [
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
    accessorKey: 'title_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-lg">
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue('title_id')}</span>
          {row.original.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{row.original.author}</p>
        {row.original.author_affiliation && (
          <p className="text-xs text-muted-foreground/80">{row.original.author_affiliation}</p>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const cat = row.getValue('category') as string;
      const colors: Record<string, string> = {
        Sejarah: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30',
        Arkeologi: 'bg-stone-100 text-stone-800 dark:bg-stone-900/30',
        Antropologi: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30',
        Filsafat: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30',
        Seni: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30',
        Arsitektur: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30',
        Lainnya: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30',
      };
      return <span className={`inline-flex px-2 py-0.5 rounded text-xs ${colors[cat] || colors.Lainnya}`}>{cat}</span>;
    },
  },
  {
    accessorKey: 'period',
    header: 'Period',
    cell: ({ row }) => {
      const period = row.getValue('period') as string | undefined;
      return period ? <span className="text-sm">{period}</span> : <span className="text-xs text-muted-foreground">-</span>;
    },
  },
  {
    accessorKey: 'citation_count',
    header: 'Citations',
    cell: ({ row }) => {
      const count = row.getValue('citation_count') as number | undefined;
      return count ? (
        <div className="flex items-center gap-1">
          <Quote className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm font-medium">{count}</span>
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'published_at',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Published <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue('published_at') as Date | undefined;
      return date ? <span className="text-sm">{formatDate(date)}</span> : <span className="text-xs text-muted-foreground">Not published</span>;
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
            <BookOpen className="mr-2 h-4 w-4" />
            View Full
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
    ),
  },
];
