'use client';
import React from 'react';
import Image from 'next/image';
import ProductCard from '../product/ProductCard';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import { ICONS } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';

const DealOfTheDay = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="items-center md:mx-12">
      <h1 className="font-cheri xl:text-7xl lg:text-6xl xs:text-5xl text-[38px] text-center md:mb-8 mb-2 mt-5 text-tertiary-green flex justify-center items-center gap-8">
        <p>Deal of The Day</p>
        <Image
          src={ICONS.owlImage}
          width={150}
          height={150}
          alt="owl"
          className="md:block hidden"
        />
      </h1>
      <div className="max-w-[1300px] mx-auto">
        <MultipleItemsCarousel
          loop={false}
          minComponentNeeded={3}
          Component={ProductCard}
          data={products?.map((a) => {
            return { product: a };
          })}
          arrows={{
            left: ICONS.carouselArrows.grayLeft,
            right: ICONS.carouselArrows.grayRight,
          }}
          carouselId="deal-of-the-day-carousel"
        />
      </div>
    </div>
  );
};

export default DealOfTheDay;
