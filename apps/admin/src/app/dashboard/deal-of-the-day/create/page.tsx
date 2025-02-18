import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import ax from '../../../lib/axios';
import CustomError from '../../../components/common/CustomError';
import DealsContainer from '../DealsContainer';
import havePermission from '../../../lib/withPermission';

const CreateDealOfTheDay = async () => {
  let data: IProduct[] = [];
  let error: string = '';

  const haveCreateDealOfTheDayPermission = await havePermission(
    permissions.dealOfTheDay.create,
  );
  if (!haveCreateDealOfTheDayPermission) {
    return (
      <CustomError text="You do not have permission to create deal of the day" />
    );
  }

  try {
    const res: AxiosResponse<IProduct[]> = await ax({
      method: 'get',
      url: endpoints.product,
    });

    data = res.data;
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

  return (
    <div>
      <DealsContainer
        date={new Date().toString()}
        products={data?.map((a) => {
          return { ...a, isSelected: false };
        })}
        type="create"
      />
    </div>
  );
};

export default CreateDealOfTheDay;
