import { IProduct } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import CustomError from '../common/CustomError';
import { Suspense } from 'react';
import DealOfTheDay from './DealOfTheDay';
import { logError } from '../../../utils/helper';

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const DealOfTheDayContainer = async (): Promise<JSX.Element> => {
  let data: IProduct[] = [];
  let products: IProduct[] = [];
  let error: string = '';

  try {
    const [resData, resProducts] = await Promise.all([
      ax({
        method: 'get',
        url: endpoints.dealOfTheDay,
        params: {
          date: formatDate(new Date()),
        },
      }),
      ax({
        method: 'get',
        url: endpoints.product,
      })
    ])
    data = resData.data?.[0]?.products;
    products = resProducts.data;
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'DealOfTheDayContainer');
    error = 'Error fetching Deal of the day Products..';
  }

  if (error) {
    return <></>;
  }

  let dealOfTheDayProducts: IProduct[] = [];
  if (data && products) {
    const productsMap: { [key: string]: IProduct } = {};
    products.forEach((a) => {
      productsMap[`${a.id}`] = a;
    });
    data.forEach((a) => {
      dealOfTheDayProducts.push(productsMap[`${a.id}`]);
    });
  }
  return (
    <>
      <Suspense>
        {data && <DealOfTheDay products={dealOfTheDayProducts} />}
      </Suspense>
    </>
  );
};

export default DealOfTheDayContainer;
