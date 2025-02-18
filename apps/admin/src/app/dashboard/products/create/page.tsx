import ax from '../../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
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
import Error from '../error';
import { FileType } from '@repo/ui/enums/file';
import havePermission from '../../../lib/withPermission';
import CustomError from '../../../components/common/CustomError';

const CreateProduct = async (): Promise<JSX.Element> => {
  let images: IFile[] = [];
  let categories: IProductCategory[] = [];
  let ages: IProductAge[] = [];
  let interests: IProductInterest[] = [];
  let error: string = '';

  const haveCreateProductPermission = await havePermission(
    permissions.product.create,
  );
  if (!haveCreateProductPermission) {
    return <CustomError text="You do not have permission to create products" />;
  }

  try {
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
    images = resImages.data;
  } catch (err: unknown) {
    error = 'Error fetching role..';
  }

  if (error) {
    return <Error />;
  }

  const initialProductData: IProduct = {
    id: -1,
    ages: [],
    benefits: [],
    additionalInfo: [],
    categories: [],
    description: '',
    discountedPrice: 0,
    discountPercentage: 0,
    images: [],
    interests: [],
    moreWaysToPlayDescription: '',
    moreWaysToPlayUrl: '',
    name: '',
    maxPlayers: 0,
    minPlayers: 0,
    price: 0,
    bestSelling: false,
    isComboOrGift: false,
    isNew: false,
    isComingSoon: false,
  };

  return (
    <Suspense fallback={<Loader text="Fetching Details..." />}>
      <ProductsContainer
        label="Create Product"
        product={initialProductData}
        images={images}
        type={Product.CREATE}
        ages={ages}
        categories={categories}
        interests={interests}
      />
    </Suspense>
  );
};

export default CreateProduct;
