'use client';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { TableComponent } from '../../components/common/TableComponent';
import { Input } from '../../../../components/ui/input';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import { useRouter } from 'next/navigation';
import Loader from '../../components/common/Loader';
import PermissionCheck from '../../../lib/PermissionCheck';
import { IOrder } from '@repo/ui/types/order';
import { OrderStatus } from '@repo/ui/enums/order';

export interface ISelectedItem {
  name: string;
  id: number;
}

export function formatDateWithTime(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const ListOrder = ({
  meta,
  links,
  orders = [],
}: {
  meta: any;
  links: { [key: string]: string };
  orders: IOrder[];
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const [status, setStatus] = useState<OrderStatus>(
    OrderStatus.PAYMENT_PENDING,
  );

  const [loading, setLoading] = useState<boolean>(false);

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: 'id',
      header: 'OrderID',
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => {
        return (
          <p className="whitespace-nowrap">
            {formatDateWithTime(new Date(row.original.createdAt))}
          </p>
        );
      },
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total Amount',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'coupon',
      header: 'Coupon',
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => {
        return (
          <div className="flex flex-col p-2 space-y-2">
            {row.original.items?.length ? (
              <ul className="space-y-2">
                {row.original.items.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <span className="font-semibold text-gray-800">
                      {item?.product?.name}
                    </span>
                    <span className="text-gray-600">
                      {item.quantity} x {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No items</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => {
        const address = row.original.address;
        return (
          <div className="items-center">
            <h3 className="text-lg">{address.fullName}</h3>
            <p className="text-gray-700">{address.addressLine1}</p>
            {address.addressLine2 && (
              <p className="text-gray-700">{address.addressLine2}</p>
            )}
            <p className="text-gray-700">
              {address.city}, {address.state}, {address.country} -{' '}
              {address.postalCode}
            </p>
            <p className="text-gray-700 mt-3">Phone: {address.phoneNumber}</p>
            <p className="text-gray-700 mt-3">
              Additional Instructions: {address.additionalInstructions}
            </p>
          </div>
        );
      },
    },
    // {
    //   id: 'actions',
    //   header: 'Actions',
    //   cell: ({ row }) => {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <PermissionCheck permission={permissions.order.update}>
    //             <DropdownMenuItem
    //               onClick={() => {
    //                 // update status
    //               }}
    //             >
    //               Update
    //             </DropdownMenuItem>
    //           </PermissionCheck>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];

  const handleGetOrders = async () => {
    let url = `${dashboardRoutes.order}?page=${currentPage}&limit=${limit}`;
    if (searchText) {
      url += `&search=${searchText.trim()}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    router.push(url);
  };

  useEffect(() => {
    handleGetOrders();
  }, [status, currentPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetOrders();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  if (loading) {
    return <Loader text="Updating.." />;
  }

  return (
    <PermissionCheck permission={permissions.order.read}>
      <div>
        <div className="flex gap-3 items-center">
          <Select
            value={status.toString()}
            onValueChange={(value) => {
              const selectedType = Object.values(OrderStatus).find(
                (type) => type === value,
              );
              if (selectedType) {
                setStatus(selectedType);
              }
            }}
          >
            <SelectTrigger className="w-56 my-2">
              <SelectValue placeholder="Select Order Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(OrderStatus).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            className="w-full"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>

        <TableComponent
          tableHeading={`Orders (${orders?.length})`}
          columns={columns}
          data={orders}
          tableActions={[]}
          hidePagination={true}
        />

        <div className="flex w-full justify-end gap-3 my-2">
          <Button
            disabled={links.previous == ''}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            previous
          </Button>
          <Button
            disabled={
              meta.totalPages == 0 || meta.currentPage == meta.totalPages
            }
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            next
          </Button>
        </div>
      </div>
    </PermissionCheck>
  );
};

export default ListOrder;
