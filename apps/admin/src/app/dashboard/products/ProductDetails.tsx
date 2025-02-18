'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Product } from '@repo/ui/enums';
import { IProduct } from '@repo/ui/types';

interface IProductDetails {
  type: Product;
  initialValues?: IProduct | null;
  setFormValues: (values: IProduct) => void;
}

const ProductDetails = ({
  type = Product.READ,
  initialValues,
  setFormValues,
}: IProductDetails) => {
  const [name, setName] = useState<string>(initialValues?.name ?? '');
  const [description, setDescription] = useState<string>(
    initialValues?.description ?? '',
  );
  const [price, setPrice] = useState<number>(initialValues?.price ?? 0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(
    initialValues?.discountedPrice ?? 0,
  );
  const [discountPercentage, setDiscountPercentage] = useState<number>(
    initialValues?.discountPercentage ?? 0,
  );
  const [minPlayers, setMinPlayers] = useState<number>(
    initialValues?.minPlayers ?? 0,
  );
  const [maxPlayers, setMaxPlayers] = useState<number>(
    initialValues?.maxPlayers ?? 0,
  );

  useEffect(() => {
    handleSave();
  }, [
    name,
    description,
    price,
    discountPercentage,
    discountedPrice,
    minPlayers,
    maxPlayers,
  ]);

  const handleSave = () => {
    const payload = {
      name,
      description,
      price,
      discountedPrice,
      discountPercentage,
      minPlayers,
      maxPlayers,
    };
    if (initialValues) {
      setFormValues({ ...initialValues, ...payload });
    }
  };

  useEffect(() => {
    const calculatedDiscountPrice = price - price * (discountPercentage / 100);
    const integerDiscountedPrice = Math.floor(calculatedDiscountPrice);
    setDiscountedPrice(integerDiscountedPrice);
  }, [discountPercentage, price]);

  return (
    <div className="flex flex-col gap-2 shadow-lg p-5">
      <div className="w-full flex justify-between">
        <label className="col-span-12 text-sm text-primary-black font-bold">
          Product Details
        </label>
      </div>

      <Input
        label="Name"
        className="w-full"
        value={name}
        disabled={type === Product.READ}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <Input
        label="Description"
        className="w-full"
        value={description}
        disabled={type === Product.READ}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <Input
        className="Price"
        label="Price"
        value={price}
        disabled={type === Product.READ}
        type="number"
        onChange={(e) => {
          setPrice(Number(e.target.value));
        }}
      />

      <Input
        label="Discounted Price"
        value={discountedPrice}
        disabled={type === Product.READ}
        type="number"
        onChange={(e) => {
          setDiscountedPrice(Number(e.target.value));
        }}
      />

      <Input
        label="Discounted Percentage"
        value={discountPercentage}
        disabled={type === Product.READ}
        type="number"
        onChange={(e) => {
          setDiscountPercentage(Number(e.target.value));
        }}
      />

      <div className="col-span-6">
        <label className="text-primary-black font-bold text-xs">Players </label>

        <div className="flex gap-1">
          <Input
            label="Minimum Players"
            className="w-full"
            value={minPlayers}
            disabled={type === Product.READ}
            type="number"
            onChange={(e) => {
              setMinPlayers(Number(e.target.value));
            }}
          />

          <Input
            label="Maximum Players"
            className="w-full"
            value={maxPlayers}
            disabled={type === Product.READ}
            type="number"
            onChange={(e) => {
              setMaxPlayers(Number(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
