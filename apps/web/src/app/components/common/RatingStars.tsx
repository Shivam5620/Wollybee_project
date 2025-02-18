'use client';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Size } from '@repo/ui/enums/size';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export interface RatingStarsProps {
  rating?: number;
  hexColor: string;
  variant?: Size;
  disabled?: boolean; // New disabled flag
  onChangeRating?: (rating: number) => void; // Optional callback when rating changes
  starClassName?: ClassNameValue;
}
export interface Stars {
  color: string;
  size: Size;
  starClassName?: ClassNameValue;
}

export const Star: React.FC<Stars> = ({ color, size, starClassName = '' }) => {
  const variants = {
    large: `md:w-[35px] w-[25px]`,
    medium: `md:w-[28px] w-[20px] px-[1px]`,
    small: `md:w-[18px] xs:w-[15px] w-[13px] px-[1px]`,
  };
  return (
    <svg
      viewBox="0 0 30 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(
        `inline ${variants[`${size}`]} xs:mx-[2px]`,
        starClassName,
      )}
    >
      <path
        d="M17.7321 1.4195L20.1853 6.29887C20.3715 6.66508 20.6451 6.98167 20.983 7.2217C21.3208 7.46172 21.7129 7.61808 22.1256 7.67737L27.6122 8.46504C28.1044 8.51863 28.5702 8.7109 28.9535 9.01861C29.3368 9.32632 29.6209 9.73628 29.7719 10.1991C29.9228 10.6618 29.934 11.1576 29.804 11.6264C29.674 12.0953 29.4084 12.5172 29.0393 12.8412L25.0697 16.6484C24.7797 16.9303 24.5619 17.2755 24.434 17.6558C24.3061 18.0361 24.2715 18.4407 24.3335 18.8365L25.2703 24.1973C25.3467 24.6598 25.2911 25.134 25.1097 25.5674C24.9283 26.0008 24.6282 26.3765 24.2426 26.6529C23.857 26.9293 23.4009 27.0955 22.9249 27.1333C22.4489 27.171 21.9716 27.0789 21.5457 26.8668L16.6393 24.3286C16.2685 24.1351 15.8549 24.034 15.4349 24.034C15.0149 24.034 14.6015 24.1351 14.2307 24.3286L9.32405 26.8668C8.89896 27.0877 8.41918 27.1867 7.93941 27.1528C7.45964 27.1188 6.99926 26.9533 6.61085 26.6749C6.22244 26.3966 5.92175 26.0166 5.74293 25.5785C5.56411 25.1404 5.51452 24.6618 5.59973 24.1973L6.53625 18.8365C6.59914 18.4388 6.56293 18.0321 6.43089 17.6511C6.29885 17.2701 6.07497 16.9261 5.77805 16.6484L1.80816 12.8412C1.44833 12.5131 1.19129 12.0913 1.06683 11.6251C0.942378 11.1589 0.955775 10.6674 1.10549 10.2084C1.25521 9.74937 1.53494 9.34163 1.91216 9.0329C2.28938 8.72417 2.74841 8.52724 3.23554 8.46504L8.72184 7.67737C9.13581 7.62171 9.52957 7.4668 9.868 7.22637C10.2064 6.98593 10.4791 6.66737 10.6621 6.29887L13.1156 1.4195C13.3256 0.994067 13.6534 0.635269 14.0617 0.384222C14.4699 0.133176 14.9419 0 15.4237 0C15.9055 0 16.3778 0.133176 16.786 0.384222C17.1943 0.635269 17.5221 0.994067 17.7321 1.4195Z"
        fill={color}
      />
    </svg>
  );
};

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  hexColor,
  variant = Size.small,
  disabled = false,
  onChangeRating,
  starClassName = '',
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setHoverRating(rate);
  };

  return (
    <Rating
      onClick={onChangeRating}
      SVGstyle={{
        display: 'inline',
      }}
      initialValue={rating ? rating : hoverRating}
      readonly={disabled}
      fillIcon={
        <Star color={hexColor} size={variant} starClassName={starClassName} />
      }
      emptyIcon={
        <Star color={'#d3d3d3'} size={variant} starClassName={starClassName} />
      }
    />
  );
};

export default RatingStars;
