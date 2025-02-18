import { endpoints, ICONS, profileRoutes } from '@repo/ui/lib';
import { IOrder } from '@repo/ui/types/order';
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';
import React, { Suspense } from 'react';
import ax from '../../lib/axios';
import Link from 'next/link';
import { IProduct } from '@repo/ui/types';
import { ProductDictionary } from '../../components/cart/UserCartDetails';
import { formatDate, last30Days } from '../../../utils/helper';
import MyOrdersContainer from './MyOrdersContainer';
import MyOrdersSkeleton from '../../components/skeleton/MyOrdersSkeleton';

const MyOrders = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? 10;
  const search = searchParams['search'] ?? '';
  const startDate = searchParams['startDate'] ?? last30Days();
  const endDate = searchParams['endDate'] ?? formatDate(new Date());

  let orders: IOrder[] = [];
  let products: IProduct[] = [];
  let links = {};
  let meta = {};
  let error = null;

  try {
    const [resOrders, resProducts] = await Promise.all([
      ax({
        method: 'get',
        url: endpoints.userOrders,
        params: {
          search,
          page,
          startDate,
          endDate,
          limit,
        },
      }),
      ax({
        method: 'get',
        url: endpoints.product,
      }),
    ]);

    orders = resOrders.data.items;
    links = resOrders.data.links;
    meta = resOrders.data.meta;
    products = resProducts.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <></>;
  }

  const productsMap: ProductDictionary = {};
  products.forEach((a) => {
    productsMap[`${a.id}`] = {
      ...a,
    };
  });

  return (
    <Suspense fallback={<MyOrdersSkeleton />}>
      <div className="flex flex-col px-[5%] xs:px-[10%] mx-auto justify-center">
        <div className="flex md:px-[10%] justify-between items-center relative mt-6 md:mt-10 md:mb-10 mb-4  w-full ">
          <Link href={profileRoutes.myProfile}>
            <Image
              alt="backIcon"
              src={ICONS.carouselArrows.grayLeft}
              width={35}
              className="p-3 md:p-2"
              height={35}
            />
          </Link>
          <p className="text-4xl md:text-7xl font-cheri text-primary-color absolute top-0 left-1/2 -translate-x-1/2">
            orders
          </p>
          <p></p>
        </div>

        <MyOrdersContainer
          meta={meta}
          links={links}
          productsMap={productsMap}
          orders={orders}
        />
      </div>
    </Suspense>
  );
};

export default MyOrders;
