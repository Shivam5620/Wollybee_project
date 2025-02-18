'use client';
import React from 'react';
import { Skeleton } from './Skeleton';

function FAQItem() {
  return (
    <Skeleton className="rounded-3xl h-10 md:py-5 py-8 md:px-8 px-6 my-5" />
  );
}

const FAQSkeleton = () => {
  const categories = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className="grid grid-cols-12 md:mx-10 mx-4 py-5 md:px-16">
        <div className="col-span-12 md:col-span-3">
          <Skeleton className="rounded-3xl h-8 md:py-5 py-3 w-44 md:px-8 px-6 my-5" />

          <div className="">
            {categories.map((a, index) => (
              <div key={index} className="gap-3 md:flex-col hidden md:block">
                <Skeleton
                  className={`w-44 py-4 my-3 font-heyComic cursor-pointer text-xl}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 mt-10">
          {categories.map((a, index) => (
            <FAQItem />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSkeleton;
