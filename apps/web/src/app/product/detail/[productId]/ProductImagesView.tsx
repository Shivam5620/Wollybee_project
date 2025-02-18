'use client';
import Image from 'next/image';
import { useState } from 'react';
import { SimpleCarousel } from '../../../components/common/CustomCarousel';
import { IFile } from '@repo/ui/types/file';
import { CustomVerticalCarousel } from '../../../components/common/CustomVerticalCarousel';
import FsLightbox from 'fslightbox-react';
import { ICONS } from '@repo/ui/lib';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export const ProductLightBox = ({
  images,
  className,
}: {
  images: IFile[];
  className: ClassNameValue;
}) => {
  const [toggler, setToggler] = useState<boolean>(false);
  return (
    <div className={twMerge('', className)}>
      <Image
        className="cursor-pointer"
        src={ICONS.searchIcon}
        width={50}
        height={50}
        onClick={() => {
          setToggler(!toggler);
        }}
        alt="search"
      />

      <>
        <FsLightbox
          type="image"
          toggler={toggler}
          sources={images.map((a) => {
            return a.url;
          })}
        />
      </>
    </div>
  );
};

const ProductImagesView = ({ images }: { images: IFile[] }) => {
  const [currentImage, setCurrentImage] = useState<string>(images?.[0]?.url);

  const ProductImageSlide = ({ imageUrl }: { imageUrl: string }) => {
    return (
      <div className="w-full flex justify-center md:rounded-lg sm:my-auto md:items-center sm:mx-auto h-[350px] md:w-[130px] md:h-[130px] xl:w-[150px] xl:h-[150px]  overflow-hidden">
        <Image
          alt="Product"
          src={imageUrl}
          width={300}
          height={300}
          onClick={() => {
            setCurrentImage(imageUrl);
          }}
          className="w-full md:w-[130px] md:h-[130px] xl:w-[95%] xl:h-[95%] cursor-zoom-in transition-transform duration-300 transform hover:scale-110"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="hidden md:flex items-center lg:gap-5">
        <CustomVerticalCarousel
          defaultSlidesPerView={3}
          Component={({ url }) => {
            return <ProductImageSlide imageUrl={url} />;
          }}
          data={images}
          carouselId="product-detail-vertical"
        />

        <div className="relative">
          <ProductLightBox className="absolute right-0 top-0" images={images} />
          <Image
            className="md:block hidden rounded-xl w-[495px] h-[495px] md:w-[530px] md:h-[530px] overflow-hidden"
            src={currentImage}
            alt="image"
            width={450}
            height={400}
          />
        </div>
      </div>

      <div className="md:hidden w-full max-w-[500px] overflow-hidden max-h-[500px] mx-auto">
        <SimpleCarousel
          Component={ProductImageSlide}
          data={images?.map((a) => {
            return { imageUrl: a.url };
          })}
          pagination={true}
          carouselId="product-detail-horizontal"
          arrows={{
            left: '',
            right: '',
          }}
        />
      </div>
    </div>
  );
};

export default ProductImagesView;
