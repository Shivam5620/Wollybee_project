'use client'
import { IProduct } from '@repo/ui/types';
import React, { useState } from 'react';
import CustomPagination from '../components/common/CustomPagination';
import ProductCard from '../components/product/ProductCard';

const ComboGiftSetsContainer = ({ products }: { products: IProduct[] }) => {
    const [paginatedProducts, setPaginatedProducts] = useState<IProduct[]>([]);

  return (
    <>
      <div className="flex w-full mx-auto justify-center">
        <div className="grid grid-cols-12 gap-2 mb-10 w-full px-[3%] ">
          {paginatedProducts?.map((a) => (
            <div className="col-span-6 sm:col-span-3" key={a.id}>
              <ProductCard product={a} />
            </div>
          ))}
        </div>
      </div>

      <CustomPagination
        items={products}
        defaultPage={1}
        itemsPerPage={8}
        onChangePage={(product) => {
          setPaginatedProducts(product);
        }}
      />
    </>
  );
}

export default ComboGiftSetsContainer