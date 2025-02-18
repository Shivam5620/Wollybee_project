import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import ListProducts from './ListProducts';
import CustomError from '../../components/common/CustomError';
import havePermission from '../../lib/withPermission';

const Products = async (): Promise<JSX.Element> => {
  let data: IProduct[] = [];
  let error: string = '';

  const haveViewProductPermission = await havePermission(permissions.product.read);
  if(!haveViewProductPermission){
    return <CustomError text='You do not have permission to view products' />
  }

  try {
    const res: AxiosResponse<IProduct[]> = await ax({
      method: 'get',
      url: endpoints.product,
    });

    data = res.data;
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
    <Suspense fallback={<Loader text="Fetching Products" />}>
      <ListProducts products={data} />
    </Suspense>
  );
};

export default Products;
