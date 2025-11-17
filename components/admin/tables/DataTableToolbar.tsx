'use client';

import { Table } from '@tanstack/react-table';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  filterableColumns?: {
    id: string;
    title: string;
    options: { label: string; value: string }[];
  }[];
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = 'Search...',
  filterableColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
        {searchKey && (
          <div className="relative w-full sm:w-[250px] lg:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
              className="pl-9 h-10"
            />
          </div>
        )}

        {filterableColumns.map((column) => {
          const filterValue = table.getColumn(column.id)?.getFilterValue();

          return (
            <Select
              key={column.id}
              value={(filterValue as string) || 'all'}
              onValueChange={(value) => {
                if (value === 'all') {
                  table.getColumn(column.id)?.setFilterValue(undefined);
                } else {
                  table.getColumn(column.id)?.setFilterValue(value);
                }
              }}
            >
              <SelectTrigger className="h-10 w-full sm:w-[150px]">
                <SelectValue placeholder={column.title} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {column.title}</SelectItem>
                {column.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
