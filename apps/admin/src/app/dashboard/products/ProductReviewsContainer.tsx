import { IProductReview } from '@repo/ui/types';
import axios, { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import ax from '@repo/ui/lib/axios';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import ProductReviews from './ProductReviews';
import CustomError from '../../components/common/CustomError';

const ProductReviewsContainer = async ({
  productId,
}: {
  productId: number;
}) => {
  let data: IProductReview[] = [];
  let error: string = '';

  try {
    const res: AxiosResponse<IProductReview[]> = await ax({
      method: 'get',
      url: `${endpoints.productReview}/${productId}`,
    });

    // data = res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <CustomError text='Error while fetching reviews..' />;
  }

  return (
    <Suspense fallback={<Loader text="Loading Product Reviews.." />}>
      <ProductReviews reviews={data} />
    </Suspense>
  );
};

export default ProductReviewsContainer;
