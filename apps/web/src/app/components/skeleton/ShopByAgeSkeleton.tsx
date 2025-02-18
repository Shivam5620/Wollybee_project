import React from 'react';
import CategoryComponentDesktopSkeleton from './CategoryComponentDesktopSkeleton';
import CategoryComponentMobileSkeleton from './CategoryComponentMobileSkeleton';
import { Skeleton } from './Skeleton';

const ShopByAgeSkeleton = () => {
  return (
    <>
      <div className="hidden sm:flex flex-col gap-5">
        <div className="justify-center items-center flex px-[5%] mt-5 py-5 gap-10">
          <Skeleton className="w-[150px] h-[50px] rounded-full" />
          <Skeleton className="w-[150px] h-[50px] rounded-full" />
          <Skeleton className="w-[150px] h-[50px] rounded-full" />
        </div>
        <CategoryComponentDesktopSkeleton />
        <CategoryComponentDesktopSkeleton />
        <CategoryComponentDesktopSkeleton />
      </div>
      <div className="sm:hidden gap-4">
        <CategoryComponentMobileSkeleton />
        <CategoryComponentMobileSkeleton />
        <CategoryComponentMobileSkeleton />
        <CategoryComponentMobileSkeleton />
      </div>
    </>
  );
};

export default ShopByAgeSkeleton;
