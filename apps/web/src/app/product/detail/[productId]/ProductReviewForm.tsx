'use client';
import { Size } from '@repo/ui/enums/size';
import { Button } from '../../../../ui/components/ui/button';
import RatingStars from '../../../components/common/RatingStars';
import { useState } from 'react';
import { toast } from '../../../../ui/components/ui/use-toast';
import AddMediaButton from './AddMediaButton';
import {
  createReview,
  uploadFileToS3,
} from '../../../components/reviews/review.action';
import { ProductReviewStatus } from '@repo/ui/enums/productReview';
import { IProduct } from '@repo/ui/types';
import {
  MAX_FILE_UPLOAD_COUNT,
  MAX_FILE_UPLOAD_SIZE_LIMIT,
} from '@repo/ui/lib';
import ProductDetailSkeleton from '../../../components/skeleton/ProductDetailSkeleton';

const ProductReviewForm = ({
  product,
  onCancel,
}: {
  product: IProduct;
  onCancel: () => void;
}) => {
  const [message, setMessage] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitReview = async () => {
    if (!message || rating == 0) {
      toast({ title: 'Please Fill all fields..', variant: 'destructive' });
      return;
    }

    const mediaUrls: Array<string> = [];
    const mediaKeys: Array<string> = [];

    for (const file of files) {
      if (file.size > MAX_FILE_UPLOAD_SIZE_LIMIT) {
        toast({
          title: 'Oops! Maximum file size exceeded!!',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
    }

    if (files.length > MAX_FILE_UPLOAD_COUNT) {
      toast({
        title: 'Oops! maximum 5 files can be uploaded at a time',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Upload Files
    setLoading(true);
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file as File);
        const data = await uploadFileToS3(formData);
        mediaKeys.push(data.mediaKeys);
        mediaUrls.push(data.mediaUrls);
      } catch (error) {
        toast({ title: 'Error uploading file', variant: 'destructive' });
        setLoading(false);
        return;
      }
    }

    const payload = {
      media_urls: mediaUrls,
      media_keys: mediaKeys,
      message,
      productId: product.id,
      rating,
      status: ProductReviewStatus.APPROVAL_PENDING,
    };

    // Call POST API
    const res = await createReview(payload);

    setLoading(false);

    if ('success' in res) {
      toast({ title: res.message });
      setRating(0);
      setMessage('');
      onCancel();
    }
    if ('error' in res) {
      toast({ title: res.error.message, variant: 'destructive' });
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="mx-3 min-w-[90%] lg:w-[600px] font-heyComic xl:w-[750px]">
      <h1 className="text-md  text-primary-black">Feedback</h1>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        rows={10}
        className="w-full p-2 rounded-[14px] border-2 border-secondary-color mt-3"
      />

      <h2 className="text-sm mt-5 py-1 font-heyComic text-primary-black">
        Rating
      </h2>
      <RatingStars
        rating={0}
        variant={Size.medium}
        hexColor="#FFC648"
        onChangeRating={(val) => {
          setRating(val);
        }}
      />

      <div className="mt-5 w-full">
        <AddMediaButton setFiles={setFiles} />
      </div>

      <div className=" rounded-full my-5 flex  gap-5 justify-between">
        <Button
          onClick={onCancel}
          className="w-[60%] py-6 lg:text-lg hover:bg-primary-color hover:border-primary-color rounded-full bg-white border hover:text-white border-tertiary-green text-tertiary-green"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          className="w-full py-6 lg:text-lg hover:bg-primary-color hover:border-primary-color rounded-full bg-tertiary-green border text-white border-tertiary-green"
          onClick={handleSubmitReview}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </div>
  );
};

export default ProductReviewForm;
