'use client';

import { ColumnDef } from '@tantml:react-table';
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2, GripVertical } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FAQ } from '@/lib/admin/mock-data/faq';

interface FaqColumnsProps {
  onToggleStatus: (id: string, newStatus: 'active' | 'inactive') => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export const getFaqColumns = ({ onToggleStatus, onReorder }: FaqColumnsProps): ColumnDef<FAQ>[] => [
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
    accessorKey: 'order',
    header: '#',
    cell: ({ row, table }) => {
      const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', row.index.toString());
      };

      const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      };

      const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const toIndex = row.index;

        if (fromIndex !== toIndex) {
          onReorder(fromIndex, toIndex);
        }
      };

      return (
        <div
          className="flex items-center gap-2"
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
          <span className="font-medium">{row.getValue('order')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'question_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Question <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const locale = useLocale();
      const question = locale === 'id' ? row.original.question_id : row.original.question_en;
      const answer = locale === 'id' ? row.original.answer_id : row.original.answer_en;

      return (
        <div className="w-full min-w-[300px] max-w-2xl pr-4">
          <p className="font-medium text-[var(--javanese-brown-text)] mb-2 line-clamp-2">{question}</p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-3 leading-relaxed">{answer}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'category_id',
    header: 'Category',
    cell: ({ row }) => {
      const locale = useLocale();
      const categoryId = row.original.category_id;
      const categoryEn = row.original.category_en;
      const category = locale === 'id' ? categoryId : categoryEn;

      const colors: Record<string, string> = {
        Umum: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30',
        General: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30',
        Navigasi: 'bg-green-100 text-green-800 dark:bg-green-900/30',
        Navigation: 'bg-green-100 text-green-800 dark:bg-green-900/30',
        UMKM: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30',
        MSME: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30',
        Acara: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30',
        Events: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30',
        Kontak: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30',
        Contact: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30',
      };
      return <span className={`px-2 py-1 rounded text-xs ${colors[category] || 'bg-gray-100 text-gray-800'}`}>{category}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const isActive = status === 'active';

      const handleToggleStatus = (checked: boolean) => {
        const newStatus = checked ? 'active' : 'inactive';
        onToggleStatus(row.original.id, newStatus);
      };

      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={handleToggleStatus}
            className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
          />
          <span className={`text-xs font-medium ${isActive ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      );
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
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
