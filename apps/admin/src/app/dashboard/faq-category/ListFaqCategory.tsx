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
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';
import { IFaqCategory } from '@repo/ui/types/faq';
import CreateFaqCategory from './CreateFaqCategory';
import EditFaqCategory from './EditFaqCategory';
import DeleteFaqCategory from './DeleteFaqCategory';
import { IFile } from '@repo/ui/types/file';

export interface ISelectedItem {
  name: string;
  id: number;
}

interface IListFaqCategoryProps {
  faqCategories: IFaqCategory[];
  images: IFile[];
}

const ListFaqCategory = ({ faqCategories, images }: IListFaqCategoryProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] =
    useState<boolean>(false);

  const [selectedItemToEdit, setSelectedItemToEdit] =
    useState<IFaqCategory | null>(null);

  const [selectedItem, setSelectedItem] = useState<IFaqCategory | null>(null);

  const columns: ColumnDef<IFaqCategory>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
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
              <PermissionCheck permission={permissions.faqCategory.update}>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedItemToEdit(row.original);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </PermissionCheck>

              <PermissionCheck permission={permissions.faq.delete}>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedItem(row.original);
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
      label: 'Create FAQ Category',
      onClick: () => {
        setShowCreateCategoryModal(true);
      },
      permission: permissions.faqCategory.create,
    },
  ];

  return (
    <>
      {showDeleteModal && (
        <CustomDialog
          Component={
            <DeleteFaqCategory
              id={selectedItem?.id ?? -1}
              title={selectedItem?.name ?? ''}
              onDelete={() => {
                setShowDeleteModal(false);
              }}
              onClose={() => setShowDeleteModal(false)}
            />
          }
          open={showDeleteModal}
        />
      )}

      {showCreateCategoryModal && (
        <CustomDialog
          Component={
            <CreateFaqCategory
              images={images}
              onClose={() => setShowCreateCategoryModal(false)}
            />
          }
          open={showCreateCategoryModal}
        />
      )}

      {showEditModal && selectedItemToEdit && (
        <CustomDialog
          Component={
            <EditFaqCategory
              images={images}
              initialValues={selectedItemToEdit}
              onClose={() => setShowEditModal(false)}
            />
          }
          open={showEditModal}
        />
      )}

      <TableComponent
        tableHeading="FAQ"
        columns={columns}
        data={faqCategories}
        filterable={true}
        filterColumnName="question"
        tableActions={tableActions}
      />
    </>
  );
};

export default ListFaqCategory;
