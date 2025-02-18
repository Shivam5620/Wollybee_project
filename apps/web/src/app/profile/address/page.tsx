import { endpoints, ICONS, profileRoutes } from '@repo/ui/lib';
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';
import React, { Suspense } from 'react';
import ax from '../../lib/axios';
import Link from 'next/link';
import Error from './error';
import { IAddress } from '@repo/ui/types/address';
import AddAddressModal from './AddAddressModal';
import AddressCardsContainer from './AddressCardsContainer';
import MyAddressSkeleton from '../../components/skeleton/MyAddressSkeleton';

const MyAddresses = async () => {
  let addresses: IAddress[] = [];
  let error: string = '';

  try {
    const resMyAddresses: AxiosResponse<IAddress[]> = await ax({
      method: 'get',
      url: endpoints.address,
    });
    addresses = resMyAddresses.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <Error />;
  }

  return (
    <Suspense fallback={<MyAddressSkeleton />}>
      <div className="flex flex-col px-[10%] lg:px-[12%] mx-auto justify-center">
        <div className="flex justify-between items-center mt-6 md:mt-10 md:mb-16 mb-4 relative w-full">
          <Link href={profileRoutes.myProfile}>
            <Image
              alt="backIcon"
              src={ICONS.carouselArrows.grayLeft}
              width={35}
              className="p-3 md:p-2"
              height={35}
            />
          </Link>
          <p className="text-4xl md:text-7xl font-cheri text-tertiary-red absolute top-0 left-1/2 -translate-x-1/2">
            Addresses
          </p>
          <p></p>
        </div>
        <AddressCardsContainer addresses={addresses} />
      </div>
    </Suspense>
  );
};

export default MyAddresses;
