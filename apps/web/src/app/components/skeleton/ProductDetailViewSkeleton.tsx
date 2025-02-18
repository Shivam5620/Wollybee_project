import React from 'react';
import { Skeleton } from './Skeleton';
import RatingStars from '../common/RatingStars';
import { Size } from '@repo/ui/enums/size';

const ProductDetailViewSkeleton = () => {
  return (
    <div>
      <div className="font-heyComic flex flex-col md:items-start items-center my-2">
        <section className="flex gap-3 items-center py-2">
          <Skeleton className="w-48 h-[20px]" />
        </section>

        <div className="flex items-center gap-4 md:mb-3 xs:mb-2 mb-0">
          <div className="flex gap-3">
            <Skeleton className="h-[20px] w-[20px] rounded-full" />
            <Skeleton className="h-[20px] w-[20px] rounded-full" />
            <Skeleton className="h-[20px] w-[20px] rounded-full" />
            <Skeleton className="h-[20px] w-[20px] rounded-full" />
            <Skeleton className="h-[20px] w-[20px] rounded-full" />
          </div>
          <Skeleton className="ml-2 mt-1.5" />
        </div>
        <section className="flex gap-3 items-center py-2">
          <Skeleton className="w-[60px] h-[20px]" />
          <Skeleton className="w-[60px] h-[20px]" />
          <Skeleton className="w-24 py-2 inline-flex items-center px-2 rounded-full" />
        </section>
        <Skeleton className="py-1 h-[20px] w-56" />
        <section className="flex gap-3 items-center py-2">
          <Skeleton className="w-44 h-[20px]" />
        </section>

        <section className="flex gap-3 items-center py-2">
          <Skeleton className="w-52 h-[40px] rounded-full" />
        </section>

        <section className="flex gap-3 items-center py-2">
          <Skeleton className="w-56 h-[40px] rounded-full" />
        </section>

        <Skeleton className="w-[2/3] sm:w-full" />
        <div className="md:my-2">
          <Skeleton className="w-[150px] h-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailViewSkeleton;
