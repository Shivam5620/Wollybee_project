import React from 'react';
import { Skeleton } from './Skeleton';

const ThankyouPageSkeleton = () => {
  return (
    <div className="max-w-[1440px] px-[5%] mx-auto">
      <Skeleton className="text-primary-color h-10 w-full mt-16 mb-5 font-heyComic lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center" />

      <p className="text-center text-primary-black font-heyComic md:text-2xl text-base md:w-[70%] mx-auto">
        <Skeleton className="text-primary-color h-10 w-full mb-5 font-heyComic lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center" />
        <Skeleton className="text-primary-color h-10 w-full mb-5 font-heyComic lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center" />
      </p>
      <div className="md:px-[10%] p-0">
        <div className="rounded-3xl md:p-14 py-2 pb-20 px-3 md:my-20 mt-14 mb-10 shadow-[0px_1px_15px_0px_#e3e3e3]">
          <Skeleton className="text-primary-color h-10 w-full mb-5 font-heyComic lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center" />

          <Skeleton className="rounded-3xl h-44 md:py-12 py-8 md:px-8 px-6 my-5" />
          <Skeleton className="rounded-3xl h-44 md:py-12 py-8 md:px-8 px-6" />
        </div>
      </div>
    </div>
  );
};

export default ThankyouPageSkeleton;
