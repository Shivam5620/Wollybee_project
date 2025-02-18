import Heading from '../components/common/Heading';
import FilterChip from '../components/filter/FilterChip';
import BannerContainer from '../components/banner/BannerContainer';
import { IProduct, IProductAge } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import ax from '../lib/axios';
import { endpoints, keywords } from '@repo/ui/lib';
import { Metadata } from 'next';
import CustomError from '../components/common/CustomError';
import ShopByAgeContainer from './ShopByAgeContainer';
import { Suspense } from 'react';
import { logError } from '../../utils/helper';
import ShopByAgeSkeleton from '../components/skeleton/ShopByAgeSkeleton';
import Banner from '../components/banner/Banner';
import { BannerType } from '@repo/ui/enums/banner';

export const metadata: Metadata = {
  title: 'Explore Shop Now Exciting Game Collection',
  description:
    'Shop our wide range of educational games at Wollybee. Find games that cater to different interests and age groups, all designed to make learning a fun adventure.',
  keywords: keywords,
};

const ShopByAge = async () => {
  let data: IProductAge[] = [];
  let products: IProduct[] = [];
  let error: string = '';

  try {
    const [resData, resProduct]: [
      AxiosResponse<IProductAge[]>,
      AxiosResponse<IProduct[]>,
    ] = await Promise.all([
      ax({
        method: 'get',
        url: `${endpoints.productAge}`,
      }),
      ax({
        method: 'get',
        url: `${endpoints.product}`,
      }),
    ]);

    data = resData.data;
    products = resProduct.data;
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'ShopByAge');
    error = 'Some Error Occured';
  }

  if (error) {
    return <CustomError text="Error Occured while fetching age categories" />;
  }

  return (
    <Suspense fallback={<ShopByAgeSkeleton />}>
      <div className="w-full justify-center mx-auto overflow-x-hidden scroll-smooth">
        <div className="overflow-hidden max-h-[300px]">
          <BannerContainer filter={BannerType.shopByAge} />
        </div>
        <Heading color="text-tertiary-red" text="Shop by Age" />
        <div>
          <div className="flex md:justify-center my-2">
            <FilterChip
              minComponentNeeded={4}
              filterOptions={data}
              defaultSlidesPerView={4}
              slidesPerView={4}
              filterTitle="I'm looking for"
            />
          </div>
          <ShopByAgeContainer products={products} data={data} />
        </div>
      </div>
    </Suspense>
  );
};

export default ShopByAge;
