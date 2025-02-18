'use client';
import {
  TableActionsType,
  TableComponent,
} from '../../components/common/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import CustomDialog from '../../components/common/CustomDialog';
import { useState } from 'react';
import { ICouponResponse } from '@repo/ui/types/coupon';
import { formatDate } from '../deal-of-the-day/DealsContainer';
import DeleteCoupon from './DeleteCoupon';
import CouponsContainer from './CouponsContainer';
import { IProduct } from '@repo/ui/types';

export interface ISelectedItem {
  name: string;
  id: number;
}

const ListCoupons = ({
  coupons,
  products,
}: {
  coupons: ICouponResponse[];
  products: IProduct[];
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedItemToEdit, setSelectedItemToEdit] =
    useState<ICouponResponse | null>(null);

  const [selectedItem, setSelectedItem] = useState<ISelectedItem>({
    name: '',
    id: -1,
  });

  const columns: ColumnDef<ICouponResponse>[] = [
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'discountPercentage',
      header: 'Discount %',
    },
    {
      accessorKey: 'redeemBefore',
      header: 'Redeem Before',
      cell: ({ row }) => {
        const date = formatDate(new Date(row.original.redeemBefore));
        return <p>{date}</p>;
      },
    },
    {
      accessorKey: 'maxDiscount',
      header: 'Max Discount',
    },
    {
      accessorKey: 'minCartValue',
      header: 'Min Cart Value',
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
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItemToEdit(row.original);
                  setShowEditModal(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItem({
                    id: row.original.id,
                    name: row.original.code,
                  });
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const tableActions: TableActionsType[] = [
    {
      label: 'Create Coupon',
      onClick: () => {
        setShowCreateModal(true);
      },
    },
  ];

  return (
    <div>
      {showDeleteModal && (
        <CustomDialog
          Component={
            <DeleteCoupon
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
      )}

      {showCreateModal && (
        <CustomDialog
          Component={
            <CouponsContainer
              products={products}
              onClose={() => {
                setShowCreateModal(false);
              }}
            />
          }
          open={showCreateModal}
        />
      )}

      {showEditModal && selectedItemToEdit && (
        <CustomDialog
          Component={
            <CouponsContainer
              products={products}
              initialValues={selectedItemToEdit}
              onClose={() => setShowEditModal(false)}
              type="edit"
            />
          }
          open={showEditModal}
        />
      )}

      <TableComponent
        tableHeading="Coupons"
        columns={columns}
        data={coupons}
        filterable={true}
        filterColumnName="code"
        tableActions={tableActions}
      />
    </div>
  );
};

export default ListCoupons;
