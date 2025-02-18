'use client';
import { IProduct } from '@repo/ui/types';
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  TableActionsType,
  TableComponent,
} from '../../components/common/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { Button } from '../../../../components/ui/button';
import { useRouter } from 'next/navigation';
import CustomDialog from '../../components/common/CustomDialog';
import DeleteProductContainer from './DeleteProductContainer';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import Link from 'next/link';
import { Switch } from '../../../../components/ui/switch';
import { editProduct } from './product.action';
import { toast } from 'sonner';
import Loader from '../../components/common/Loader';
import PermissionCheck from '../../../lib/PermissionCheck';

interface IListProducts {
  products: IProduct[];
}

export interface ISelectedItem {
  name: string;
  id: number;
}

const ListProducts = ({ products }: IListProducts) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ISelectedItem>({
    name: '',
    id: -1,
  });
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const handleBestSeller = async (id: number, value: boolean) => {
    const payload = {
      bestSelling: value,
    };
    setLoadingUpdate(true);
    const res = await editProduct({ id, payload });
    if ('error' in res) {
      toast(res.error.message);
    }
    if ('success' in res) {
      toast(res.message);
    }
    setLoadingUpdate(false);
  };

  const handleComingSoon = async (id: number, value: boolean) => {
    const payload = {
      isComingSoon: value,
    };
    setLoadingUpdate(true);
    const res = await editProduct({ id, payload });
    if ('error' in res) {
      toast(res.error.message);
    }
    if ('success' in res) {
      toast(res.message);
    }
    setLoadingUpdate(false);
  };

  const handleNewArrival = async (id: number, value: boolean) => {
    const payload = {
      isNew: value,
    };
    setLoadingUpdate(true);
    const res = await editProduct({ id, payload });
    if ('error' in res) {
      toast(res.error.message);
    }
    if ('success' in res) {
      toast(res.message);
    }
    setLoadingUpdate(false);
  };

  const handleIsComboOrGift = async (id: number, value: boolean) => {
    const payload = {
      isComboOrGift: value,
    };
    setLoadingUpdate(true);
    const res = await editProduct({ id, payload });
    if ('error' in res) {
      toast(res.error.message);
    }
    if ('success' in res) {
      toast(res.message);
    }
    setLoadingUpdate(false);
  };

  const columns: ColumnDef<IProduct>[] = [
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
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },

    {
      accessorKey: 'discountedPrice',
      header: 'Discounted Price',
    },
    {
      accessorKey: 'discountPercentage',
      header: 'Discounted %',
    },
    {
      accessorKey: 'discountPercentage',
      header: 'Discounted %',
    },
    {
      accessorKey: 'isNew',
      header: 'New Arrival',
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.original.isNew}
            onCheckedChange={(value) => {
              handleNewArrival(row.original.id, value);
            }}
          />
        );
      },
    },
    {
      accessorKey: 'isComingSoon',
      header: 'Coming Soon',
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.original.isComingSoon}
            onCheckedChange={(value) => {
              handleComingSoon(row.original.id, value);
            }}
          />
        );
      },
    },
    {
      accessorKey: 'bestSelling',
      header: 'Best Seller',
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.original.bestSelling}
            onCheckedChange={(value) => {
              handleBestSeller(row.original.id, value);
            }}
          />
        );
      },
    },
    {
      accessorKey: 'isComboOrGift',
      header: 'Combo Gift',
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.original.isComboOrGift}
            onCheckedChange={(value) => {
              handleIsComboOrGift(row.original.id, value);
            }}
          />
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
              <PermissionCheck permission={permissions.product.update}>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(
                      `${dashboardRoutes.products}/edit/${row.original.id}`,
                    );
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </PermissionCheck>

              <PermissionCheck permission={permissions.product.delete}>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedItem({
                      name: row.original.name,
                      id: row.original.id,
                    });
                    setShowDeleteModal(true);
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

  const tableActions: TableActionsType[] = [
    {
      label: 'Create Product',
      onClick: () => {
        router.push(`${dashboardRoutes.products}/create`);
      },
      permission: permissions.product.create,
    },
  ];

  if (loadingUpdate) {
    return <Loader text="Updating..." />;
  }

  return (
    <PermissionCheck permission={permissions.product.read}>
      <CustomDialog
        Component={
          <DeleteProductContainer
            id={selectedItem.id}
            title={selectedItem.name}
            onDelete={() => {
              setShowDeleteModal(false);
            }}
            onClose={() => setShowDeleteModal(false)}
          />
        }
        open={showDeleteModal}
      />

      <TableComponent
        tableHeading={`Products (${products.length})`}
        columns={columns}
        data={products}
        filterable={true}
        filterColumnName="name"
        tableActions={tableActions}
      />
    </PermissionCheck>
  );
};

export default ListProducts;
