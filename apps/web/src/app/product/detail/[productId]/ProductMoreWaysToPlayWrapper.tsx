import React from 'react';
import ProductMoreWaysToPlay from './ProductMoreWaysToPlay';
import { IProduct } from '@repo/ui/types';
import ProductBenefitsCarouselWrapper from './ProductBenefitsCarouselWrapper';

const ProductMoreWaysToPlayWrapper = ({ product }: { product: IProduct }) => {

  return (
    <div className="">
      <ProductBenefitsCarouselWrapper color="#8ac48a">
        <div className="py-4 md:px-[5%]" style={{ backgroundColor: '#8ac48a' }}>
          <ProductMoreWaysToPlay
            url={product?.moreWaysToPlayUrl}
            description={product?.moreWaysToPlayDescription}
          />
        </div>
      </ProductBenefitsCarouselWrapper>
    </div>
  );
};

export default ProductMoreWaysToPlayWrapper;
