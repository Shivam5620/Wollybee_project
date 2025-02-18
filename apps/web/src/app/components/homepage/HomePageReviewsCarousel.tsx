import { ICONS } from '@repo/ui/lib';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import ReviewCard from './ReviewCard';

export const reviewData = [
  {
    name: 'Aaysha Sayed',
    url: ICONS.reviews.reviewer1,
    rating: 5,
    review:
      'I brought solar system and world fruit map chart for my 6yr old kid he is enjoying the learning and the quality of chart is Good',
  },
  {
    name: 'Dev Kumar Vasudevan',
    url: ICONS.reviews.reviewer2,
    rating: 3,
    review:
      'They made learning for kids easy. I highly recommended wollybee learning with fun',
  },
  {
    name: 'Tasneem Azad',
    url: ICONS.reviews.reviewer3,
    rating: 4,
    review:
      'Fun, Education and learning for kids I loved It. my first purchase was ABCD Chart for my kid. Highly Recommended',
  },
  {
    name: 'Murtaza',
    url: ICONS.reviews.reviewer1,
    rating: 5,
    review:
      'I loved the service and packaging, my first purchase was Pizza party for my kid. Highly Recommended',
  },
];

const HomePageReviewsCarousel = () => {
  return (
    <div className="md:mb-10 mb-6 mx-auto">
      <MultipleItemsCarousel
        className="sm:w-auto sm:h-auto w-5 h-5"
        oneViewOnMobile={true}
        Component={ReviewCard}
        data={reviewData}
        arrows={{
          left: ICONS.carouselArrows.whiteLeft,
          right: ICONS.carouselArrows.whiteRight,
        }}
        carouselId="homepage-reviews-carousel"
        rightArrowClassName="md:translate-x-3"
        leftArrowClassName="md:-translate-x-3"
      />
    </div>
  );
};

export default HomePageReviewsCarousel;
