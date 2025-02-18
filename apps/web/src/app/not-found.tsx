'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CustomError = () => {
  return (
    <div className="w-full flex flex-col items-center py-20 gap-6 px-[5%]">
      <div className="">
        <Image
          width={100}
          height={100}
          alt="Error404"
          src={'/backgrounds/error404.svg'}
          className="w-[250px] xs:w-[600px] text-black"
        />
      </div>
      <div className="text-primary-black text-center flex flex-col items-center  md:gap-2">
        <h1 className="text-2xl xs:text-4xl md:text-5xl lg:text-6xl font-heyComic ">
          PAGE NOT FOUND
        </h1>
        <p className="text-primary-gray text-xs xs:text-base md:text-lg  font-helveticaRoundedBold ">
          Oops! The page you're looking for doesn't exist.
          <br />
          Please check the URL or go back home.
        </p>
        <Link
          href={'/'}
          className="inline-block font-heyComic mt-4 bg-secondary-color md:px-14 px-8 md:py-2 py-1 text-white  text-base xs:text-lg md:text-xl rounded-full"
        >
          {' '}
          Go Back{' '}
        </Link>
      </div>
    </div>
  );
};

export default CustomError;
