import React from 'react';
import { Skeleton } from './Skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="sm:w-[290px] sm:h-[410px] rounded-2xl shadow-lg py-5">
      <Skeleton className="h-[70px] sm:h-[50%] m-5" />

      <div className="flex flex-col justify-center">
        <Skeleton className="h-[15px] w-[80%] mx-auto my-2" />
        <Skeleton className="h-[15px] w-[70%] mx-auto my-2" />
        <Skeleton className="h-[15px] w-[60%] mx-auto my-2" />
      </div>

      <div className="flex gap-0 sm:gap-3 justify-center mx-5 mt-2 sm:mt-4">
        <Skeleton className="h-[25px] w-full rounded-lg" />
        <Skeleton className="h-[25px] w-full rounded-lg" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
