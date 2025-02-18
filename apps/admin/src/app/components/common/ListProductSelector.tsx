'use client';
import { IProduct } from '@repo/ui/types';
import React, { useState } from 'react';
import {
  TableActionsType,
  TableComponent,
} from '../../components/common/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import { dashboardRoutes } from '@repo/ui/lib';
import Link from 'next/link';
import { Checkbox } from '../../../../components/ui/checkbox';

interface IListProducts {
  products: IProduct[];
  onCancelClick: () => void;
  onSelectClick: (values: number[]) => void;
}

export interface ISelectedItem {
  name: string;
  id: number;
}

const ListProductSelector = ({
  products,
  onCancelClick,
  onSelectClick,
}: IListProducts) => {
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());

  const handleRowSelectionChange = (rowId: number, isSelected: boolean) => {
    setSelectedRowIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (isSelected) {
        newSelected.add(rowId);
      } else {
        newSelected.delete(rowId);
      }
      return newSelected;
    });
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      id: 'select',
      header: 'Select',
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            const isSelected = value === true;
            row.toggleSelected(!!value);
            handleRowSelectionChange(row.original.id, isSelected);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return (
          <Link
            className="text-secondary-color"
            href={`${dashboardRoutes.products}/${row.original.id}`}
          >
            {row.original.name}
          </Link>
        );
      },
    },
  ];

  const tableActions: TableActionsType[] = [
    {
      label: 'Select',
      onClick: () => {
        onSelectClick(Array.from(selectedRowIds));
      },
    },
    {
      label: 'Cancel',
      onClick: () => {
        onCancelClick();
      },
    },
  ];

  return (
    <TableComponent
      tableHeading={`Products (${products.length})`}
      columns={columns}
      data={products}
      filterable={true}
      filterColumnName="name"
      tableActions={tableActions}
    />
  );
};

export default ListProductSelector;
