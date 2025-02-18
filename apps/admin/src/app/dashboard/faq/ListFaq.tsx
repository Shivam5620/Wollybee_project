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
import { IFaq, IFaqCategory } from '@repo/ui/types/faq';
import CreateFaq from './CreateFaqContainer';
import EditFaq from './EditFaq';
import DeleteFaq from './DeleteFaq';

export interface ISelectedItem {
  name: string;
  id: number;
}

interface IListFaqProps {
  faq: IFaq[];
  faqCategories: IFaqCategory[];
}

const ListFaq = ({ faqCategories, faq }: IListFaqProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<IFaq | null>(
    null,
  );

  const [selectedItem, setSelectedItem] = useState<IFaq | null>(null);

  const columns: ColumnDef<IFaq>[] = [
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        return <div>{row.original.category.name}</div>;
      },
    },
    {
      accessorKey: 'question',
      header: 'Question',
    },
    {
      accessorKey: 'answer',
      header: 'Answer',
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
              <PermissionCheck permission={permissions.faq.update}>
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
      label: 'Create FAQ',
      onClick: () => {
        setShowCreateModal(true);
      },
      permission: permissions.faq.create,
    },
  ];

  return (
    <>
      {showDeleteModal && (
        <CustomDialog
          Component={
            <DeleteFaq
              id={selectedItem?.id ?? -1}
              title={selectedItem?.question ?? ''}
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
            <CreateFaq
              categories={faqCategories}
              onClose={() => setShowCreateModal(false)}
            />
          }
          open={showCreateModal}
        />
      )}

      {showEditModal && selectedItemToEdit && (
        <CustomDialog
          Component={
            <EditFaq
              categories={faqCategories}
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
        data={faq}
        filterable={true}
        filterColumnName="question"
        tableActions={tableActions}
      />
    </>
  );
};

export default ListFaq;
