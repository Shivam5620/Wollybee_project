import { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import { Suspense } from 'react';
import { IFilter, IFilterClient } from '@repo/ui/types';
import ChooseThePerfectGift from './ChooseThePerfectGift';
import ax from '../../lib/axios';
import { logError } from '../../../utils/helper';

// Server Component
// We will call Filters API here.

const ChooseThePerfectGiftContainer = async (): Promise<JSX.Element> => {
  let error: string = '';
  let parsedFilters: IFilterClient = {
    ages: [],
    categories: [],
    common: [],
    interests: [],
    prices: [],
  };

  try {
    const filtersResponse: AxiosResponse<IFilter> = await ax({
      method: 'get',
      url: `${endpoints.productFilter}`,
    });

    parsedFilters.categories = filtersResponse.data.categories.map((a) => {
      return {
        ...a,
        isSelected: false,
      };
    });

    parsedFilters.ages = filtersResponse.data.ages.map((a) => {
      return {
        ...a,
        isSelected: false,
      };
    });

    parsedFilters.interests = filtersResponse.data.interests.map((a) => {
      return {
        ...a,
        isSelected: false,
      };
    });

    parsedFilters.prices = filtersResponse.data.prices.map((a, index) => {
      return {
        ...a,
        isSelected: false,
        name: `${a.min} - ${a.max}`,
        value: {
          min: a.min,
          max: a.max,
        },
        id: index,
      };
    });
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'ChooseThePerfectGiftContainer');
    error = 'Error fetching Banner..';
  }

  const commonFilter = [
    {
      id: 0,
      name: 'Best Sellers',
      value: 'Best Sellers',
      isSelected: false,
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
  ];

  return (
    <Suspense fallback={<></>}>
      {parsedFilters && (
        <ChooseThePerfectGift
          filterData={{ ...parsedFilters, common: commonFilter }}
        />
      )}
    </Suspense>
  );
};

export default ChooseThePerfectGiftContainer;
