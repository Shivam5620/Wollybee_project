'use client'
import Image from 'next/image';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import { ICONS } from '@repo/ui/lib';

const ParentalZoneCarouselComponent = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="flex">
      <Image
        src={imageUrl}
        width={200}
        height={200}
        alt="ParentalCards"
        className="rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-150"
      />
    </div>
  );
};

const ParentalZoneCarousel = () => {
  return (
    <MultipleItemsCarousel
      data={[]}
      arrows={{
        left: ICONS.carouselArrows.grayLeft,
        right: ICONS.carouselArrows.grayRight,
      }}
      Component={ParentalZoneCarouselComponent}
      carouselId="parental-zone-carousel"
      className='p-2'
    />
  );
};

export default ParentalZoneCarousel;
