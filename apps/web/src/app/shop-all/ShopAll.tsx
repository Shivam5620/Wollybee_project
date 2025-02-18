import { IProduct } from '@repo/ui/types';
import React, { useState } from 'react';
import CustomPagination from '../components/common/CustomPagination';
import ProductCard from '../components/product/ProductCard';

const ShopAllPaginationContainer = ({ products }: { products: IProduct[] }) => {
  const [paginatedProducts, setPaginatedProducts] = useState<IProduct[]>([]);

  return (
    <>
      <div className="flex w-full mx-auto justify-center">
        <div className="grid grid-cols-12 gap-2 lg:gap-1 mb-5 w-full px-[3%] lg:px-[5%]">
          {paginatedProducts?.map((a) => (
            <div className="col-span-6 lg:col-span-4 xl:col-span-3" key={a.id}>
              <ProductCard product={a} />
            </div>
          ))}
        </div>
      </div>

      <CustomPagination
        items={products}
        defaultPage={1}
        itemsPerPage={16}
        onChangePage={(product) => {
          setPaginatedProducts(product);
        }}
      />
    </>
  );
};

export default ShopAllPaginationContainer;
