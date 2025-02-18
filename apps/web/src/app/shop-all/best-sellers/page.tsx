import { AxiosResponse } from 'axios';
import { endpoints, keywords } from '@repo/ui/lib';
import { Suspense } from 'react';
import { IFilter, IFilterClient, IProduct } from '@repo/ui/types';
import ax from '../../lib/axios';
import { Metadata } from 'next';
import { BannerType } from '@repo/ui/enums/banner';
import { logError } from '../../../utils/helper';
import ShopAllSkeletonView from '../../components/skeleton/ShopAllSkeletonView';
import BannerContainer from '../../components/banner/BannerContainer';
import ShopAllContainer from '../ShopAllContainer';

// Server Component
// We will call Products and Filters API here.

export const metadata: Metadata = {
  title: 'Explore Shop Now Exciting Game Collection',
  description:
    'Shop our wide range of educational games at Wollybee. Find games that cater to different interests and age groups, all designed to make learning a fun adventure.',
  keywords: keywords,
};

const ShopAllBestSellers = async (): Promise<JSX.Element> => {
  let filterData: IFilterClient = {
    ages: [],
    categories: [],
    interests: [],
    prices: [],
    common: [],
  };

  let productData: IProduct[] = [];
  let error: string = '';

  try {
    const [filtersResponse, productsResponse]: [
      AxiosResponse<IFilter>,
      AxiosResponse<IProduct[]>,
    ] = await Promise.all([
      ax({
        method: 'get',
        url: `${endpoints.productFilter}`,
      }),
      ax({
        method: 'get',
        url: `${endpoints.product}`,
      }),
    ]);

    filterData.categories = filtersResponse.data.categories.map((a) => {
      return { ...a, value: a.name, isSelected: false };
    });
    filterData.ages = filtersResponse.data.ages.map((a) => {
      return { ...a, value: a.name, isSelected: false };
    });
    filterData.interests = filtersResponse.data.interests.map((a) => {
      return { ...a, value: a.name, isSelected: false };
    });
    filterData.prices = filtersResponse.data.prices.map((a, index) => {
      return {
        ...a,
        isSelected: false,
        name: `${a.min} - ${a.max}`,
        value: { min: a.min, max: a.max },
        id: index,
      };
    });
    productData = productsResponse.data ?? [];
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'ShopAll');
    error = 'Error fetching Banner..';
  }

  const commonFilter = [
    {
      id: 0,
      name: 'Best Sellers',
      value: 'Best Sellers',
      isSelected: true,
    },
    {
      id: 1,
      name: 'Price High to Low',
      value: 'Price High to Low',
      isSelected: false,
    },
    {
      id: 2,
      name: 'Price Low to High',
      value: 'Price Low to High',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Most Rated',
      value: 'Most Rated',
      isSelected: false,
    },
    {
      id: 4,
      name: 'New Arrivals',
      value: 'New Arrivals',
      isSelected: false,
    },
  ];

  return (
    <Suspense fallback={<ShopAllSkeletonView />}>
      <div className="overflow-hidden max-h-[300px]">
        <BannerContainer filter={BannerType.shopAll} />
      </div>
      <ShopAllContainer
        refreshFilters={true}
        filterData={{ ...filterData, common: commonFilter }}
        productData={productData}
      />
    </Suspense>
  );
};

export default ShopAllBestSellers;
