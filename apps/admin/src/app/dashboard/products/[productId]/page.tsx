import ax from '../../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import Error from '../error';
import {
  IProduct,
  IProductAge,
  IProductCategory,
  IProductInterest,
} from '@repo/ui/types';
import { Suspense } from 'react';
import Loader from '../../../components/common/Loader';
import { AxiosResponse } from 'axios';
import ProductsContainer from '../ProductsContainer';
import { IFile } from '@repo/ui/types/file';
import { Product } from '@repo/ui/enums';
import havePermission from '../../../lib/withPermission';
import CustomError from '../../../components/common/CustomError';

const ViewProduct = async ({
  params,
}: {
  params: { productId: number };
}): Promise<JSX.Element> => {
  let data: IProduct | null = null;
  let images: IFile[] = [];
  let categories: IProductCategory[] = [];
  let ages: IProductAge[] = [];
  let interests: IProductInterest[] = [];
  let error: string = '';

  const haveReadProductPermission = await havePermission(permissions.product.read);
  if(!haveReadProductPermission){
    return <CustomError text='You do not have permission to read products' />
  }

  try {
    const resData: AxiosResponse<IProduct> = await ax({
      method: 'get',
      url: `${endpoints.product}/${params.productId}`,
    });

    const resImages: AxiosResponse<IFile[]> = await ax({
      method: 'get',
      url: endpoints.file,
    });
    const resCategory: AxiosResponse<IProductCategory[]> = await ax({
      method: 'get',
      url: endpoints.productCategory,
    });
    const resAges: AxiosResponse<IProductAge[]> = await ax({
      method: 'get',
      url: endpoints.productAge,
    });
    const resInterests: AxiosResponse<IProductInterest[]> = await ax({
      method: 'get',
      url: endpoints.productInterest,
    });

    categories = resCategory.data;
    ages = resAges.data;
    interests = resInterests.data;
    data = resData.data;
    images = resImages.data;
  } catch (err: unknown) {
    error = 'Error fetching role..';
  }

  if (error) {
    return <Error />;
  }

  return (
    <Suspense fallback={<Loader text="Fetching Details..." />}>
      {data && (
        <ProductsContainer
          label="View Product"
          product={data}
          images={images}
          type={Product.READ}
          ages={ages}
          categories={categories}
          interests={interests}
        />
      )}
    </Suspense>
  );
};

export default ViewProduct;
