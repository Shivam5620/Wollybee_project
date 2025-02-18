'use client';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import CustomDialog from '../../components/common/CustomDialog';
import { useEffect, useState } from 'react';
import { IProductReview } from '@repo/ui/types';
import { Rating } from 'react-simple-star-rating';
import ProductReviewDetails from './ProductReviewDetails';
import { ProductReviewStatus } from '@repo/ui/enums/productReview';
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
import Loader from '../../components/common/Loader';
import { useRouter } from 'next/navigation';
import PermissionCheck from '../../../lib/PermissionCheck';

export interface ISelectedItem {
  name: string;
  id: number;
}

const ListReviews = ({meta, links, reviews = [] }: {meta : any, links:{[key : string] : string}, reviews: IProductReview[] }) => {
  const router = useRouter();

  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 3;
  const [rating, setRating] = useState<number>(5);
  const [status, setStatus] = useState<ProductReviewStatus>(
    ProductReviewStatus.APPROVAL_PENDING,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedItemToView, setSelectedItemToView] =
    useState<IProductReview | null>(null);

  const columns: ColumnDef<IProductReview>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'rating',
      header: 'Review',
      cell: ({ row }) => {
        return (
          <div className="items-center">
            {' '}
            <Rating
              SVGstyle={{ display: 'inline' }}
              size={15}
              initialValue={row.original.rating}
            />
            <p className="py-2">{row.original.message}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <p
            className={`py-1 rounded-full text-center text-[10px] bg-primary-color shadow-md ${row.original.status == ProductReviewStatus.REJECTED && 'bg-tertiary-red'}
          ${row.original.status == ProductReviewStatus.APPROVAL_PENDING && 'bg-tertiary-green'} font-bold`}
          >
            {row.original.status}
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
              <PermissionCheck permission={permissions.productReview.read}>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedItemToView(row.original);
                }}
              >
                Details
              </DropdownMenuItem>
              </PermissionCheck>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleGetReviews = async () => {
    let url = `${dashboardRoutes.reviews}?page=${currentPage}&limit=${limit}`;
    if (searchText) {
      url += `&search=${searchText.trim()}`;
    }
    if (rating) {
      url += `&rating=${rating}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    router.push(url);
  };

  useEffect(() => {
    handleGetReviews();
  }, [status, rating, currentPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetReviews();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  const handleClose = () => {
    setSelectedItemToView(null);
  };

  const ratingValues = [1, 2, 3, 4, 5];

  if (loading) {
    return <Loader text="Fetching review..." />;
  }

  return (
    <PermissionCheck permission={permissions.productReview.read}>
    <div>
      <CustomDialog
        className="max-w-[95vh] max-h-[95vh] overflow-scroll"
        open={selectedItemToView != null}
        Component={
          <div className="relative">
            <Button
              onClick={handleClose}
              className="text-white h-5 w-5 border-none focus:none absolute right-0 shadow-2xl top-0 cursor-pointer rounded-full bg-primary-color p-2"
            >
              ✖
            </Button>
            {selectedItemToView && (
              <ProductReviewDetails
                onClose={handleClose}
                data={selectedItemToView}
              />
            )}
          </div>
        }
      />
      <div className="flex gap-3 items-center">
        <Select
          value={rating.toString()}
          onValueChange={(value) => {
            setRating(parseInt(value, 10));
          }}
        >
          <SelectTrigger className="w-56 my-2">
            <SelectValue placeholder="Page" />
          </SelectTrigger>
          <SelectContent>
            {ratingValues.map((a) => (
              <SelectItem key={a} value={a.toString()}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value) => {
            setRating(parseInt(value, 10));
          }}
        >
          <SelectTrigger className="w-56 my-2">
            <SelectValue placeholder="Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ProductReviewStatus.APPROVAL_PENDING.toString()}>
              {ProductReviewStatus.APPROVAL_PENDING}
            </SelectItem>
            <SelectItem value={ProductReviewStatus.APPROVED.toString()}>
              {ProductReviewStatus.APPROVED}
            </SelectItem>
            <SelectItem value={ProductReviewStatus.REJECTED.toString()}>
              {ProductReviewStatus.REJECTED}
            </SelectItem>
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
        tableHeading={`Product Reviews (${reviews?.length})`}
        columns={columns}
        data={reviews}
        filterColumnName="rating"
        tableActions={[]}
        hidePagination={true}
      />
      
      <div className='flex w-full justify-end gap-3 my-2'>
      <Button disabled={links.previous == ""} onClick={() => {
        if(currentPage > 1){
          setCurrentPage(currentPage-1);
        }
      }}>previous</Button>
      <Button disabled={
        meta.totalPages == 0 || meta.currentPage == meta.totalPages
      } onClick={() => {
        setCurrentPage(currentPage+1);
      }}>next</Button>
      </div>
    </div>
    </PermissionCheck>
  );
};

export default ListReviews;
