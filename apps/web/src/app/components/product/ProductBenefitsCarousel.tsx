'use client';
import React from 'react';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import { ICONS } from '@repo/ui/lib';
import { IFile } from '@repo/ui/types/file';
import Image from 'next/image';

const ProductBenefitsComponent = ({ image }: { image: string }) => {
  return (
    <div key={image} className="w-full flex sm:py-10 justify-center">
      <Image
        src={image}
        alt="benefits"
        width={200}
        height={200}
        className="mx-auto p-2 sm:w-[300px] sm:h-[300px] rounded-full overflow-clip"
      />
    </div>
  );
};

const ProductBenefitsCarousel = ({ images }: { images: IFile[] }) => {
  return (
    <div className="bg-secondary-color max-w-[1280px] xl:mx-auto md:mx-[5%] md:rounded-3xl py-5 lg:py-10 md:mt-32 mt-12 md:px-8">
      <h1 className="font-cheri xl:text-6xl lg:text-5xl md:text-5xl text-4xl text-center mb-8 text-white">
        Benefits
      </h1>
      <MultipleItemsCarousel
        loop={false}
        slidesPerView={3}
        Component={ProductBenefitsComponent}
        data={images?.map((a) => {
          return { image: a.url };
        })}
        arrows={{
          left: ICONS.carouselArrows.whiteLeft,
          right: ICONS.carouselArrows.whiteRight,
        }}
        carouselId="product-benefits-carousel"
      />
    </div>
  );
};

export default ProductBenefitsCarousel;
