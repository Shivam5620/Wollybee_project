'use client';
import React, { useEffect, useState } from 'react';
import { Product } from '@repo/ui/enums';
import { IProduct } from '@repo/ui/types';
import { Input } from '../../../../components/ui/input';

interface IProductMoreWaysToPlayProps {
  type: Product;
  initialValues: IProduct;
  setFormValues: (values: IProduct) => void;
}

const ProductMoreWaysToPlay = ({
  type = Product.READ,
  initialValues,
  setFormValues,
}: IProductMoreWaysToPlayProps) => {
  const [description, setDescription] = useState<string>(
    initialValues.moreWaysToPlayDescription ?? '',
  );
  const [embedUrl, setEmbedUrl] = useState<string>(
    initialValues.moreWaysToPlayUrl ?? '',
  );

  useEffect(() => {
    handleSave();
  }, [description, embedUrl]);

  const handleSave = () => {
    setFormValues({
      ...initialValues,
      moreWaysToPlayDescription: description,
      moreWaysToPlayUrl: embedUrl,
    });
  };

  return (
    <div className="w-full shadow-lg p-5 my-2">
      <div className="w-full flex justify-between py-2">
        <label className="text-sm text-primary-black font-bold">
          More ways to play
        </label>
      </div>

      <Input
        label="Enter Youtube Video ID"
        value={embedUrl}
        disabled={type == Product.READ}
        type="text"
        placeholder="Enter Embed Youtube video link."
        onChange={(e) => {
          setEmbedUrl(e.target.value);
        }}
      />

      <section className="gap-2 col-span-6 items-center">
        <label className="text-secondary-color text-xs">Description</label>
        <textarea
          className="w-full my-2 p-4 border border-blue-300 rounded-md"
          disabled={type == Product.READ}
          rows={5}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </section>
    </div>
  );
};

export default ProductMoreWaysToPlay;
