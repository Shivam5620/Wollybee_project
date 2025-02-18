'use client';
import Heading from '../components/common/Heading';
import ProductFilter from '../components/filter/ProductFilter';
import { useState } from 'react';
import { IFilterClient, IProduct } from '@repo/ui/types';
import ShopAllPaginationContainer from './ShopAll';

interface IShopAllContainerProps {
  refreshFilters?: boolean;
  heading?: string;
  filterData: IFilterClient;
  productData: IProduct[];
}

const ShopAllContainer = ({
  refreshFilters = false,
  heading = 'Shop All',
  filterData,
  productData,
}: IShopAllContainerProps) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  return (
    <div className="justify-center">
      {heading == 'Shop All' ? (
        <Heading color="text-secondary-color" text={heading} />
      ) : (
        <div className="text-center md:p-2 py-1 md:mt-10 mt-3">
          <p className={`font-cheri text-4xl md:text-6xl text-secondary-color`}>
            Combos <span className="font-heyComic">&</span> gift sets
          </p>
        </div>
      )}
      <ProductFilter
        refreshFilters={refreshFilters}
        filterData={filterData}
        setProducts={setFilteredProducts}
        products={productData}
      />
      <ShopAllPaginationContainer products={filteredProducts} />
    </div>
  );
};

export default ShopAllContainer;
