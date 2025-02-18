'use client';
import React from 'react';
import { IProduct } from '@repo/ui/types';
import { Product } from '@repo/ui/enums';
import { IFile } from '@repo/ui/types/file';
import AdditionalInfoContainer from './AdditionalInfoContainer';

interface IProductAdditionalInfoProps {
  type: Product;
  images: IFile[];
  initialValues: IProduct;
  setFormValues: (values: IProduct) => void;
}

const ProductAdditionalInfo = ({
  type = Product.READ,
  initialValues,
  images,
  setFormValues,
}: IProductAdditionalInfoProps) => {
  return (
    <AdditionalInfoContainer
      setFormValues={setFormValues}
      type={type}
      images={images}
      initialValues={initialValues}
    />
  );
};

export default ProductAdditionalInfo;
