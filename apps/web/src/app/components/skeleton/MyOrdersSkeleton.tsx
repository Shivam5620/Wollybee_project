import React from 'react';
import { Button } from '../../../ui/components/ui/button';
import { IndianRupee, Link2 } from 'lucide-react';
import { Skeleton } from './Skeleton';
import Link from 'next/link';
import { ICONS, profileRoutes } from '@repo/ui/lib';
import Image from 'next/image';

const MyOrderCardClient = () => {
  return (
    <div className="my-2 bg-white shadow-[0px_2px_15px_0px_#00000018] rounded-3xl px-4 md:px-6 py-4">
      <div className="flex justify-between mb-1">
        <Skeleton className=" h-10 w-44" />
        <Skeleton className=" h-10 w-44" />
      </div>

      <div className="px-[5%] xs:px-0 mt-5">
        <div className="flex justify-center gap-2">
          <div className="px-7 py-5 md:p-5 min-w-[200px] max-w-[250px] rounded-3xl bg-gray-light-bg flex flex-col items-center gap-4">
            <Skeleton className="overflow-hidden h-[200px] w-[200px] aspect-auto  rounded-2xl" />
          </div>

          <div className="hidden px-7 py-5 md:p-5 min-w-[200px] max-w-[250px] rounded-3xl bg-gray-light-bg sm:flex flex-col items-center gap-4">
            <Skeleton className="overflow-hidden h-[200px] w-[200px] aspect-auto  rounded-2xl" />
          </div>

          <div className="hidden px-7  py-5 md:p-5 min-w-[200px] max-w-[250px] rounded-3xl bg-gray-light-bg md:flex flex-col items-center gap-4">
            <Skeleton className="overflow-hidden h-[200px] w-[200px] aspect-auto  rounded-2xl" />
          </div>
        </div>

        <div className="font-helveticaRoundedBold flex justify-between items-center mt-10">
          <Skeleton className="h-10 w-44" />
        </div>
      </div>
    </div>
  );
};

const MyOrdersSkeleton = () => {
  return (
    <div className="flex flex-col px-[5%] xs:px-[10%] mx-auto justify-center overflow-hidden">
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
      <div className="flex flex-col justify-center mx-auto">
        <MyOrderCardClient />
        <MyOrderCardClient />
        <MyOrderCardClient />
        <MyOrderCardClient />
        <MyOrderCardClient />
        <MyOrderCardClient />
        <MyOrderCardClient />
        <MyOrderCardClient />
      </div>
    </div>
  );
};

export default MyOrdersSkeleton;
