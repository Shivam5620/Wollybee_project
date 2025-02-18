import { Size } from '@repo/ui/enums/size';
import { Slider } from '../../../ui/components/ui/slider';
import RatingStars, { Star } from '../common/RatingStars';

const ProductReviewAnalytics = ({
  data,
}: {
  data: {
    averageRating: number;
    reviewsCount: number;
    result: { count: number; rating: number }[];
  };
}) => {
  const reversedResult = [...data.result].reverse();
  return (
    <div className="m-5 font-helveticaRoundedBold">
      <div className="flex">
        <h1 className="font-bold md:text-5xl text-[40px] text-primary-black">
          {data.averageRating.toFixed(1)}
        </h1>
        <section className="p-2">
          <RatingStars
            rating={data.averageRating}
            hexColor="#FFC648"
            disabled={true}
            variant={Size.large}
          />
          <p className="text-primary-gray font-helveticaRoundedBold text-sm md:text-base">
            {data.reviewsCount} reviews
          </p>
        </section>
      </div>
      {reversedResult.map((a, index) => (
        <div key={index} className="flex items-center gap-1">
          <p className="w-2 font-bold text-primary-black">{5- index}</p>

          <Star color="#FFC648" size={Size.small} />

          <div className="lg:w-72 sm:w-48 w-60 items-center">
            <Slider
              disabled
              value={[a.rating]}
              max={5}
              step={1}
              className="h-7"
            />
          </div>
          <p className="font-bold text-primary-gray">{a.count}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewAnalytics;
