import React, { useState } from 'react';
import { IFileClient } from './MediaContainer';
import Image from 'next/image';
import CustomPagination from './CustomPagination';

const ShowImagesContainer = ({
  images,
  multiselect,
  handleImageClick,
  selectedImages,
}: {
  images: IFileClient[];
  selectedImages: IFileClient[];
  multiselect: boolean;
  handleImageClick: (image: IFileClient) => void;
}) => {
  const [filteredImages, setFilteredImages] = useState<IFileClient[]>([]);

  return (
    <>
      <div className="w-full min-h-screen overflow-y-scroll p-2 flex flex-wrap gap-2">
        {filteredImages?.map((a) => (
          <div
            key={a.url}
            className="relative items-center content-center max-w-[170px] max-h-[170px] overflow-hidden"
          >
            {multiselect && a.isSelected && (
              <span className="absolute top-0 right-0 bg-primary-color rounded-full h-4 w-4 text-xs pl-[2px] text-white">
                ✔
              </span>
            )}
            {!multiselect && selectedImages[0]?.url == a.url && (
              <span className="absolute top-0 right-0 bg-primary-color rounded-full h-4 w-4 text-xs pl-[2px] text-white">
                ✔
              </span>
            )}
            <Image
              priority
              key={a.url}
              className={`cursor-pointer rounded-md hover:shadow-md hover:border-2 hover:border-primary-color`}
              src={a.url}
              width={200}
              onClick={() => {
                handleImageClick(a);
              }}
              height={200}
              alt="image"
            />
          </div>
        ))}
      </div>

      <CustomPagination
        items={images}
        defaultPage={1}
        itemsPerPage={20}
        onChangePage={(values) => {
          setFilteredImages(values);
        }}
      />
    </>
  );
};

export default ShowImagesContainer;
