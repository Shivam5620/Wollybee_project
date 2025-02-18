import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';
import { Skeleton } from './Skeleton';

const ShopAllSkeletonView = () => {
  return (
    <>
      <div className="sm:flex justify-between mx-10 mt-10 hidden">
        <div className="flex gap-3">
          <Skeleton className="w-[170px] h-[50px] rounded-full" />
          <Skeleton className="w-[170px] h-[50px] rounded-full" />
          <Skeleton className="w-[170px] h-[50px] rounded-full" />
          <Skeleton className="w-[170px] h-[50px] rounded-full" />
        </div>
        <div>
          <Skeleton className="w-[170px] h-[50px] rounded-full" />
        </div>
      </div>

      <div className="sm:hidden flex px-[5%] justify-between mt-5">
        <Skeleton className="w-[100px] h-[30px] rounded-full" />
        <Skeleton className="w-[100px] h-[30px] rounded-full" />
      </div>

      <div className="flex w-full mx-auto justify-center py-2 sm:py-10">
        <div className="grid grid-cols-12 gap-2 mb-5 w-full px-[3%]">
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <ProductCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAllSkeletonView;
