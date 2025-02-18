import { ICONS, profileRoutes } from '@repo/ui/lib';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from './Skeleton';

const MyAddressCard = () => {
  return (
    <div className="mb-4 bg-white shadow-[0px_2px_15px_0px_#00000018] flex flex-col justify-between rounded-3xl px-4 md:px-10 md:py-6 py-4 w-full sm:w-[320px] relative my-3">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-44 h-8" />
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-28 h-8" />
        <Skeleton className="w-44 h-8" />
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-28 h-8" />
      </div>
    </div>
  );
};

const MyAddressSkeleton = () => {
  return (
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
      <>
        <div className="flex gap-1 sm:gap-4 flex-wrap py-2 justify-center">
          <MyAddressCard />
          <MyAddressCard />
          <MyAddressCard />
          <MyAddressCard />
          <MyAddressCard />
          <MyAddressCard />
          <MyAddressCard />
          <MyAddressCard />
          <MyAddressCard />
        </div>
      </>
    </div>
  );
};

export default MyAddressSkeleton;
