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
import { IProductAge } from '@repo/ui/types';
import { Checkbox } from '../../../../components/ui/checkbox';
import { IFile } from '@repo/ui/types/file';
import Image from 'next/image';
import DeleteProductAgeContainer from './DeleteProductAgeContainer';
import CreateProductAgeContainer from './CreateProductAgeContainer';
import EditProductAgeContainer from './EditProductAgeContainer';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

export interface ISelectedItem {
  name: string;
  id: number;
}

interface IListProductAgeProps {
  productAgeData: IProductAge[];
  images: IFile[];
}

const ListProductAge = ({
  productAgeData,
  images,
}: IListProductAgeProps) => {

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<IFile | null>(null);
  const [selectedItemToEdit, setSelectedItemToEdit] =
    useState<IProductAge | null>(null);

  const [selectedItem, setSelectedItem] = useState<ISelectedItem>({
    name: '',
    id: -1,
  });

  const columns: ColumnDef<IProductAge>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'min',
      header: 'Minimum',
    },
    {
      accessorKey: 'max',
      header: 'Maximum',
    },
    {
      accessorKey: 'color',
      header: 'Color',
      cell: ({ row }) => {
        return (
          <p
            style={{
              padding: '10px 10px 10px 10px',
              borderRadius: '10px',
              color: 'white',
              backgroundColor: row.original.color,
            }}
          >
            {row.original.color}{' '}
          </p>
        );
      },
    },
    {
      accessorKey: 'file',
      header: 'Preview',
      cell: ({ row }) => {
        return (
          <p
            className="text-secondary-color cursor-pointer"
            onClick={() => {
              setSelectedView(row.original.file);
            }}
          >
            View
          </p>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Active',
      cell: ({ row }) => {
        return <Checkbox disabled checked={row.original.isActive} />;
      },
    },
    {
      accessorKey: 'isDeleted',
      header: 'Deleted',
      cell: ({ row }) => {
        return <Checkbox disabled checked={row.original.isDeleted} />;
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
              
            <PermissionCheck permission={permissions.productAge.update}>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItemToEdit(row.original);
                  setShowEditModal(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              </PermissionCheck>

              <PermissionCheck permission={permissions.productAge.delete}>
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
      label: 'Create Product Age',
      onClick: () => {
        setShowCreateModal(true);
      },
      permission: permissions.productAge.create
    },
  ];

  return (
    <PermissionCheck permission={permissions.productAge.read}>
      <CustomDialog
        className="max-w-[95vh] max-h-[95vh] overflow-scroll"
        open={selectedView ? true : false}
        Component={
          <div className="relative">
            <Button
              onClick={() => {
                setSelectedView(null);
              }}
              className="text-white h-5 w-5 border-none focus:none absolute right-0 shadow-2xl top-0 cursor-pointer rounded-full bg-primary-color p-2"
            >
              ✖
            </Button>
            {selectedView && (
              <Image
                src={selectedView.url}
                alt="image"
                width={1440}
                height={720}
                className="w-full h-full"
              />
            )}
          </div>
        }
      />

      {showDeleteModal && (
        <CustomDialog
          Component={
            <DeleteProductAgeContainer
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
            <CreateProductAgeContainer
              images={images}
              onClose={() => setShowCreateModal(false)}
            />
          }
          open={showCreateModal}
        />
      )}

      {showEditModal && selectedItemToEdit && (
        <CustomDialog
          Component={
            <EditProductAgeContainer
              images={images}
              initialValues={selectedItemToEdit}
              onClose={() => setShowEditModal(false)}
            />
          }
          open={showEditModal}
        />
      )}

      <TableComponent
        tableHeading="Product Age"
        columns={columns}
        data={productAgeData}
        filterable={true}
        filterColumnName="name"
        tableActions={tableActions}
      />
    </PermissionCheck>
  );
};

export default ListProductAge;
