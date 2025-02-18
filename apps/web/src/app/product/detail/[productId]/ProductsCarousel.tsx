'use client';
import React, { useEffect, useState } from 'react';
import { ICONS } from '@repo/ui/lib';
import { useAppSelector } from '../../../../lib/hooks';
import { MultipleItemsCarousel } from '../../../components/common/CustomCarousel';
import ProductCard from '../../../components/product/ProductCard';
import { IProduct } from '@repo/ui/types';

const ProductsCarousel = () => {
  const { products: productsFromState } = useAppSelector(
    (state) => state.configuration,
  );

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setProducts(productsFromState);
  }, [productsFromState]);

  return (
    <div className="my-4 md:my-0 md:py-4 max-w-[1300px] mx-auto">
      <div className="items-center">
        <h1 className="text-secondary-color mt-5 md:mb-6 xs:-mb-0 -mb-3 py-3 font-cheri xl:text-7xl lg:text-6xl xs:text-5xl text-[35px] text-center capitalize">
          Parents also bought
        </h1>

        <MultipleItemsCarousel
          loop={false}
          minComponentNeeded={3}
          Component={ProductCard}
          data={products.map((a) => {
            return { product: a };
          })}
          arrows={{
            left: ICONS.carouselArrows.grayLeft,
            right: ICONS.carouselArrows.grayRight,
          }}
          carouselId="customer-also-bought-carousel"
        />
      </div>
    </div>
  );
};

export default ProductsCarousel;
