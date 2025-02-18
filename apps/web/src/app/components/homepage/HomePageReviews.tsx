import React from 'react';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import HomePageReviewsCarousel from './HomePageReviewsCarousel';
import DiveInHomePageButton from './DiveInHomePageButton';

const HomePageReviews = () => {
  return (
    <div className="relative bg-primary-color rounded-3xl md:rounded-[2.5rem] mt-32 md:mt-72 lg:py-14 py-10 md:mx-auto max-w-[1440px]">
      <Image
        src={ICONS.boyCharacter}
        className="hidden md:block absolute -top-[250px]  right-2 p-4"
        width={400}
        height={300}
        alt="Character"
      />
      <Image
        src={ICONS.hatCharacter}
        className="absolute md:-top-36 -top-[7.5rem] md:w-auto w-[120px]  md:left-14 left-8 p-4 md:z-auto z-[-1]"
        width={150}
        height={150}
        alt="Character"
      />
      <Image
        className="absolute -top-40 md:w-[250px] left-28 md:left-60 -z-10 p-10 md:p-0 md:-top-52"
        src={ICONS.girlCharacter}
        width={250}
        height={100}
        alt="Character"
      />

      <div className="md:px-10 px-2">
        <h1 className="text-white md:mb-10 mb-6 font-cheri lg:text-5xl xs:text-3xl px-2 text-[25px] text-center capitalize">
          why parents and little learners love{' '}
          <span className="text-nowrap">Wollybee ?</span>
        </h1>
        <HomePageReviewsCarousel />
        <DiveInHomePageButton />
      </div>
    </div>
  );
};

export default HomePageReviews;
