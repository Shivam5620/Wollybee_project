import React from 'react';
import { Skeleton } from './Skeleton';

const ProductImageSlideSkeleton = () => {
  return (
    <div className="w-full flex justify-center md:rounded-lg sm:my-auto md:items-center sm:mx-auto h-[350px] md:w-[130px] md:h-[130px] xl:w-[150px] xl:h-[150px]  overflow-hidden">
      <Skeleton className="w-full md:w-[130px] md:h-[130px] xl:w-[95%] xl:h-[95%]" />
    </div>
  );
};

const ProductImagesViewSkeleton = () => {
  return (
    <div>
      <div className="hidden md:flex items-center lg:gap-5">
        <div className="flex flex-col gap-3">
          <ProductImageSlideSkeleton />
          <ProductImageSlideSkeleton />
          <ProductImageSlideSkeleton />
        </div>

        <Skeleton className="md:block hidden rounded-xl w-[495px] h-[495px] md:w-[530px] md:h-[530px] overflow-hidden" />
      </div>

      <Skeleton className="md:hidden max-w-[500px] overflow-hidden max-h-[500px] w-screen h-[300px]" />
    </div>
  );
};

export default ProductImagesViewSkeleton;
