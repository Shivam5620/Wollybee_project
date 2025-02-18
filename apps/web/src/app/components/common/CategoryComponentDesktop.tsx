import React from 'react';
import Image from 'next/image';
import { MultipleItemsCarousel } from './CustomCarousel';
import { ICONS } from '@repo/ui/lib';

interface CategoryComponentDesktopProps<T> {
  color: string;
  image: string;
  text: string;
  CardComponent: React.ComponentType<T>;
  data: T[];
  carouselId: string;
  slidesPerView?: number;
}

function CategoryComponentDesktop<T>({
  carouselId,
  color,
  image,
  text,
  CardComponent,
  data,
  slidesPerView = 2,
}: CategoryComponentDesktopProps<T>) {
  return (
    <>
      <div className="flex md:flex-row flex-col lg:gap-4 gap-0 justify-center items-center w-full py-4">
        <div id={carouselId} className=" relative lg:h-auto h-[410px] ">
          <div className="absolute z-[10] top-1/2 left-1/2 -translate-x-[60%] -translate-y-[50%] flex flex-col lg:gap-6 gap-1 items-center">
            {image && (
              <Image
                alt="image"
                src={image}
                width={140}
                height={140}
                className="lg:w-[150px] lg:h-[160px] w-[100px] h-[110px] scale-150"
              />
            )}

            <p className="text-white font-heyComic text-4xl mt-8 text-center">
              {text}
            </p>
          </div>
          <svg
            width="314"
            height="487"
            viewBox="0 0 314 487"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: color }}
            className={` hidden md:block lg:h-auto h-[410px] lg:-mr-0 -mr-10`}
          >
            <rect width="254" height="487" rx="14" fill="" />
            <circle cx="235.5" cy="70.5" r="70.5" fill="" />
            <ellipse cx="224" cy="197.5" rx="74" ry="73.5" fill="" />
            <circle cx="224" cy="314" r="67" fill="" />
            <circle cx="242" cy="415" r="72" fill="" />
          </svg>
        </div>

        <div className="xl:w-[900px] lg:w-[700px] md:w-[600px]  w-full">
          <MultipleItemsCarousel
            componentLeftAlign={false}
            Component={CardComponent}
            data={data}
            arrows={{
              left: ICONS.carouselArrows.grayLeft,
              right: ICONS.carouselArrows.grayRight,
            }}
            carouselId={carouselId}
            defaultSlidesPerView={2}
            slidesPerView={slidesPerView}
            nonCarouselContinerClassName="justify-between xl:gap-0 gap-2 xl:px-6 px-0"
          />
        </div>
      </div>
    </>
  );
}

export default CategoryComponentDesktop;
