'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import MediaContainer from '../media/MediaContainer';
import { IFile } from '@repo/ui/types/file';
import CustomDialog from '../../components/common/CustomDialog';
import { Product } from '@repo/ui/enums';
import { IProduct } from '@repo/ui/types';
import Image from 'next/image';

interface IProductImagesProps {
  images: IFile[];
  type: Product;
  initialValues: IProduct;
  setFormValues: (values: IProduct) => void;
}

const ProductImages = ({
  images,
  type = Product.READ,
  initialValues,
  setFormValues,
}: IProductImagesProps) => {
  const [files, setFiles] = useState<IFile[]>(initialValues?.images ?? []);
  const [showMediaContainerModal, setShowMediaContainerModal] =
    useState<boolean>(false);

  const handleSelectImages = (data: IFile[]) => {
    setFiles(data);
    setShowMediaContainerModal(false);
  };

  useEffect(() => {
    handleSave();
  }, [files]);

  const handleSave = () => {
    setFormValues({
      ...initialValues,
      images: files,
    });
  };

  return (
    <div className="w-full shadow-lg p-5 my-2">
      <div className="w-full flex justify-between py-2">
        <label className="text-sm text-primary-black font-bold">
          Product Images
        </label>

        {type != Product.READ && (
          <section className="flex gap-2">
            <Button
              onClick={() => {
                setShowMediaContainerModal(true);
              }}
            >
              Select Files
            </Button>

            <Button
              onClick={() => {
                setFiles([]);
                setShowMediaContainerModal(false);
              }}
            >
              Reset
            </Button>
          </section>
        )}
      </div>
      <CustomDialog
        className="max-w-[95vh] max-h-[95vh] overflow-scroll"
        open={showMediaContainerModal}
        Component={
          <MediaContainer
            onClose={() => {
              setShowMediaContainerModal(false);
            }}
            isModal={true}
            onSelectImages={handleSelectImages}
            images={images}
            multiselect={true}
            showImagePreviewOnClick={false}
          />
        }
      />

      {files.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {files?.map((a) => (
            <div key={a.id}>
              <Image alt="image" src={a.url} width={200} height={200} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
