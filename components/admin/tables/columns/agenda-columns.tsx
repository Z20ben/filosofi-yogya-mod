'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { StatusBadge } from '../../shared/StatusBadge';
import { Agenda } from '@/lib/admin/types';
import { formatDate } from '@/lib/admin/utils/slug';

export const agendaColumns: ColumnDef<Agenda>[] = [
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
    accessorKey: 'event_name_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Event Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-md">
        <span className="font-medium">{row.getValue('event_name_id')}</span>
        <p className="text-xs text-muted-foreground">{row.original.organizer}</p>
      </div>
    ),
  },
  {
    accessorKey: 'date_start',
    header: 'Date',
    cell: ({ row }) => {
      const start = formatDate(row.original.date_start);
      const end = formatDate(row.original.date_end);
      return <span className="text-sm">{start === end ? start : `${start} - ${end}`}</span>;
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <span className="text-sm">{row.getValue('location')}</span>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const cat = row.getValue('category') as string;
      return <span className="inline-flex px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30">{cat}</span>;
    },
  },
  {
    accessorKey: 'price_type',
    header: 'Price',
    cell: ({ row }) => {
      const type = row.getValue('price_type');
      return type === 'free' ? (
        <span className="text-green-600 dark:text-green-400 text-sm font-medium">Free</span>
      ) : (
        <span className="text-sm">Rp {row.original.price_amount?.toLocaleString('id-ID')}</span>
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
          <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
