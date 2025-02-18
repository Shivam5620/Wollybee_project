import { endpoints, permissions } from '@repo/ui/lib';
import {
  IProduct,
  IProductAge,
  IProductCategory,
  IProductInterest,
} from '@repo/ui/types';
import { Suspense } from 'react';
import { AxiosResponse } from 'axios';
import { IFile } from '@repo/ui/types/file';
import { Product } from '@repo/ui/enums';
import ax from '../../../../lib/axios';
import ProductDetailsContainer from '../../ProductsContainer';
import Loader from '../../../../components/common/Loader';
import Error from '../../error';
import havePermission from '../../../../lib/withPermission';
import CustomError from '../../../../components/common/CustomError';

const EditProduct = async ({
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

  const haveEditProductPermission = await havePermission(permissions.product.update);
  if(!haveEditProductPermission){
    return <CustomError text='You do not have permission to update products' />
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
          <ProductDetailsContainer
            label="Edit Product"
            product={data}
            images={images}
            type={Product.UPDATE}
            ages={ages}
            categories={categories}
            interests={interests}
          />
        )}
      </Suspense>
  );
};

export default EditProduct;
