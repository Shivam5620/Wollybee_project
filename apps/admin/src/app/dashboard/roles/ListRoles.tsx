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
import { useRouter } from 'next/navigation';
import DeleteRoleContainer from './DeleteRoleContainer';
import Link from 'next/link';
import { IRole } from '@repo/ui/types';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import PermissionCheck from '../../../lib/PermissionCheck';

interface DeleteItem {
  name: string;
  id: number;
}

const ListRoles = ({ rolesData }: { rolesData: IRole[] }) => {
  const [showDeleteRoleModal, setShowDeleteRoleModal] =
    useState<boolean>(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<DeleteItem>({
    name: '',
    id: -1,
  });

  const router = useRouter();

  const columns: ColumnDef<IRole>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return (
          <Link
            className="text-secondary-color-200 hover:text-primary-black"
            href={`${dashboardRoutes.roles}/${row.original.id}`}
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
              <PermissionCheck permission={permissions.role.update}>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(
                      `${dashboardRoutes.roles}/edit/${row.original.id}`,
                    );
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </PermissionCheck>

              <PermissionCheck permission={permissions.role.delete}>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedItemToDelete({
                      name: row.original.name,
                      id: row.original.id,
                    });
                    setShowDeleteRoleModal(true);
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
      label: 'Add Role',
      onClick: () => {
        router.push(`${dashboardRoutes.roles}/create`);
      },
      permission: permissions.role.create,
    },
  ];

  return (
    <PermissionCheck permission={permissions.role.read}>
      {showDeleteRoleModal && (
        <CustomDialog
          Component={
            <DeleteRoleContainer
              id={selectedItemToDelete.id}
              title={selectedItemToDelete.name}
              onDelete={() => {
                setShowDeleteRoleModal(false);
              }}
              onClose={() => setShowDeleteRoleModal(false)}
            />
          }
          open={showDeleteRoleModal}
        />
      )}

      <TableComponent
        tableHeading="Roles"
        columns={columns}
        data={rolesData}
        filterable={true}
        filterColumnName="name"
        tableActions={tableActions}
      />
    </PermissionCheck>
  );
};

export default ListRoles;
