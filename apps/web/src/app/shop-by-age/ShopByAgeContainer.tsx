'use client';
import React from 'react';
import CategoryComponentDesktop from '../components/common/CategoryComponentDesktop';
import { IProduct, IProductAge } from '@repo/ui/types';
import ProductCard from '../components/product/ProductCard';
import CategoryComponentMobile from '../components/common/CategoryComponentMobile';

const ShopByAgeContainer = ({
  data,
  products,
}: {
  data: IProductAge[];
  products: IProduct[];
}) => {
  return (
    <>
      <div className="w-full my-2 hidden md:block">
        {data?.map((item) => (
          <div key={item.name}>
            <CategoryComponentDesktop
              carouselId={`shop-by-age-carousel-desktop-${item.id}`}
              color={item.color}
              image={item.file.url}
              text={item.name}
              data={products
                .filter((a) => {
                  const isValid = a.ages.find((a) => a.id == item.id);
                  return isValid ? true : false;
                })
                .map((a) => {
                  return {
                    product: a,
                  };
                })}
              CardComponent={(data: { product: IProduct }) => {
                return (
                  <ProductCard
                    product={data.product}
                    className="shadow-[1px_2px_20px_1px_#00000010]"
                  />
                );
              }}
            />
          </div>
        ))}
      </div>
      <div className="md:hidden my-10 w-full">
        {data?.map((item) => (
          <div key={item.name}>
            <CategoryComponentMobile
              carouselId={`shop-by-age-carousel-mobile-${item.id}`}
              key={item.file.url}
              color={item.color}
              image={item.file.url}
              text={item.name}
              data={products
                .filter((a) => {
                  const isValid = a.ages.find((a) => a.id == item.id);
                  return isValid ? true : false;
                })
                .map((a) => {
                  return {
                    product: a,
                  };
                })}
              CardComponent={ProductCard}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ShopByAgeContainer;
