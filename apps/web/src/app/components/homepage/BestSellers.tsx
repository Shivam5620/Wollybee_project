'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import { ICONS } from '@repo/ui/lib';
import { IProduct } from '@repo/ui/types';
import { useAppSelector } from '../../../lib/hooks';

const BestSellers = () => {
  const { products: productsState } = useAppSelector(
    (state) => state.configuration,
  );

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setProducts(productsState);
  }, [productsState]);

  return (
    <div id="homepage-best-sellers">
      <div className="items-center md:px-12">
        <h1 className="text-white  mb-0 xs:my-5 font-cheri xl:text-7xl lg:text-6xl xs:text-5xl text-[38px] text-center capitalize">
          Best Sellers
        </h1>
        <div className="max-w-[1300px] mx-auto">
          <MultipleItemsCarousel
            leftArrowClassName="md:-ml-2"
            rightArrowClassName="md:-mr-2"
            loop={false}
            minComponentNeeded={3}
            Component={ProductCard}
            data={products
              ?.filter((a) => a.bestSelling)
              .map((a) => {
                return { product: a };
              })}
            arrows={{
              left: ICONS.carouselArrows.whiteLeft,
              right: ICONS.carouselArrows.whiteRight,
            }}
            carouselId="best-sellers-carousel"
          />
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
