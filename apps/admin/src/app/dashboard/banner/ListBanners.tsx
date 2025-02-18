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
import { IBanner } from '@repo/ui/types';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import DeleteBanner from './DeleteBannerContainer';
import Image from 'next/image';
import { IFile } from '@repo/ui/types/file';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permission } from 'process';

interface DeleteItem {
  title: string;
  id: number;
}

const ListBanners = ({ bannerData }: { bannerData: IBanner[] }) => {
  const [showDeleteBannerModal, setShowDeleteBannerModal] =
    useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<IFile | null>(null);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<DeleteItem>({
    title: '',
    id: -1,
  });

  const router = useRouter();

  const columns: ColumnDef<IBanner>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'type',
      header: 'Type',
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
              <PermissionCheck permission={permissions.banner.delete}>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedItemToDelete({
                      title: row.original.title,
                      id: row.original.id,
                    });
                    setShowDeleteBannerModal(true);
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
      label: 'Add Banner',
      onClick: () => {
        router.push(`${dashboardRoutes.banner}/create`);
      },
      permission: permissions.banner.create,
    },
  ];

  return (
    <div>
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

      {showDeleteBannerModal && (
        <CustomDialog
          Component={
            <DeleteBanner
              id={selectedItemToDelete.id}
              title={selectedItemToDelete.title}
              onDelete={() => {
                setShowDeleteBannerModal(false);
              }}
              onClose={() => setShowDeleteBannerModal(false)}
            />
          }
          open={showDeleteBannerModal}
        />
      )}

      <TableComponent
        tableHeading="Banner"
        columns={columns}
        data={bannerData}
        filterable={true}
        filterColumnName="type"
        tableActions={tableActions}
      />
    </div>
  );
};

export default ListBanners;
