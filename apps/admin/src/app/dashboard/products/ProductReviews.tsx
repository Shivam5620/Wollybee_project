'use client';
import { TableComponent } from '../../components/common/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import { IProductReview } from '@repo/ui/types';
import { Rating } from 'react-simple-star-rating';

const ProductReviews = ({ reviews }: { reviews: IProductReview[] }) => {
  const columns: ColumnDef<IProductReview>[] = [
    {
      accessorKey: 'rating',
      header: 'Reviews',
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
  ];

  return (
    <TableComponent
      tableHeading="Product Reviews"
      columns={columns}
      data={reviews}
      filterable={true}
      filterColumnName="rating"
    />
  );
};

export default ProductReviews;
