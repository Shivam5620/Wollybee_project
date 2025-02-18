import { IBanner, IProduct } from '@repo/ui/types';
import { IConfigurationResponse } from '@repo/ui/types/configuration';
import { ICouponResponse } from '@repo/ui/types/coupon';
import React from 'react';
import ax from '../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import SetConfigurationState from './SetConfigurationState';
import { logError } from '../../../utils/helper';

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const GetConfigurationsState = async () => {
  let banners: IBanner[] = [];
  let products: IProduct[] = [];
  let dealOfTheDayProductsResponse: IProduct[] = [];
  let coupons: ICouponResponse[] = [];
  let configurations: IConfigurationResponse[] = [];
  let error = '';
  try {
    const [
      resBanner,
      resProducts,
      resDealOfTheDayProducts,
      resConfigurations,
      resCoupons,
    ] = await Promise.all([
      ax({
        method: 'get',
        url: `${endpoints.banner}`,
      }),
      ax({
        method: 'get',
        url: `${endpoints.product}`,
      }),
      ax({
        method: 'get',
        url: endpoints.dealOfTheDay,
        params: {
          date: formatDate(new Date()),
        },
      }),
      ax({
        method: 'get',
        url: endpoints.configuration,
      }),
      ax({
        method: 'get',
        url: endpoints.coupon,
      }),
    ]);

    banners = resBanner.data ?? [];
    products = resProducts.data ?? [];
    dealOfTheDayProductsResponse = resDealOfTheDayProducts.data?.[0]?.products;
    configurations = resConfigurations.data;
    coupons = resCoupons.data;
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'GetConfigurationState');
    error = 'Error fetching Configurations..';
  }

  let dealOfTheDayProducts: IProduct[] = [];
  if (dealOfTheDayProductsResponse && products) {
    const productsMap: { [key: string]: IProduct } = {};
    products.forEach((a) => {
      productsMap[`${a.id}`] = a;
    });
    dealOfTheDayProductsResponse.forEach((a) => {
      dealOfTheDayProducts.push(productsMap[`${a.id}`]);
    });
  }

  return (
    <SetConfigurationState
      banners={banners}
      dealOfTheDayProducts={dealOfTheDayProducts}
      configurations={configurations}
      coupons={coupons}
      products={products}
    />
  );
};

export default GetConfigurationsState;
