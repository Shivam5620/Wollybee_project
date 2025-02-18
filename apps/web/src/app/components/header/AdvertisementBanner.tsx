'use client';
import { ICONS } from '@repo/ui/lib';
import { useAppSelector } from '../../../lib/hooks';
import {
  MultipleItemsCarousel,
  SimpleCarousel,
} from '../common/CustomCarousel';
import { useEffect, useState } from 'react';

interface IAdvertisementComponentProps {
  text: string;
}

export const AdvertisementComponent = ({
  text,
}: IAdvertisementComponentProps) => {
  const { advertisementBannerArrayItems } = useAppSelector(
    (state) => state.configuration,
  );
  const [advertisement, setAdvertisements] = useState<string[]>([
    'Discover Fun & Learning Toys for Your Little Ones!',
    "Brighten Your Child's Day with Our Special Deals!",
    'Join the Adventure: Explore Our New Arrivals for Kids!',
  ]);

  useEffect(() => {
    setAdvertisements(advertisementBannerArrayItems);
  }, [advertisementBannerArrayItems]);

  return (
    <div className="w-full py-2 md:text-sm text-xs bg-secondary-color text-center">
      {/* <MultipleItemsCarousel
        autoplay={true}
        defaultSlidesPerView={1}
        loop={true}
        slidesPerView={1}
        Component={({ text }) => (
          <p className="flex w-full cursor-pointer justify-center texxt-center font-helveticaRoundedBold text-white">
            {text}
          </p>
        )}
        data={advertisement.map((a) => {
          return { text: a };
        })}
        className="p-2"
        arrows={{
          left: ICONS.carouselArrows.whiteLeft,
          right: ICONS.carouselArrows.whiteRight,
        }}
        carouselId="customer-also-bought-carousel"
      /> */}
      <SimpleCarousel
        autoplay={true}
        defaultSlidesPerView={1}
        loop={true}
        slidesPerView={1}
        Component={({ text }) => (
          <p className="flex w-full cursor-pointer justify-center texxt-center font-helveticaRoundedBold text-white">
            {text}
          </p>
        )}
        data={advertisement.map((a) => {
          return { text: a };
        })}
        className="p-2"
        arrows={{
          left: ICONS.carouselArrows.whiteLeft,
          right: ICONS.carouselArrows.whiteRight,
        }}
        carouselId="customer-also-bought-carousel"
        leftArrowClassName="xs:block hidden"
        rightArrowClassName="xs:block hidden"
      />
    </div>
  );
};
