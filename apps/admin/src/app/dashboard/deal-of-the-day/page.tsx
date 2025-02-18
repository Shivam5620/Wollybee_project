import React from 'react';
import axios, { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IDealOfTheDayResponse } from '@repo/ui/types/dealOfTheDay';
import CustomError from '../../components/common/CustomError';
import ListDealOfTheDay from './ListDealOfTheDay';
import havePermission from '../../lib/withPermission';

const DealOfTheDay = async () => {
  let data: IDealOfTheDayResponse[] = [];
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
    const res: AxiosResponse<IDealOfTheDayResponse[]> = await ax({
      method: 'get',
      url: endpoints.dealOfTheDay,
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
      <ListDealOfTheDay deals={data} />
    </div>
  );
};

export default DealOfTheDay;
