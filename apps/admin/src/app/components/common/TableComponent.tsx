'use client';

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  VisibilityState,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '../../../../components/ui/input';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import { Button } from '../../../../components/ui/button';
import { Fragment, useState } from 'react';
import PermissionCheck from '../../../lib/PermissionCheck';

export type TableActionsType =
  | { label: string; onClick: () => void; permission?: string }
  | { component: React.ReactNode };

interface TableComponentProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableHeading?: string;
  filterable?: boolean;
  columnVisible?: boolean;
  filterPlaceholder?: string;
  filterColumnName?: string;
  tableActions?: TableActionsType[];
  showRowsSelected?: boolean;
  hidePagination?: boolean;
  pageSize?: number;
}

export function TableComponent<TData, TValue>({
  columns,
  data,
  tableHeading,
  filterable = false,
  columnVisible = false,
  filterPlaceholder = 'Search..',
  filterColumnName = 'default',
  tableActions,
  showRowsSelected = false,
  hidePagination = false,
  pageSize = 10,
}: TableComponentProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  let stateData = {};

  if (pageSize != 10) {
    stateData = {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    };
  } else {
    stateData = {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    };
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: stateData,
  });

  return (
    <div>
      <div className="items-center py-1">
        {tableHeading && (
          <h1 className="pb-2 font-bold text-primary-black">{tableHeading}</h1>
        )}
        <div className="flex gap-2">
          {filterable && (
            <Input
              placeholder={filterPlaceholder}
              value={
                (table
                  .getColumn(filterColumnName)
                  ?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table
                  .getColumn(filterColumnName)
                  ?.setFilterValue(event.target.value)
              }
              className=""
            />
          )}

          <div className="flex gap-4 items-center">
            {tableActions?.map((action, index) => {
              if ('component' in action) {
                return <Fragment key={index}>{action.component}</Fragment>;
              } else {
                return action.permission ? (
                  <PermissionCheck key={index} permission={action.permission}>
                    <Button onClick={action.onClick}>{action.label}</Button>
                  </PermissionCheck>
                ) : (
                  <Button key={index} onClick={action.onClick}>
                    {action.label}
                  </Button>
                );
              }
            })}
          </div>

          {columnVisible && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {showRowsSelected && (
          <div className="flex-1 ml-2 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}

        {!hidePagination && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
