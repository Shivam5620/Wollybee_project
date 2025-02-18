'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../lib/hooks';
import ProductBenefitsCarousel from '../../../components/product/ProductBenefitsCarousel';

const ProductBenefitsWrapper = () => {
  const { accordionLocation, product } = useAppSelector(
    (state) => state.product,
  );
  const [accordionLocationState, setAccordionLocationState] =
    useState<number>(accordionLocation);

  useEffect(() => {
    setAccordionLocationState(accordionLocation);
  }, [accordionLocation, product]);

  return (
    <>
      <div className="hidden sm:block mt-40 mb-20">
        <div style={{ marginTop: accordionLocationState - 50 }}>
          <ProductBenefitsCarousel images={product?.images ?? []} />
        </div>
      </div>
      <div className="sm:hidden">
        <ProductBenefitsCarousel images={product?.images ?? []} />
      </div>
    </>
  );
};

export default ProductBenefitsWrapper;
