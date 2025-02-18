'use client';

import React, { useEffect } from 'react';
import { ICONS, keywords } from '@repo/ui/lib';
import { Metadata } from 'next';
import Image from 'next/image';
import OurStoryFeatureContainer from './OurStoryFeaturesContainer';
import { OurStoryHeroSection } from './OurStoryHeroSection';
import TheFounders from './TheFounders';
import { IFaqCategory } from '@repo/ui/types/faq';
import { useAppDispatch } from '../../lib/hooks';
import { setFaqCategories } from '@repo/ui/lib/features/faqSlice';

const metadata: Metadata = {
  title: 'A Journey of Educational Innovation',
  description:
    'Discover the story behind Wollybee and how we came to be a trusted provider of educational games.',
  twitter: {
    card: 'summary_large_image',
  },
  keywords: keywords,
};

const OurStoryPage = ({ categories }: { categories: IFaqCategory[] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFaqCategories(categories));
  }, [categories]);

  return (
    <div className="">
      <div className="w-full">
        <div className="stars-bg">
          <OurStoryHeroSection />
        </div>
      </div>
      <div className="xl:-translate-y-[140px] lg:-translate-y-[100px] md:-translate-y-[86px] sm:-translate-y-[250px] xs:-translate-y-[200px] -translate-y-[120px] [@media(min-width:1600px)]:-translate-y-[160px] [@media(min-width:2000px)]:-translate-y-[220px]">
        <div>
          <Image
            alt="Tonny"
            src={ICONS.waveUpper}
            width={100}
            height={100}
            className="w-full md:block hidden"
          />
          <Image
            alt="Tonny"
            src={ICONS.waveUpper}
            width={100}
            height={100}
            className="w-full md:hidden"
          />
        </div>
        <OurStoryFeatureContainer />
        <Image
          alt="Tonny"
          src={ICONS.waveLower}
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div className="xl:-mt-[10px] lg:-mt-[20px] md:-mt-0 xs:-mt-[180px] -mt-[80px]">
        <TheFounders />
      </div>
    </div>
  );
};

export default OurStoryPage;
