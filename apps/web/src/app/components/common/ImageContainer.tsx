import { HexColor } from 'aws-sdk/clients/quicksight';
import Image from 'next/image';
import React from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';

const ImageContainer = ({
  useHexColor = false,
  showBgColor = true,
  image,
  color,
  className = '',
  classNameText = '',
  text,
}: {
  useHexColor?: boolean;
  showBgColor?: boolean;
  image?: string;
  color: HexColor | string;
  className?: ClassNameValue;
  classNameText?: ClassNameValue;
  text?: string;
}) => {
  return (
    <div className="flex mx-auto flex-col md:gap-6 gap-3 items-center md:w-[100%] sm:w-[200px] w-[100%] overflow-hidden">
      <div
        style={{
          backgroundColor: useHexColor ? color : '',
        }}
        className={`${showBgColor ? `${useHexColor ? `bg-[${color}]` : `bg-${color}`}  w-[120px] h-[120px] xs:w-[200px] xs:h-[200px] sm:w-[200px] sm:h-[200px] md:w-[180px] md:h-[180px] lg:w-[230px] lg:h-[230px] xl:w-[260px] xl:h-[260px] ` : 'bg-transparent md:w-[320px] md:h-[320px] sm:w-[280px] sm:h-[280px] w-[160px] h-[160px] -mb-4'}  rounded-full `}
      >
        {image && (
          <Image
            src={image}
            height={100}
            width={100}
            alt="image"
            className={twMerge('w-full h-full p-4', className)}
          />
        )}
      </div>
      {text && (
        <p
          style={{
            color: useHexColor ? color : '',
          }}
          className={twMerge(
            `${useHexColor ? `text-[${color}]` : `text-white`} font-heyComic lg:text-2xl xs:text-xl text-lg text-wrap text-center leading-5`,
            classNameText,
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default ImageContainer;
