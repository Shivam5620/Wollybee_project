import { IProductReview } from '@repo/ui/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { ProductReviewStatus } from '@repo/ui/enums/productReview';
import { toast } from 'sonner';
import { deleteReview, updateReviewStatus } from './reviews.action';
import { useRouter } from 'next/navigation';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import PermissionCheck from '../../../lib/PermissionCheck';

interface IProductReviewDetails {
  data: IProductReview;
  onClose: () => void;
}

const ProductReviewDetails = ({ onClose, data }: IProductReviewDetails) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (status: ProductReviewStatus) => {
    if (!data.id) {
      toast('Review ID is not available!');
      return;
    }

    setLoading(true);
    const resData = await updateReviewStatus({ id: data.id, status });
    if ('error' in resData) {
      toast(resData.error.message);
    }
    if ('success' in resData) {
      toast(resData.message);
    }
    router.push(`${dashboardRoutes.reviews}`);
    setLoading(false);
    onClose();
  };

  const handleDeleteReview = async () => {
    if (!data.id) {
      toast('Review ID is not available!');
      return;
    }

    setLoading(true);
    const resData = await deleteReview({ id: data.id });

    if ('error' in resData) {
      toast(resData.error.message);
    }
    if ('success' in resData) {
      toast(resData.message);
    }
    router.push(`${dashboardRoutes.reviews}`);
    setLoading(false);
    onClose();
  };
  return (
    <div className="flex flex-col gap-4">
      <h1>Review</h1>
      <textarea
        className="p-2 resize-none overflow-auto"
        rows={4}
        value={data.message}
        disabled
      />
      <div className="flex gap-3">
        <p className="font-bold">Ratings : {data.rating} / 5</p>
      </div>
      <p className="font-bold">Media</p>
      <div className="p-2 flex gap-2 flex-wrap">
        {data.media_urls?.map((a) => (
          <Image
            className="m-1 cursor-pointer rounded-md h-[150px] w-[150px]"
            src={a}
            height={100}
            width={100}
            alt="review"
          />
        ))}
      </div>

      <PermissionCheck permission={permissions.productReview.update}>
        <div className="flex gap-3 px-3 mt-5 justify-end">
          {data.status == ProductReviewStatus.APPROVAL_PENDING && (
            <Button
              disabled={loading}
              className="bg-primary-color"
              onClick={() => handleSubmit(ProductReviewStatus.APPROVED)}
            >
              Approve
            </Button>
          )}

          {data.status == ProductReviewStatus.APPROVAL_PENDING && (
            <Button
              disabled={loading}
              className="bg-tertiary-red"
              onClick={() => handleSubmit(ProductReviewStatus.REJECTED)}
            >
              Reject
            </Button>
          )}

          {data.status == ProductReviewStatus.REJECTED && (
            <Button
              disabled={loading}
              className="bg-tertiary-red"
              onClick={handleDeleteReview}
            >
              Delete Review
            </Button>
          )}
        </div>
      </PermissionCheck>
    </div>
  );
};

export default ProductReviewDetails;
