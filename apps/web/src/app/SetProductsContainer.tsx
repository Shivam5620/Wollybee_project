'use client';

import { IProduct } from '@repo/ui/types';
import { useAppDispatch } from '../lib/hooks';
import { useEffect } from 'react';
import { setProducts } from '@repo/ui/lib/features/productSlice';

const SetProductsContainer = ({ products }: { products: IProduct[] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProducts(products));
  }, []);
  return <></>;
};

export default SetProductsContainer;
