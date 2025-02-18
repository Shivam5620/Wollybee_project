'use client';
import { IProduct } from '@repo/ui/types';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../lib/hooks';
import { setProduct } from '@repo/ui/lib/features/productSlice';

const SetProductContainer = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) {
      dispatch(setProduct(product));
    }
    const header = document.getElementById('wollybee-header');
    header?.classList.remove('-translate-y-full');
  }, [product]);
  return <div></div>;
};

export default SetProductContainer;
