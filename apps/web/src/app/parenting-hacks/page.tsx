'use client';
import React from 'react';
import Heading from '../components/common/Heading';
import CategoryComponentDesktop from '../components/common/CategoryComponentDesktop';
import Image from 'next/image';
import CategoryComponentMobile from '../components/common/CategoryComponentMobile';

const parentingHacksData = [
  {
    title: 'Competition',
    description1:
      'Hey friends we have youtube channel for kids which help them learn Morals.(Tonny the monny) if you didnt watch it yet go watch it. and tell us in 1st Episode who do you like the most. write the name of the character and his/her specialisation.',
    description2: 'Reward - winner can access our app free for a month',
    buttonText: 'Enter Now',
  },
  {
    title: 'Competition',
    description1:
      'Hey friends we have youtube channel for kids which help them learn Morals.(Tonny the monny) if you didnt watch it yet go watch it. and tell us in 1st Episode who do you like the most. write the name of the character and his/her specialisation.',
    description2: 'Reward - winner can access our app free for a month',
    buttonText: 'Enter Now',
  },
  {
    title: 'Competition',
    description1:
      'Hey friends we have youtube channel for kids which help them learn Morals.(Tonny the monny) if you didnt watch it yet go watch it. and tell us in 1st Episode who do you like the most. write the name of the character and his/her specialisation.',
    description2: 'Reward - winner can access our app free for a month',
    buttonText: 'Enter Now',
  },
];

const parentalTipsData = [
  {
    title: 'Transform Your Space with Peter Lik: The Ultimate Guide.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

    buttonText: 'Read More',

    image: '/blogpage/blogdemo.svg',
  },
  {
    title: 'Transform Your Space with Peter Lik: The Ultimate Guide.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

    buttonText: 'Read More',

    image: '/blogpage/blogdemo.svg',
  },
  {
    title: 'Transform Your Space with Peter Lik: The Ultimate Guide.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',

    buttonText: 'Read More',

    image: '/blogpage/blogdemo.svg',
  },
];

const ParentalTipsComponent = ({
  title,
  description,
  image,
  buttonText,
}: {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}) => {
  return (
    <div className="bg-[#f2f2f2] rounded-xl py-8 sm:px-10 px-6 xl:mx-10 lg:mx-8 md:mx-4 mx-2 text-primary-black flex md:flex-row flex-col gap-8 justify-between">
      <div className="md:w-[55%] w-full">
        <Image
          alt="parental tips"
          src={'/blogpage/blogdemo.svg'}
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div className="md:w-[45%] w-full">
        <h1 className="font-helveticaRoundedBold md:text-2xl text-xl mb-6">
          {title}
        </h1>
        <p className="font-helvetica md:text-xl text-lg mb-4">{description}</p>
        <div className="w-full flex justify-end mt-4">
          <button className="font-helveticaRoundedBold sm:text-xl text-lg md:p-4 py-2 px-4 bg-primary-color text-white rounded-full">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ParentingHacksComponent = ({
  title,
  description1,
  description2,
  buttonText,
}: {
  title: string;
  description1: string;
  description2: string;
  buttonText: string;
}) => {
  return (
    <div className="bg-[#f2f2f2] rounded-xl py-8 sm:px-10 px-6 xl:mx-10 lg:mx-8 md:mx-4 mx-2 text-primary-black">
      <h1 className="font-heyComic  md:text-5xl sm:text-4xl text-3xl sm:mb-8 mb-4">
        {title}
      </h1>
      <h2 className="font-helveticaRoundedBold md:text-2xl sm:text-xl text-lg sm:mb-8 mb-4">
        {description1}
      </h2>
      <p className="font-helveticaRoundedBold md:text-2xl sm:text-xl text-lg">
        {description2}
      </p>
      <div className="w-full flex justify-end mt-4">
        <button className="font-helveticaRoundedBold md:text-2xl sm:text-xl text-lg md:p-4 py-2 px-4 bg-primary-color text-white rounded-full">
          {buttonText}
        </button>
      </div>
    </div>
  );
};


const parentingOptions = [
  {
    label: 'Play With Wollybee',
    bgColor: 'fill-tertiary-green',
    color: 'white',
    component: ParentingHacksComponent,
    data: parentingHacksData,
  },
  {
    label: 'Tonny the Monny Quiz',
    bgColor: 'fill-primary-color',
    color: 'white',
    component: ParentingHacksComponent,
    data: parentingHacksData,
  },
  {
    label: 'Parental Tips',
    bgColor: 'fill-tertiary-red',
    color: 'white',
    component: ParentalTipsComponent,
    data: parentalTipsData,
  },
];

const ParentingHacks = () => {
  return (
    <div>
      <div className="md:mb-20 mb-10">
        <Heading color="text-tertiary-red" text="Parenting Hacks" />
      </div>
      <div className="sm:block hidden">
        {parentingOptions.map((item, index) => (
          <div className="lg:mb-24 md:mb-20 mb-10">
            {/* <CategoryComponentDesktop
              key={index}
              CardComponent={item.component}
              data={item.data}
              text={item.label}
              color={item.bgColor}
              carouselId={`parenting-hacks-carousel-${item.label}`}
              slidesPerView={1}
            /> */}
          </div>
        ))}
      </div>
      <div className="sm:hidden">
        {parentingOptions.map((item, index) => (
          <div className="lg:mb-24 md:mb-20 mb-10">
            {/* <CategoryComponentMobile
              key={index}
              defaultSlidesPerView={1}
              CardComponent={item.component}
              data={item.data}
              text={item.label}
              color={item.bgColor}
              carouselId={`parenting-hacks-carousel-${item.label}`}
              slidesPerView={1}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentingHacks;
