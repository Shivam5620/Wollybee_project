import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authUtils';
import { ICartItemResponse, IProduct } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import CartContainerWrapper from './CartContainerWrapper';
import { IAddress } from '@repo/ui/types/address';
import { Suspense } from 'react';
import { logError } from '../../../utils/helper';

export type ProductDictionary = {
  [key: number]: IProduct;
};

const UserCartDetails = async () => {
  const session = await getServerSession(authOptions);

  let data: ICartItemResponse[] = [];
  let myAddresses: IAddress[] = [];
  let error: string = '';

  try {
    if (session?.user.id) {
      const [resMyAddresses, resData]: [
        AxiosResponse<IAddress[]>,
        AxiosResponse<ICartItemResponse[]>,
      ] = await Promise.all([
        ax({
          method: 'get',
          url: endpoints.address,
        }),
        ax({
          method: 'get',
          url: `${endpoints.cartItem}`,
        }),
      ]);
      myAddresses = resMyAddresses.data;
      data = resData.data;
    }
  } catch (err: unknown) {
    logError(JSON.stringify(err), 'UserCartDetails');
    error = JSON.stringify(err);
  }

  return (
    <Suspense fallback={<div>Loading Cart...</div>}>
      <CartContainerWrapper cartItems={data} myAddresses={myAddresses} />
    </Suspense>
  );
};

export default UserCartDetails;
