'use client';
import { IProductAge } from '@repo/ui/types';
import React from 'react';
import ImageContainer from '../components/common/ImageContainer';
import { navBarRoutesClient } from '@repo/ui/lib';
import Link from 'next/link';
import { ClassNameValue } from 'tailwind-merge';

const CustomImageContainer = ({
  color,
  image,
  text,
  classNameText = '',
}: {
  color: string;
  image: string;
  text: string;
  classNameText?: ClassNameValue;
}) => {
  return (
    <Link href={`${navBarRoutesClient.shopByAge}/#${text}`}>
      <ImageContainer
        color={color}
        image={image}
        useHexColor={true}
        text={text}
        classNameText={classNameText}
      />
    </Link>
  );
};

const ShopByAgeCarouselContainer = ({
  agesData,
}: {
  agesData: IProductAge[];
}) => {
  return (
    <div className="py-4 justify-center flex">
      <div className="items-center md:px-12">
        <h1 className="px-1 text-primary-color my-5 sm:my-10 font-cheri xl:text-7xl lg:text-6xl xs:text-5xl text-[33px] text-center mx-auto">
          Shop By Age
        </h1>

        {/* This will not be excedding 4 cards so no carousel needed. */}
        <div className="flex flex-wrap gap-2 justify-center mx-auto">
          {agesData.map((a) => (
            <div className="mx-auto justify-center sm:px-16 py-2">
              <CustomImageContainer
                key={a.id}
                image={a.file.url}
                color={a.color}
                classNameText={'xl:text-3xl'}
                text={a.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByAgeCarouselContainer;
