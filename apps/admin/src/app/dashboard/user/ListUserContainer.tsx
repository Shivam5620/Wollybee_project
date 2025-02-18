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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '@repo/ui/types';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import DeleteUser from './DeleteUserContainer';
import { Checkbox } from '../../../../components/ui/checkbox';
import PermissionCheck from '../../../lib/PermissionCheck';

interface DeleteItem {
  title: string;
  id: number;
}

const ListUserContainer = ({
  meta,
  links,
  users,
}: {
  meta: any;
  links: { [key: string]: string };
  users: IUser[];
}) => {
  const [showDeleteUserModal, setShowDeleteUserModal] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<DeleteItem>({
    title: '',
    id: -1,
  });

  const router = useRouter();

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        return <p> {row.original.role?.name ?? 'NA'}</p>;
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Active',
      cell: ({ row }) => {
        return (
          <Checkbox
            className="h-5 w-5 rounded-none"
            disabled
            checked={row.original.isActive}
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
              <PermissionCheck permission={permissions.user.update}>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedItemToDelete({
                      title: row.original.name,
                      id: row.original.id,
                    });
                    setShowDeleteUserModal(true);
                  }}
                >
                  Delete User
                </DropdownMenuItem>
              </PermissionCheck>
              <PermissionCheck permission={permissions.user.update}>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(
                      `${dashboardRoutes.user}/edit/${row.original.id}`,
                    );
                  }}
                >
                  Edit User
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
      label: 'Add User',
      onClick: () => {
        router.push(`${dashboardRoutes.user}/create`);
      },
      permission: permissions.user.create,
    },
  ];

  const handleGetUsers = () => {
    let url = `${dashboardRoutes.user}?page=${currentPage}&limit=10`;
    router.push(url);
  };

  useEffect(() => {
    handleGetUsers();
  }, [currentPage]);

  return (
    <PermissionCheck permission={permissions.user.read}>
      {showDeleteUserModal && (
        <CustomDialog
          Component={
            <DeleteUser
              id={selectedItemToDelete.id}
              title={selectedItemToDelete.title}
              onDelete={() => {
                setShowDeleteUserModal(false);
              }}
              onClose={() => setShowDeleteUserModal(false)}
            />
          }
          open={showDeleteUserModal}
        />
      )}

      <TableComponent
        tableHeading={`Users (${users.length})`}
        columns={columns}
        data={users}
        filterable={true}
        filterColumnName="email"
        tableActions={tableActions}
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
          disabled={meta.totalPages == 0 || meta.currentPage == meta.totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          next
        </Button>
      </div>
    </PermissionCheck>
  );
};

export default ListUserContainer;
