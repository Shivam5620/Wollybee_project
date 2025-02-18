'use client';
import React from 'react';
import CareerHeroSection from './careerHeroSection';
import Image from 'next/image';
import { MultipleItemsCarousel } from '../components/common/CustomCarousel';
import MultipleImageCard from '../components/common/MultipleImageCard';
import { ICONS } from '@repo/ui/lib';

export const dynamic = 'force-static';

const CareerCarouselItem = ({
  icon,
  title,
  description,
  color,
}: {
  index: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="mx-1 md:mx-3">
      <div className="flex flex-col items-left bg-white xl:py-10 xl:px-8 lg:py-8 lg:px-8 md:p-10 py-5 px-5 rounded-3xl">
        <Image
          src={icon}
          alt={title}
          width={100}
          height={100}
          className="lg:h-16 md:h-24 sm:h-20 h-14 mb-2"
        />
        <h3
          className={`lg:text-2xl md:text-xl xs:text-lg text-[15px] font-heyComic text-${color} mt-5 sm:mb-2`}
        >
          {title}
        </h3>
        <p className="xl:text-lg lg:text-base xs:text-base text-[12px] font-helveticaRoundedBold text-venetian-red xl:mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

const careerCarouselItems = [
  {
    icon: './careerspage/script-writer.svg',
    title: 'Script Writer',
    description: 'Become a storytelling wizard with Wollybee.',
    color: 'tertiary-red',
  },
  {
    icon: './careerspage/illustrator.svg',
    title: 'Illustrator',
    description: 'Draw your dreams into reality! 🎨✨',
    color: 'tertiary-green',
  },
  {
    icon: './careerspage/animator.svg',
    title: 'Animator',
    description: "Let's animate the world together! 🌍🎬",
    color: 'secondary-color',
  },
  {
    icon: './careerspage/educationist.svg',
    title: 'Educationist',
    description: 'Teach, laugh, inspire! Shape young minds🌈',
    color: 'primary-color',
  },
  {
    icon: './careerspage/storyBoard.svg',
    title: 'Storyborad Artist',
    description: 'Bring your imagination to life! 🌟',
    color: 'tertiary-green',
  },
  {
    icon: './careerspage/soundDesigner.svg',
    title: 'Music Composer',
    description: '🎹 Compose magic for the little ones! 🎵🎶',
    color: 'tertiary-red',
  },
  {
    icon: './careerspage/videoEditor.svg',
    title: 'Video Editor',
    description: 'Cut, paste, create! 🎥 Be the Editing Wizard!',
    color: 'secondary-color',
  },
  {
    icon: './careerspage/gameDesigner.svg',
    title: 'Game Designer',
    description: 'Game On! 🎉 Design games that inspire. 🧠',
    color: 'tertiary-red',
  },
  {
    icon: './careerspage/webDeveloper.svg',
    title: 'Web Developer',
    description: 'Build magical digital experiences with Your Web Wizardry!',
    color: 'tertiary-green',
  },
  {
    icon: './careerspage/marketingManager.svg',
    title: 'Marketing Manager',
    description: 'Be the marketing brain behind Wollybee! 🧠',
    color: 'primary-color',
  },
  {
    icon: './careerspage/toyDesigner.svg',
    title: 'Toy Designer',
    description: 'Design the future of play. 🌟',
    color: 'tertiary-red',
  },
  {
    icon: './careerspage/graphicDesigner.svg',
    title: 'Graphic Desinger',
    description: 'Draw up some fun! 🎨🖌️',
    color: 'secondary-color',
  },
];

const CareerPage = () => {
  return (
    <div>
      <CareerHeroSection />
      <MultipleImageCard
        showBgColor={false}
        label="experience the magic"
        data={[
          {
            text: 'Supportive Culture',
            color: 'tertiary-red',
            image: ICONS.careersPage.cultureImage,
          },
          {
            text: 'Rewarding Work Life balance',
            color: 'tertiary-green',
            image: ICONS.careersPage.workLifeBalance,
          },
          {
            text: 'Endless Opportunities for Growth',
            color: 'secondary-color',
            image: ICONS.careersPage.growthImage,
          },
        ]}
      />

      <div className="bg-secondary-color max-w-[1280px] xl:mx-auto md:mx-[5%] md:rounded-3xl py-10 lg:py-16 md:mt-32 mt-12 md:px-8">
        <h1 className="font-cheri xl:text-6xl lg:text-5xl md:text-5xl text-4xl text-center mb-8 text-white">
          opportunities
        </h1>
        <MultipleItemsCarousel
          Component={CareerCarouselItem}
          data={careerCarouselItems.map((a, index) => {
            return {
              index,
              ...a,
            };
          })}
          arrows={{
            left: ICONS.carouselArrows.whiteLeft,
            right: ICONS.carouselArrows.whiteRight,
          }}
          carouselId="careers-opportunity-carousel"
          rightArrowClassName="md:translate-x-4 translate-x-1 md:w-auto w-5"
          leftArrowClassName="md:-translate-x-4 -translate-x-1 md:w-auto w-5"
        />
      </div>
      <div className="md:mt-20 mt-14 mb-40">
        <p className="text-center md:mb-8 md:text-5xl text-[28px] font-heyComic text-primary-black">
          Apply Now at
        </p>
        <a
          className=" block text-center md:text-5xl xs:text-3xl text-[28px] font-heyComic text-primary-color cursor-pointer"
          href="mailto:careers@wollybee.com"
        >
          careers@wollybee.com
        </a>
      </div>
    </div>
  );
};

export default CareerPage;
