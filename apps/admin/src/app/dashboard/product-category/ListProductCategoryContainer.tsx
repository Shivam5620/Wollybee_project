import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IProductCategory } from '@repo/ui/types';
import ListProductCategory from './ListProductCategory';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import havePermission from '../../lib/withPermission';
import CustomError from '../../components/common/CustomError';

const ListProductCategoryContainer = async (): Promise<JSX.Element> => {
  let data: IProductCategory[] = [];
  let error: string = '';

  const haveReadProductCategoryPermission = await havePermission(permissions.productCategory.read);
  if(!haveReadProductCategoryPermission){
    return <CustomError text='You do not have permission to view product category' />
  }

  try {
    const res: AxiosResponse<IProductCategory[]> = await ax({
      method: 'get',
      url: endpoints.productCategory,
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
  <Suspense fallback={<Loader text="Fetching Product Category.." />}>
  <ListProductCategory categoryData={data} />
  </Suspense>
 );
};

export default ListProductCategoryContainer;
