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
import { IFeedback } from '@repo/ui/types/feedback';
import { FeedbackType } from '@repo/ui/enums/feedback';
import { deleteFeedback } from './feedback.action';
import { toast } from 'sonner';
import Loader from '../../components/common/Loader';
import PermissionCheck from '../../../lib/PermissionCheck';

export interface ISelectedItem {
  name: string;
  id: number;
}

const ListFeedBack = ({
  meta,
  links,
  feedbacks = [],
}: {
  meta: any;
  links: { [key: string]: string };
  feedbacks: IFeedback[];
}) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const [type, setType] = useState<FeedbackType>(FeedbackType.ABANDONED_CART);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    setLoading(true);
    const res = await deleteFeedback(id);
    if ('error' in res) {
      toast(res.error.message);
    }
    if ('success' in res) {
      toast(res.message);
    }
    setLoading(false);
  };

  const columns: ColumnDef<IFeedback>[] = [
    {
      accessorKey: 'reason',
      header: 'Reason',
      cell: ({ row }) => {
        return (
          <div className="items-center flex flex-wrap">
            <p>{row.original.reason}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'products',
      header: 'Products',
      cell: ({ row }) => {
        return (
          <div className="items-center">
            {row.original.products?.map((a, index) => (
              <p className="font-bold" key={a.id}>
                {index + 1}. {a.name}
              </p>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
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
              <PermissionCheck permission={permissions.feedback.delete}>
                <DropdownMenuItem
                  onClick={() => {
                    handleDelete(row.original.id ?? -1);
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

  const handleGetReviews = async () => {
    let url = `${dashboardRoutes.feedback}?page=${currentPage}&limit=${limit}`;
    if (searchText) {
      url += `&search=${searchText.trim()}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    router.push(url);
  };

  useEffect(() => {
    handleGetReviews();
  }, [type, currentPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetReviews();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  if (loading) {
    return <Loader text="Deleting.." />;
  }

  return (
    <PermissionCheck permission={permissions.feedback.read}>
      <div>
        <div className="flex gap-3 items-center">
          <Select
            value={type.toString()}
            onValueChange={(value) => {
              const selectedType = Object.values(FeedbackType).find(
                (type) => type === value,
              );
              if (selectedType) {
                setType(selectedType);
              }
            }}
          >
            <SelectTrigger className="w-56 my-2">
              <SelectValue placeholder="Select Feedback Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(FeedbackType).map(([key, value]) => (
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
          tableHeading={`Feedbacks (${feedbacks?.length})`}
          columns={columns}
          data={feedbacks}
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

export default ListFeedBack;
