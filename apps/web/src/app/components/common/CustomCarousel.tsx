'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Image from 'next/image';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface ISimpleCarouselProps<T> {
  Component: React.FC<T> | React.ComponentType<T>;
  data: Array<T>;
  arrows?: {
    left: string;
    right: string;
  };
  pagination?: boolean;
  carouselId: string;
  defaultSlidesPerView?: number;
  slidesPerView?: number;
  className?: string;
  rightArrowClassName?: string;
  leftArrowClassName?: string;
  centerMode?: boolean;
  loop?: boolean;
  minComponentNeeded?: number;
  oneViewOnMobile?: boolean;
  componentWrap?: boolean;
  componentLeftAlign?: boolean;
  autoplay?: boolean;
  nonCarouselContinerClassName?: ClassNameValue;
}

export function SimpleCarousel<T>({
  Component,
  data,
  pagination = false,
  arrows,
  className,
  loop = false,
  leftArrowClassName = '',
  rightArrowClassName = '',
  carouselId = '',
}: ISimpleCarouselProps<T>) {
  return (
    <>
      <Swiper
        pagination={
          pagination && {
            clickable: true,
          }
        }
        modules={[Autoplay, Pagination]}
        loop={loop}
        autoplay={{
          delay: 5000,
        }}
        autoHeight={true}
        className="mySwiper"
      >
        {data &&
          Component &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <Component key={index} {...item} />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Arrows for Carousel */}

      {arrows && (
        <>
          <div
            className={`swiper-button-prev-custom-${carouselId} absolute left-0 top-[1%]`}
          >
            <Image
              alt="left"
              width={26}
              height={40}
              className={twMerge(className, leftArrowClassName)}
              src={arrows?.left ?? ''}
            />
          </div>
          <div
            className={`swiper-button-next-custom-${carouselId} absolute right-0 top-[1%]`}
          >
            <Image
              alt="left"
              width={26}
              height={40}
              className={twMerge(className, rightArrowClassName)}
              src={arrows?.right ?? ''}
            />
          </div>
        </>
      )}
    </>
  );
}

export function MultipleItemsCarousel<T>({
  Component,
  data = [],
  arrows,
  carouselId,
  defaultSlidesPerView = 2,
  slidesPerView = 3,
  className = '',
  rightArrowClassName = '',
  leftArrowClassName = '',
  centerMode = true,
  loop = true,
  minComponentNeeded = 2,
  oneViewOnMobile = false,
  componentWrap = false,
  componentLeftAlign = false,
  pagination = false,
  autoplay = false,
  nonCarouselContinerClassName = '',
}: ISimpleCarouselProps<T>) {
  return (
    <div className={`relative overflow ${componentLeftAlign ? '' : 'sm:px-8'}`}>
      {data.length <= minComponentNeeded ? (
        <div
          className={twMerge(
            `flex ${componentLeftAlign ? 'justify-start sm:pl-12' : 'px-2 gap-2'}  ${componentWrap && 'flex-wrap justify-center gap-3'}  overflow-x-scroll no-scrollbar`,
            nonCarouselContinerClassName,
          )}
        >
          {data.map((a, index) => (
            <Component key={index} {...a} />
          ))}
        </div>
      ) : (
        <div>
          <Swiper
            breakpoints={{
              1024: {
                slidesPerView: slidesPerView,
                spaceBetween: 20,
                centeredSlides: false,
                navigation: {
                  nextEl: `.swiper-button-next-custom-${carouselId}`,
                  prevEl: `.swiper-button-prev-custom-${carouselId}`,
                },
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
                centeredSlides: false,
                navigation: {
                  nextEl: `.swiper-button-next-custom-${carouselId}`,
                  prevEl: `.swiper-button-prev-custom-${carouselId}`,
                },
              },
            }}
            centeredSlides={oneViewOnMobile ? false : centerMode}
            pagination={
              pagination && {
                clickable: true,
              }
            }
            autoplay={
              autoplay && {
                delay: 5000,
              }
            }
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            slidesPerView={oneViewOnMobile ? 1 : defaultSlidesPerView}
            spaceBetween={10}
            loop={loop}
          >
            {data &&
              Component &&
              data.map((item, index) => (
                <SwiperSlide key={index} className={`${pagination && 'mb-10'}`}>
                  <Component key={`component-${index}`} {...item} />
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div
            className={`swiper-button-prev-custom-${carouselId} absolute top-1/2  transform -translate-y-1/2 cursor-pointer z-10 ${oneViewOnMobile ? 'block md:-left-2 left-1.5' : 'hidden sm:block left-2'} `}
          >
            <Image
              alt="left"
              width={26}
              height={40}
              className={twMerge(className, leftArrowClassName)}
              src={arrows?.left ?? ''}
            />
          </div>
          <div
            className={`swiper-button-next-custom-${carouselId} absolute top-1/2  transform -translate-y-1/2 cursor-pointer z-10 ${oneViewOnMobile ? 'block md:-right-2 right-1.5' : 'hidden sm:block right-2'}`}
          >
            <Image
              alt="left"
              width={26}
              height={40}
              className={twMerge(className, rightArrowClassName)}
              src={arrows?.right ?? ''}
            />
          </div>
        </div>
      )}
    </div>
  );
}
