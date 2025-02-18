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
import { IProductCategory } from '@repo/ui/types';
import DeleteProductCategoryContainer from './DeleteProductCategoryContainer';
import CreateProductCategoryContainer from './CreateProductCategoryContainer';
import EditProductCategoryContainer from './EditProductCategoryContainer';
import { Checkbox } from '../../../../components/ui/checkbox';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

export interface ISelectedItem {
  name: string;
  id: number;
}

const ListProductCategory = ({
  categoryData,
}: {
  categoryData: IProductCategory[];
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<IProductCategory>({
    id : -1,
    name : '',
    description : '',
    isActive : false,
    isDeleted : false,
    createdAt : new Date(),
    updatedAt : new Date()
  });

  const [selectedItem, setSelectedItem] = useState<ISelectedItem>({
    name: '',
    id: -1,
  });

  const columns: ColumnDef<IProductCategory>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
        accessorKey: 'isActive',
        header: 'Active',
        cell : ({row}) => {
            return <Checkbox disabled checked={row.original.isActive} />
        }
    },
    {
        accessorKey: 'isDeleted',
        header: 'Deleted',
        cell : ({row}) => {
            return <Checkbox disabled checked={row.original.isDeleted} />
        }
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
              <PermissionCheck permission={permissions.productCategory.update}>
              <DropdownMenuItem
                onClick={() => {
                setSelectedItemToEdit(row.original);
                  setShowEditModal(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              </PermissionCheck>
              
              <PermissionCheck permission={permissions.productCategory.delete}>
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
      label: 'Create Category',
      onClick: () => {
        setShowCreateModal(true);
      },
      permission: permissions.productCategory.create,
    },
  ];

  return (
    <PermissionCheck permission={permissions.productCategory.read}>
    <div>
      {showDeleteModal && (
        <CustomDialog
          Component={
            <DeleteProductCategoryContainer
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
            <CreateProductCategoryContainer
              onClose={() => setShowCreateModal(false)}
            />
          }
          open={showCreateModal}
        />
      )}

      {showEditModal && (
        <CustomDialog
          Component={
            <EditProductCategoryContainer
              initialValues={selectedItemToEdit}
              onClose={() => setShowEditModal(false)}
            />
          }
          open={showEditModal}
        />
      )}

      <TableComponent
        tableHeading="Product Categories"
        columns={columns}
        data={categoryData}
        filterable={true}
        filterColumnName="name"
        tableActions={tableActions}
      />
    </div>
    </PermissionCheck>
  );
};

export default ListProductCategory;
