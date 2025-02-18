import React from 'react';
import { ScrollArea, ScrollBar } from '../../../ui/components/ui/scroll-area';
import { IProduct } from '@repo/ui/types';
import MobileProductCard from '../product/MobileProductCard';
import { useAppSelector } from '../../../lib/hooks';

const PeopleBoughtMobile = () => {
  const { products } = useAppSelector((state) => state.configuration);
  return (
    <div>
      <ScrollArea className="md:w-96 w-full whitespace-nowrap rounded-md ">
        <div className="flex w-max space-x-4 p-4">
          {products?.map((a) => <MobileProductCard product={a} />)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default PeopleBoughtMobile;
