import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ax from '../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import { ICouponResponse } from '@repo/ui/types/coupon';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import ListCoupons from './ListCoupons';
import { IProduct } from '@repo/ui/types';

const ListCouponsContainer = async (): Promise<JSX.Element> => {
  let data: ICouponResponse[] = [];
  let products: IProduct[] = [];
  let error: string = '';

  try {
    const res: AxiosResponse<ICouponResponse[]> = await ax({
      method: 'get',
      url: endpoints.coupon,
    });
    data = res.data;

    const resProducts: AxiosResponse<IProduct[]> = await ax({
      method: 'get',
      url: endpoints.product,
    });
    products = resProducts.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <Error />;
  }

  return (
    <Suspense fallback={<Loader text="Loading Product Coupons.." />}>
      <ListCoupons coupons={data} products={products} />
    </Suspense>
  );
};

export default ListCouponsContainer;
