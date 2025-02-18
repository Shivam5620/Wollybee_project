'use client';
import Image from 'next/image';
import React from 'react';
import RatingStars from '../common/RatingStars';
import { Size } from '@repo/ui/enums/size';

const ReviewCard = ({
  url,
  review,
  rating,
  name,
}: {
  url: string;
  review: string;
  rating: number;
  name: string;
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="md:rounded-3xl xs:rounded-xl rounded-lg md:w-full w-[75%] mx-8 shadow-md h-auto bg-white flex flex-col xs:gap-2 md:py-10 xs:py-10 py-6 xs:px-6 px-6 md:mx-auto items-center text-center font-heyComic text-primary-black">
        <Image
          src={url}
          alt="product"
          className="rounded-none aspect-video object-cover xs:w-[300px] w-[250px]"
          width={300}
          height={150}
        />
        <RatingStars
          rating={rating}
          hexColor="#FFC648"
          disabled={true}
          variant={Size.small}
        />
        <p className="md:text-sm text-[8px] max-w-72 px-2 font-helveticaRoundedBold text-media-button-gray">
          {review.length > 45 ? `${review.slice(0, 100)}...` : review}
        </p>
        <h1 className="md:text-lg xs:text-base text-xs md:mt-1 xs:mt-0 mt-0.5">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default ReviewCard;
