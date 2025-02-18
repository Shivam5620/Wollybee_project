import React from 'react';
import { Skeleton } from './Skeleton';
import ProductCardSkeleton from './ProductCardSkeleton';

export const ImageContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 px-5 md:px-10">
      <Skeleton className="rounded-full w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[250px] md:h-[250px]" />
      <Skeleton className="rounded-full w-[100px] h-[20px] sm:w-[150px] sm:h-[25px]" />
    </div>
  );
};

const HomePageSkeleton = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="py-2 sm:py-8 flex justify-center">
        <div className="text-center md:px-12">
          <h1 className="px-1 text-primary-color my-5 sm:my-4 font-cheri xl:text-7xl lg:text-6xl md:text-5xl text-4xl">
            Shop By Age
          </h1>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-12 justify-center">
        <ImageContainer />
        <ImageContainer />
        <ImageContainer />
      </div>

      <div className="py-2 sm:py-8 flex justify-center">
        <div className="text-center md:px-12">
          <h1 className="px-1 text-primary-color my-5 sm:my-4 font-cheri xl:text-7xl lg:text-6xl md:text-5xl text-4xl">
            Best Sellers
          </h1>
        </div>
      </div>

      <div className="flex gap-12 justify-center pb-2">
        <div className="flex w-full mx-auto justify-center py-2 sm:py-3">
          <div className="grid grid-cols-12 gap-2 mb-5 w-full justify-center">
            <div className="col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="hidden sm:block col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="hidden sm:block col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 sm:py-8 flex justify-center">
        <div className="text-center md:px-12">
          <h1 className="px-1 text-tertiary-green my-5 sm:my-4 font-cheri xl:text-7xl lg:text-6xl md:text-5xl text-4xl">
            Deal of the day
          </h1>
        </div>
      </div>

      <div className="flex gap-12 justify-center pb-2">
        <div className="flex w-full mx-auto justify-center py-2 sm:py-3">
          <div className="grid grid-cols-12 gap-2 mb-5 w-full justify-center">
            <div className="col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="hidden sm:block col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="hidden sm:block col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 sm:py-8 flex justify-center">
        <div className="text-center md:px-12">
          <h1 className="px-1 text-primary-color my-5 sm:my-4 font-cheri xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
            Why parents and little learners love us?
          </h1>
        </div>
      </div>

      <div className="flex gap-12 justify-center pb-2">
        <div className="flex w-full mx-auto justify-center py-2 sm:py-3">
          <div className="grid grid-cols-12 gap-2 mb-5 w-full justify-center">
            <div className="col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="hidden sm:block col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
            <div className="hidden sm:block col-span-6 sm:col-span-3">
              <ProductCardSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
