'use server';

import { endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { parseError } from '../../../utils/error-utils';
import { IBanner, IProduct } from '@repo/ui/types';
import { ICouponResponse } from '@repo/ui/types/coupon';
import { IConfigurationResponse } from '@repo/ui/types/configuration';
import { formatDate } from '../../../utils/helper';

export async function getConfigurations() {
  let banners: IBanner[] = [];
  let products: IProduct[] = [];
  let dealOfTheDayProductsResponse: IProduct[] = [];
  let coupons: ICouponResponse[] = [];
  let configurations: IConfigurationResponse[] = [];
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

    return {
      success: true,
      data: {
        banners,
        products,
        coupons,
        configurations,
        dealOfTheDayProductsResponse,
      },
    };
  } catch (err) {
    return parseError(err);
  }
}
