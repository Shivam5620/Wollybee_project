import Image from 'next/image';
import React from 'react';
import { ICONS } from '@repo/ui/lib';

const SingleBlogPage = ({ params }: { params: any }) => {
  return (
    <>
      <div className="mx-auto max-w-[1280px] sm:p-0 px-[8%] text-justify">
        <div className="flex sm:flex-row flex-col gap-4 bg-[#bdbdbd] justify-center mb-14">
          <div className="sm:w-[40%] w-full">
            <Image
              alt="blog image"
              src={ICONS.blogPageDemoImage}
              width={300}
              height={300}
              className="w-full"
            />
          </div>
          <div className="font-heyComic sm:w-[60%] w-full  text-center flex flex-col items-center gap-4">
            <h1 className="md:text-6xl text-5xl md:mt-20 mt-4">
              Blog {params.blogid}
            </h1>
            <p className="sm:text-2xl sm:font-heyComic font-helvetica text:lg text-left sm:w-[60%] w-[80%] mx-auto min-w-[250px]">
              Share stories, traditions, and celebrations from your culture with
              your child. Attend cultural events together and encourage
              participation in cultural activities.
            </p>
            <div className="flex gap-4 mb-8">
              <Image
                src={ICONS.instagramIcon}
                width={50}
                height={50}
                alt="instagram"
                className="w-[30px] h-[30px]"
              />
              <Image
                src={ICONS.instagramIcon}
                width={50}
                height={50}
                alt="instagram"
                className="w-[30px] h-[30px]"
              />
              <Image
                src={ICONS.instagramIcon}
                width={50}
                height={50}
                alt="instagram"
                className="w-[30px] h-[30px]"
              />
              <Image
                src={ICONS.instagramIcon}
                width={50}
                height={50}
                alt="instagram"
                className="w-[30px] h-[30px]"
              />
              <Image
                src={ICONS.instagramIcon}
                width={50}
                height={50}
                alt="instagram"
                className="w-[30px] h-[30px]"
              />
              <Image
                src={ICONS.instagramIcon}
                width={50}
                height={50}
                alt="instagram"
                className="w-[30px] h-[30px]"
              />
            </div>
          </div>
        </div>
        <div className="font-helvetica">
          <p className="sm:text-2xl text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </p>
        </div>
        <div className="sm:w-[80%] w-full mx-auto bg-gray-100 rounded-xl flex sm:gap-4 gap-1 justify-center items-center sm:px-4 p-1 py-2 my-10">
          <p className="sm:text-2xl text-sm text-nowrap font-heyComic text-primary-black sm:text-center text-left">
            Join our WhatsApp Community !{' '}
          </p>
          <div className="flex sm:gap-4 gap-1">
            <Image
              src={ICONS.whatsappIcon}
              width={50}
              height={50}
              alt="whatsapp"
              className="w-[40px] h-[40px]"
            />
            <button className="bg-tertiary-green text-sm px-2 py-0 font-helveticaRoundedBold text-white text-nowrap rounded-full">
              Join now
            </button>
          </div>
        </div>
        <div className="font-helvetica sm:text-2xl text-lg sm:mb-32 mb-10">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPage;
