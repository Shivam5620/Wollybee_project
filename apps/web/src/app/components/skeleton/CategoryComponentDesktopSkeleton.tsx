import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

function CategoryComponentDesktopSkeleton() {
  return (
    <>
      <div className="flex flex-row lg:gap-4 gap-10 justify-center items-center w-full py-4 mx-auto">
        <div className="items-center">
          <svg
            width="314"
            height="487"
            viewBox="0 0 314 487"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: '#D3D3D3' }}
            className={`animate-pulse hidden md:block lg:h-auto h-[410px] p-3 -ml-10`}
          >
            <rect width="254" height="487" rx="14" fill="" />
            <circle cx="235.5" cy="70.5" r="70.5" fill="" />
            <ellipse cx="224" cy="197.5" rx="74" ry="73.5" fill="" />
            <circle cx="224" cy="314" r="67" fill="" />
            <circle cx="242" cy="415" r="72" fill="" />
          </svg>
        </div>

        <div className="ml-16">
          <div className="flex gap-20">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryComponentDesktopSkeleton;
