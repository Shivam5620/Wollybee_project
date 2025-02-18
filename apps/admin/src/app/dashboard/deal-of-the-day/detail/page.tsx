import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import ax from '../../../lib/axios';
import CustomError from '../../../components/common/CustomError';
import DealsContainer from '../DealsContainer';
import { IDealOfTheDayResponse } from '@repo/ui/types/dealOfTheDay';
import havePermission from '../../../lib/withPermission';

const ViewDealOfTheDay = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | Array<string> | undefined };
}) => {
  let data: IProduct[] = [];
  let deal: IDealOfTheDayResponse[] = [];
  let error: string = '';

  const haveReadDealOfTheDayPermission = await havePermission(
    permissions.dealOfTheDay.read,
  );
  if (!haveReadDealOfTheDayPermission) {
    return (
      <CustomError text="You do not have permission to read deal of the day" />
    );
  }

  try {
    const res: AxiosResponse<IProduct[]> = await ax({
      method: 'get',
      url: endpoints.product,
    });

    const resDeal: AxiosResponse<IDealOfTheDayResponse[]> = await ax({
      method: 'get',
      url: `${endpoints.dealOfTheDay}`,
      params: {
        date: searchParams.date,
      },
    });

    data = res.data;
    deal = resDeal.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <CustomError text="Error occured while fetching deal of the day." />;
  }

  const dealsProductsMap: { [key: string]: boolean } = {};
  deal[0]?.products?.map((a) => {
    dealsProductsMap[`${a.id}`] = true;
  });

  const selectedProducts = data.map((a) => {
    return {
      ...a,
      isSelected: dealsProductsMap[a.id] ? true : false,
    };
  });

  return (
    <div>
      <DealsContainer
        date={searchParams.date?.toString() ?? ''}
        products={selectedProducts}
        type="READ"
      />
    </div>
  );
};

export default ViewDealOfTheDay;
