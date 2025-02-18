import { ICONS } from '@repo/ui/lib';
import Image from 'next/image';
import React from 'react';

const TheFounders = () => {
  return (
    <div className="w-full bg-white md:px-[10%] px-[7%] ">
      <div className="flex md:flex-row flex-col-reverse justify-center md:items-start items-center md:gap-0 gap-10">
        <div className="md:w-[60%] w-full md:text-left text-center ">
          <div>
            <h1 className="hidden md:block text-primary-color font-cheri md:text-6xl text-5xl text-center md:text-left mb-14">
              The Founders
            </h1>
            <h1 className=" font-heyComic text-2xl text-primary-black mb-4">
              ALI ASGAR ALI, FOUNDER
            </h1>
            <p className="md:text-lg text-base font-helveticaRoundedBold text-media-button-gray">
              Ali Asgar, a visionary entrepreneur with a heart for children, is
              the driving force behind Wollybee's mission to revolutionize early
              childhood education. His passion for design and innovation fuels
              the creation of magical learning experiences that captivate young
              minds and spark a lifelong love of learning. With his strategic
              leadership and creative vision, Ali Asgar is shaping the future of
              edutainment and inspiring a new generation of learners.
            </p>
          </div>
          <div className="mt-10">
            <h1 className=" font-heyComic text-2xl text-primary-black mb-4">
              BATUL ALI, CO-FOUNDER
            </h1>
            <p className="md:text-lg text-base font-helveticaRoundedBold text-media-button-gray">
              Batul, a visionary artist and entrepreneur, infuses every
              educational endeavor at Wollybee with her boundless creativity.
              Her heart, deeply intertwined with the well-being of children,
              drives her to craft visually captivating and intellectually
              stimulating designs that ignite young minds. Batul's passion for
              education is palpable in her work, as she meticulously constructs
              learning experiences that are not merely informative but also
              joyful and immersive.
            </p>
          </div>
        </div>
        <div className=" md:w-[70%] w-full">
          <h1 className="text-primary-color font-cheri text-[42px] text-center  mb-3 md:hidden">
            The Founders
          </h1>
          <div className=" flex justify-center relative h-full ">
            <Image
              alt="Founders image"
              src={ICONS.founderImage}
              width={500}
              height={500}
              className="w-[80%] md:block hidden transition-all"
            />
            <Image
              alt="Founders image"
              src={ICONS.founderImageMobile}
              width={1000}
              height={1000}
              className="w-[80%] md:hidden"
            />

            <div
              className={`z-[9] absolute  md:-top-10 md:right-24 md:left-auto left-10 bg-primary-color md:w-[50px] w-[20px] h-[20px] md:h-[50px] rounded-full transition-all `}
            ></div>
            <div
              className={`z-[9] absolute md:top-14 md:right-0 md:left-auto left-0 xs:top-[100px] top-[50px] bg-primary-color md:w-[40px] xs:w-[30px] w-[25px] h-[25px] xs:h-[30px] md:h-[40px] rounded-full transition-all`}
            ></div>
            <div
              className={`z-[9] absolute -bottom-8 right-32 bg-primary-color w-[50px] h-[50px] rounded-full md:block hidden transition-all`}
            ></div>
            <div
              className={`z-[9] absolute md:-bottom-16 md:top-auto md:right-0 top-[50px] xs:right-0 -right-2 bg-primary-color md:w-[70px] xs:w-[50px] w-[40px] h-[40px] xs:h-[50px] md:h-[70px] rounded-full transition-all`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheFounders;
