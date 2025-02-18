'use client';
import { MoreHorizontal } from 'lucide-react';
import { IDealOfTheDayResponse } from '@repo/ui/types/dealOfTheDay';
import React, { useState } from 'react';
import { TableComponent } from '../../components/common/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import { useRouter } from 'next/navigation';
import { deleteDeal } from './deal.action';
import { toast } from 'sonner';
import Loader from '../../components/common/Loader';
import PermissionCheck from '../../../lib/PermissionCheck';

const ListDealOfTheDay = ({ deals }: { deals: IDealOfTheDayResponse[] }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    setLoading(true);
    const data = await deleteDeal(id);
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    setLoading(false);
  };

  const columns: ColumnDef<IDealOfTheDayResponse>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        return (
          <Link
            href={`${dashboardRoutes.dealOfTheDay}/detail?date=${row.original.date}`}
            className="text-secondary-color"
          >
            {row.original.date}
          </Link>
        );
      },
    },
    {
      accessorKey: 'products',
      header: 'Products',
      cell: ({ row }) => {
        return (
          <div className="items-center">
            <ul>
              {row.original.products?.map((a, index) => (
                <li className="font-bold text-md">{`${index + 1}. ${a.name}`}</li>
              ))}
            </ul>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <PermissionCheck permission={permissions.dealOfTheDay.update}>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(
                      `${dashboardRoutes.dealOfTheDay}/edit?date=${row.original.date}`,
                    );
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </PermissionCheck>

              <PermissionCheck permission={permissions.dealOfTheDay.delete}>
                <DropdownMenuItem
                  onClick={() => {
                    handleDelete(row.original.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </PermissionCheck>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return <Loader text="Deleting..." />;
  }

  return (
    <PermissionCheck permission={permissions.dealOfTheDay.read}>
      <div>
        <TableComponent
          tableHeading={`Deals (${deals?.length})`}
          columns={columns}
          data={deals}
          filterable={true}
          filterColumnName="date"
          tableActions={[
            {
              label: 'Create Deal',
              onClick: () => {
                router.push(`${dashboardRoutes.dealOfTheDay}/create`);
              },
            },
          ]}
        />
      </div>
    </PermissionCheck>
  );
};

export default ListDealOfTheDay;
