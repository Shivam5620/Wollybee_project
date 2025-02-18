import ax from '../../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import { IProduct, IProductReview } from '@repo/ui/types';
import { Suspense } from 'react';
import { AxiosResponse } from 'axios';
import CustomError from '../../../components/common/CustomError';
import ProductReviews from './ProductReviews';

const ProductReviewsContainer = async ({
  product,
}: {
  product: IProduct;
}): Promise<JSX.Element> => {
  let productReviews: IProductReview[] = [];
  let error: string = '';

  try {
    const resData: AxiosResponse<IProductReview[]> = await ax({
      method: 'get',
      url: `${endpoints.productReview}/product/${product.id}`,
    });
    productReviews = resData.data;
  } catch (err: unknown) {
    error = 'Error fetching Product reviews..';
  }

  if (error) {
    return <CustomError text={error} />;
  }

  return (
    <Suspense fallback={<p>Fetching Product Reviews</p>}>
      <ProductReviews product={product} reviews={productReviews} />
    </Suspense>
  );
};

export default ProductReviewsContainer;
