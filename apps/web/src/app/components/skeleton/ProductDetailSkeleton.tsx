import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';
import { Skeleton } from './Skeleton';
import ProductImagesViewSkeleton from './ProductImagesViewSkeleton';
import ProductDetailViewSkeleton from './ProductDetailViewSkeleton';

export const BenefitsContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 px-5 md:px-10">
      <Skeleton className="rounded-full w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[250px] md:h-[250px]" />
    </div>
  );
};

const ProductDetailSkeleton = () => {
  return (
    <div className="w-full md:my-10 justify-center overflow-hidden">
      <div className="flex xl:gap-20 lg:gap-10 md:gap-5 justify-center md:flex-row flex-col">
        <ProductImagesViewSkeleton />
        <ProductDetailViewSkeleton />
      </div>

      <div className="sm:block mt-10">
        <div className="w-full my-4 md:my-0 py-3 md:py-4 md:px-16 lg:px-20 xl:px-2">
          <div className="flex gap-2 sm:gap-12 justify-center pb-2">
            <BenefitsContainer />
            <BenefitsContainer />
            <BenefitsContainer />
          </div>
        </div>
      </div>

      <div className="flex gap-12 justify-center pb-2 px-5 my-5">
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

export default ProductDetailSkeleton;
