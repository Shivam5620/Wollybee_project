'use client';
import { IProductReview } from '@repo/ui/types';
import RatingStars from '../common/RatingStars';
import { Size } from '@repo/ui/enums/size';
import Image from 'next/image';

const ProductReviewCard = ({ review }: { review: IProductReview }) => {
  const date = new Date(review?.createdAt ?? Date.now());
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return (
    <>
      <div className="rounded-[14px] p-3 m-2 mt-4 border-2 border-secondary-color font-heyComic min-w-[300px] xs:min-w-[350px] lg:w-[600px] xl:w-[750px]">
        <div className="flex justify-between">
          <div>
            <p className="text-lg ">{review.user.name}</p>
            <p className="text-xs  text-tertiary-green mt-1">
              {formatter.format(date)}
            </p>
          </div>
          <div>
            <RatingStars
              rating={review.rating}
              hexColor="#FFC648"
              disabled={true}
              variant={Size.medium}
            />
            <p className="text-xs  text-venetian-red mt-3 ml-2">
              {review.rating} / 5 Ratings
            </p>
          </div>
        </div>
        <p className=" mt-3 text-primary-black">{review.message}</p>
        <div className="flex flex-wrap p-2">
          {review.media_urls.map((a) => (
            <Image
              src={a}
              className="rounded-md cursor-pointer mr-2"
              alt="reviewImage"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductReviewCard;
