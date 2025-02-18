'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { ClassNameValue } from 'tailwind-merge';
import { Navigation } from 'swiper/modules';

interface ICustomVerticalCarousel<T> {
  Component: React.FC<T>;
  data: Array<T>;
  carouselId: string;
  defaultSlidesPerView?: number;
  slidesPerView?: number;
  className?: ClassNameValue;
}

export function CustomVerticalCarousel<T>({
  Component,
  data,
  carouselId = 'vertical-carousel',
  defaultSlidesPerView = 2,
  slidesPerView = 3,
  className = '',
}: ICustomVerticalCarousel<T>) {
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <div
        className={`swiper-button-prev-custom-${carouselId} swiper-button-prev-custom top-0 transform -translate-y-1/2 cursor-pointer z-10 hidden sm:block`}
      >
        <Image
          alt="Previous"
          width={26}
          height={40}
          className="-rotate-90 p-2 mt-3"
          src={ICONS.carouselArrows.grayRight}
        />
      </div>
      <Swiper
        loop={true}
        navigation={{
          nextEl: `.swiper-button-next-custom-${carouselId}`,
          prevEl: `.swiper-button-prev-custom-${carouselId}`,
        }}
        spaceBetween={10}
        modules={[Navigation]}
        direction={'vertical'}
        slidesPerView={slidesPerView}
        className="mySwiper h-[500px]"
      >
        {data &&
          Component &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <Component key={`component-${index}`} {...item} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div
        className={`swiper-button-next-custom-${carouselId} swiper-button-next-custom bottom-0 transform translate-y-1/2 cursor-pointer z-10 hidden sm:block`}
      >
        <Image
          alt="Next"
          width={26}
          height={40}
          className="rotate-90 p-2"
          src={ICONS.carouselArrows.grayRight}
        />
      </div>
    </div>
  );
}
