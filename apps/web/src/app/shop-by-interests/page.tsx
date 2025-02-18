import Heading from '../components/common/Heading';
import FilterChip from '../components/filter/FilterChip';
import BannerContainer from '../components/banner/BannerContainer';
import { IProduct, IProductInterest } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import ax from '../lib/axios';
import { endpoints, keywords } from '@repo/ui/lib';
import Error from './error';
import { Metadata } from 'next';
import ShopByInterestsContainer from './ShopByInterestsContainer';
import { Suspense } from 'react';
import { logError } from '../../utils/helper';
import ShopByAgeSkeleton from '../components/skeleton/ShopByAgeSkeleton';
import { BannerType } from '@repo/ui/enums/banner';

export const metadata: Metadata = {
  title: 'Explore Shop by Interests Exciting Game Collection',
  description:
    'Shop our wide range of educational games at Wollybee. Find games that cater to different interests and age groups, all designed to make learning a fun adventure.',
  keywords: keywords,
};

const ShopByInterests = async () => {
  let data: IProductInterest[] = [];
  let error: string = '';
  let products: IProduct[] = [];

  try {
    const [resData, resProduct]: [
      AxiosResponse<IProductInterest[]>,
      AxiosResponse<IProduct[]>,
    ] = await Promise.all([
      ax({
        method: 'get',
        url: `${endpoints.productInterest}`,
      }),
      ax({
        method: 'get',
        url: `${endpoints.product}`,
      }),
    ]);
    products = resProduct.data;
    data = resData.data;
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'ShopByInterests');
    error = 'Error fetching interests..';
  }

  if (error) {
    return <Error />;
  }

  return (
    <Suspense fallback={<ShopByAgeSkeleton />}>
      <div className="w-full justify-center mx-auto overflow-x-hidden scroll-smooth">
        <div className="overflow-hidden max-h-[300px]">
          <BannerContainer filter={BannerType.shopByInterest} />
        </div>

        <Heading color="text-tertiary-red" text="Shop by Interests" />

        <div>
          <div className="flex justify-center">
            <FilterChip
              minComponentNeeded={4}
              filterOptions={data}
              defaultSlidesPerView={4}
              slidesPerView={4}
              filterTitle="I m looking for"
            />
          </div>
          <div className="mt-4">
            <ShopByInterestsContainer data={data} products={products} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ShopByInterests;
