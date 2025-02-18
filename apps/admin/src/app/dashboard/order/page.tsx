import React, { Suspense } from 'react';
import axios, { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import CustomError from '../../components/common/CustomError';
import Loader from '../../components/common/Loader';
import { IOrder } from '@repo/ui/types/order';
import havePermission from '../../lib/withPermission';
import { OrderStatus } from '@repo/ui/enums/order';
import ListOrder from './ListOrder';

const Order = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams['page'] ?? '1';
  const search = searchParams['search'] ?? '';
  const status = searchParams['status'] ?? OrderStatus.PAYMENT_PENDING;
  const limit = searchParams['limit'] ?? 10;

  let data: IOrder[] = [];
  let links = {};
  let meta = {};
  let error = null;

  const haveReadFeedbackPermission = await havePermission(
    permissions.order.read,
  );
  if (!haveReadFeedbackPermission) {
    return (
      <CustomError text="You do not have permission to read orders" />
    );
  }

  try {
    const res: AxiosResponse<any> = await ax({
      method: 'get',
      url: endpoints.order,
      params: {
        page,
        search,
        status,
        limit,
      }
    });
    data = res.data.items;
    links = res.data.links;
    meta = res.data.meta;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <CustomError text={error} />;
  }

  return (
    <Suspense fallback={<Loader text="Loading.." />}>
      <ListOrder meta={meta} links={links} orders={data} />
    </Suspense>
  );
};

export default Order;
