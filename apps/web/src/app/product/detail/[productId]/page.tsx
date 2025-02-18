import ax from '../../../lib/axios';
import { endpoints, keywords } from '@repo/ui/lib';
import { IProduct, IProductReview } from '@repo/ui/types';
import { Suspense } from 'react';
import { AxiosResponse } from 'axios';
import ProductDetailsContainer from './ProductDetailsContainer';
import { Metadata } from 'next';
import { cache } from 'react';
import CustomError from '../../../components/common/CustomError';
import ProductDetailSkeleton from '../../../components/skeleton/ProductDetailSkeleton';

const getProduct = cache(async (productId: number) => {
  let data: IProduct | null = null;
  const resData: AxiosResponse<IProduct> = await ax({
    method: 'get',
    url: `${endpoints.product}/${productId}`,
  });
  data = resData.data;
  return data;
});

export async function generateMetadata({
  params,
}: {
  params: { productId: number };
}): Promise<Metadata> {
  let data: IProduct | null = null;
  try {
    data = await getProduct(params.productId);
  } catch (err) {
    return {
      title: 'Product | Show Now',
      description:
        'Introduce your child to the wonderful world of Games. This interactive game helps develop vocabulary, letter recognition.',
      keywords: keywords,
    };
  }
  return {
    title: data?.name + ' | Shop Now',
    description:
      data?.description +
      '\nIntroduce your child to the wonderful world of Games. This interactive game helps develop vocabulary, letter recognition.',
    openGraph: {
      images: [
        {
          url: data?.images[0].url ?? '',
        },
      ],
    },
    keywords: keywords,
  };
}

const ProductDetail = async ({
  params,
}: {
  params: { productId: number };
}): Promise<JSX.Element> => {
  let data: IProduct | null = null;
  let productReviews: IProductReview[] = [];
  let error: string = '';
  try {
    data = await getProduct(params.productId);
    const resData: AxiosResponse<IProductReview[]> = await ax({
      method: 'get',
      url: `${endpoints.productReview}/product/${params.productId}`,
    });
    productReviews = resData.data;
  } catch (err) {
    error = 'Some Error Occured while fetching Product';
  }

  if (error) {
    return <CustomError text={error} />;
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      {data && (
        <ProductDetailsContainer product={data} reviews={productReviews} />
      )}
    </Suspense>
  );
};

export default ProductDetail;
