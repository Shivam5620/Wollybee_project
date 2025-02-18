import React from 'react';
import Image from 'next/image';
import { MultipleItemsCarousel } from './CustomCarousel';
import { ICONS } from '@repo/ui/lib';

interface CategoryComponentMobileProps<T> {
  color: string;
  image?: string;
  text: string;
  CardComponent: React.ComponentType<T>;
  data: Array<T>;
  carouselId: string;
  slidesPerView?: number;
  defaultSlidesPerView?: number;
}

function CategoryComponentMobile<T>({
  color,
  image,
  text,
  CardComponent,
  data,
  carouselId,
  slidesPerView = 2,
  defaultSlidesPerView = 2,
}: CategoryComponentMobileProps<T>) {
  return (
    <div className="flex flex-col justify-center w-full overflow-hidden mb-9 xs:mb-16 sm:mb-24">
      <div id={carouselId} className="w-full relative ">
        <div className="mt-4 absolute items-center z-[10] sm:top-[55%] xs:top-[50%] top-[48%] -translate-y-[50%] w-full justify-center flex">
          {image && (
            <Image
              alt="image"
              src={image}
              width={100}
              height={100}
              className="xs:w-[120px] sm:w-[170px]"
            />
          )}

          <p className="text-white font-heyComic text-3xl text-nowrap w-min">
            {text}
          </p>
        </div>

        {/* Mobile svg */}

        <svg
          className="flex mx-auto justify-center xs:px-[10%] px-[5%]"
          viewBox="0 0 329 142"
          style={{
            fill: color,
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M328 34V135.217C328 138.969 322.587 142 315.906 142H12.0939C5.41272 142 0 138.999 0 135.217V34C107.117 35.2705 168.44 35.2705 328 34Z"
            fill=""
          />
          <path
            d="M29.53 63.06C45.839 63.06 59.06 49.839 59.06 33.53C59.06 17.221 45.839 4 29.53 4C13.221 4 0 17.221 0 33.53C0 49.839 13.221 63.06 29.53 63.06Z"
            fill=""
          />
          <path
            d="M84.5 72C101.897 72 116 57.897 116 40.5C116 23.103 101.897 9 84.5 9C67.103 9 53 23.103 53 40.5C53 57.897 67.103 72 84.5 72Z"
            fill=""
          />
          <path
            d="M147 78C168.539 78 186 60.5391 186 39C186 17.4609 168.539 0 147 0C125.461 0 108 17.4609 108 39C108 60.5391 125.461 78 147 78Z"
            fill=""
          />
          <path
            d="M204.79 57.58C217.377 57.58 227.58 47.3766 227.58 34.79C227.58 22.2034 217.377 12 204.79 12C192.203 12 182 22.2034 182 34.79C182 47.3766 192.203 57.58 204.79 57.58Z"
            fill=""
          />
          <path
            d="M249.97 57.94C263.761 57.94 274.94 46.7606 274.94 32.97C274.94 19.1795 263.761 8 249.97 8C236.179 8 225 19.1795 225 32.97C225 46.7606 236.179 57.94 249.97 57.94Z"
            fill=""
          />
          <path
            d="M300.53 60.06C315.734 60.06 328.06 47.7344 328.06 32.53C328.06 17.3256 315.734 5 300.53 5C285.326 5 273 17.3256 273 32.53C273 47.7344 285.326 60.06 300.53 60.06Z"
            fill=""
          />
        </svg>
      </div>

      <div className="md:w-[800px] w-full mt-3 sm:mt-6">
        {data.length <= 2 ? (
          <div className="flex gap-2 justify-center">
            {data.map((item, index) => (
              <CardComponent key={index} {...item} />
            ))}
          </div>
        ) : (
          <MultipleItemsCarousel
            Component={CardComponent}
            centerMode={true}
            loop={false}
            data={data}
            arrows={{
              left: ICONS.carouselArrows.grayLeft,
              right: ICONS.carouselArrows.grayRight,
            }}
            carouselId={carouselId}
            defaultSlidesPerView={defaultSlidesPerView}
            slidesPerView={slidesPerView}
          />
        )}
      </div>
    </div>
  );
}

export default CategoryComponentMobile;
