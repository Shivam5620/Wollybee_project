'use client';

import { ICONS } from '@repo/ui/lib';
import { MultipleItemsCarousel } from '../components/common/CustomCarousel';
import { reviewData } from '../components/homepage/HomePageReviewsCarousel';
import ReviewCard from '../components/homepage/ReviewCard';

const ReviewCarouselContainer = () => {
  return (
    <div className=" md:w-[70%] w-[80%]">
      <MultipleItemsCarousel
        Component={ReviewCard}
        data={reviewData}
        arrows={{
          left: ICONS.carouselArrows.whiteLeft,
          right: ICONS.carouselArrows.whiteRight,
        }}
        carouselId="why-us-review-carousel"
        defaultSlidesPerView={2}
        slidesPerView={2}
        oneViewOnMobile={true}
        className="md:w-[26px] w-[15px]"
      />
    </div>
  );
};

export default ReviewCarouselContainer;
