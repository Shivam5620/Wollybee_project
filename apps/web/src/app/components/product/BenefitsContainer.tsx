import { IProduct } from '@repo/ui/types';
import Image from 'next/image';
import React from 'react';
import AddToCartProductCardButton from './AddToCartProductCardButton';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import { ICONS } from '@repo/ui/lib';
import ImageContainer from '../common/ImageContainer';
import { useAppSelector } from '../../../lib/hooks';
import LoadingBar from '../common/LoadingBar';
import { IFile } from '@repo/ui/types/file';

const ProductBenefitsComponent = ({ image }: { image: string }) => {
  return (
    <div key={image} className="w-full flex sm:py-10 py-1 justify-center">
      <ImageContainer
        color="white"
        image={image}
        className="object-scale-down mx-auto"
      />
    </div>
  );
};

const ProductBenefitsModalComponent = ({
  url1,
  url2,
}: {
  url1: string;
  url2: string | null;
}) => {
  return (
    <div key={url1} className="w-full flex justify-center">
      <div className="flex flex-col gap-2">
        <Image
          src={url1}
          alt="url1"
          width={100}
          height={100}
          className="rounded-full"
        />

        {url2 && (
          <Image
            src={url2}
            alt="url2"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}

        {!url2 && (
          <span className="w-[100px] h-[100px] rounded-full bg-white"></span>
        )}
      </div>
    </div>
  );
};

function mergeFiles(
  arr: IFile[],
): Array<{ url1: string; url2: string | null }> {
  const result: Array<{ url1: string; url2: string | null }> = [];

  for (let i = 0; i < arr.length; i += 2) {
    const obj1 = arr[i];

    if (i + 1 < arr.length) {
      const obj2 = arr[i + 1];
      result.push({ url1: obj1.url, url2: obj2.url });
    } else {
      // For the last object if it's odd
      result.push({ url1: obj1.url, url2: null });
    }
  }

  return result;
}

const BenefitsContainer = ({
  onClose,
  product,
}: {
  onClose: () => void;
  product: IProduct;
}) => {
  const { loading } = useAppSelector((state) => state.cart);

  const mergedBenefits = mergeFiles(product.benefits);

  return (
    <div>
      {loading && <LoadingBar />}
      <div className="w-full flex justify-between my-2 px-2 items-center">
        <p></p>
        <h1 className="text-xl text-primary-black font-heyComic">
          {product.name}
        </h1>
        <Image
          alt="closeIcon"
          className="cursor-pointer"
          src={ICONS.closeIconModal}
          width={40}
          height={40}
          onClick={() => onClose()}
        />
      </div>

      <div className="flex flex-col justify-center text-center items-center px-3">
        <div className="flex gap-1 items-center">
          <div className="">
            <Image
              src={product.images.length > 0 ? product.images[0].url : ''}
              alt="productImage"
              width={300}
              height={300}
              className="ml-2 rounded-md"
            />
          </div>
          {mergedBenefits.length <= 2 ? (
            <div className="flex gap-2 mx-2">
              <ProductBenefitsModalComponent {...mergedBenefits[0]} />
              {mergedBenefits.length > 1 && (
                <ProductBenefitsModalComponent {...mergedBenefits[1]} />
              )}
            </div>
          ) : (
            <div className="max-w-[280px]">
              <MultipleItemsCarousel
                Component={(a) => <ProductBenefitsModalComponent {...a} />}
                slidesPerView={2}
                carouselId="benefit-carousel"
                data={mergedBenefits}
                arrows={{
                  left: ICONS.carouselArrows.grayLeft,
                  right: ICONS.carouselArrows.grayRight,
                }}
                className="p-2"
                defaultSlidesPerView={2}
                loop={true}
              />
            </div>
          )}
        </div>
        <div className="px-3 w-full py-5">
          <AddToCartProductCardButton benefitsbutton={true} product={product} />
        </div>
      </div>
    </div>
  );
};

export default BenefitsContainer;
