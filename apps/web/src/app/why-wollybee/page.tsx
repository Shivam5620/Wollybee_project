'use client';

import Image from 'next/image';
import React, { RefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { ICONS } from '@repo/ui/lib';
import ReviewCard from '../components/homepage/ReviewCard';
import { MultipleItemsCarousel } from '../components/common/CustomCarousel';
import { reviewData } from '../components/homepage/HomePageReviewsCarousel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from './Cursor';
gsap.registerPlugin(ScrollTrigger);
import { Metadata } from 'next';
import {
  keywords,
  whyCustomerData,
} from '../../../../../packages/ui/lib/constants';

export const dynamic = 'force-static';
const metadata: Metadata = {
  title: 'Why Parents and Little lerners Love Wollybee',
  description:
    'Learn why parents trust Wollybee for their childrens educational needs. Discover testimonials and success stories.',
  keywords: keywords,
};

const BranchContent = ({
  branch,
  image,
  title,
  description,
  titleColor,
  bushMobile,
  id,
  bushColor,
  branchRef,
}: {
  branch: string;
  image?: string;
  title: string;
  description: string;
  titleColor: string;
  bushMobile: string;
  id?: string;
  bushColor?: string;
  branchRef: any;
}) => {
  return (
    <div className="w-full relative z-[9]" ref={branchRef}>
      <Image
        alt="branch"
        src={branch}
        width={100}
        height={100}
        className="w-full xs:block hidden"
      />
      <Image
        alt="branch"
        src={bushMobile}
        width={100}
        height={100}
        className="w-full min-w-[320px] max-w-[340px] xs:hidden mx-auto"
      />
      <div
        className={`absolute top-0 flex flex-col items-center justify-center xl:px-20 lg:px-16 px-6 ${description.length > 300 ? 'gap-0 ' : 'xl:gap-10 gap-2'} w-full h-full`}
      >
        <div
          className={`flex gap-2 items-center justify-center w-full  ${image ? 'text-left md:px-4 px-8 md:ml-0 ml-8' : 'text-center md:px-4'} `}
        >
          {image && (
            <div className="xs:w-[20%] w-[40%] md:hidden">
              <Image
                alt="branch 1 image"
                src={image}
                width={200}
                height={200}
                className="w-full"
              />
            </div>
          )}
          <h1
            style={{ color: titleColor }}
            className={`font-heyComic  xl:text-6xl md:text-4xl text-2xl inline-flex items-center justify-center xs:w-auto md:gap-6 gap-2`}
          >
            {id && (
              <span
                style={{ backgroundColor: titleColor, color: bushColor }}
                className={` md:flex hidden  rounded-[100%]  justify-center items-center min-w-12 min-h-12 xs:p-6 md:p-7 lg:p-10 xl:p-12 lg:text-6xl xl:text-7xl aspect-square`}
              >
                {id}
              </span>
            )}
            <span className="inline">{title}</span>
          </h1>
        </div>

        <div
          className={` xs:w-[80%] w-[85%] flex justify-center items-center md:gap-6 gap-2 `}
        >
          {' '}
          {image && (
            <div className="w-[60%] md:block hidden">
              <Image
                alt="branch 1 image"
                src={image}
                width={200}
                height={200}
                className="w-full"
              />
            </div>
          )}
          <p
            className={` ${image ? 'w-full xs:w-[75%] md:w-full' : 'md:w-[75%] w-[90%]'}  text-white ${description.length > 320 ? 'xl:text-2xl md:text-[15px] text-[12px] ' : 'xl:text-3xl lg:text-2xl md:text-lg text-[12px]'}  font-helveticaRoundedBold xs:text-left text-center`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Branch1 = ({ branchRef1 }: { branchRef1: RefObject<HTMLDivElement> }) => {
  return (
    <BranchContent
      bushMobile={whyCustomerData[0].bushMobile}
      branch={whyCustomerData[0].branch}
      image={whyCustomerData[0].image}
      title={whyCustomerData[0].title}
      description={whyCustomerData[0].description}
      titleColor={'#81E284'}
      id={whyCustomerData[0].id}
      bushColor={whyCustomerData[0].bushColor}
      branchRef={branchRef1}
    />
  );
};
const Branch2 = ({ branchRef2 }: { branchRef2: RefObject<HTMLDivElement> }) => {
  return (
    <BranchContent
      bushMobile={whyCustomerData[1].bushMobile}
      branch={whyCustomerData[1].branch}
      image={whyCustomerData[1].image ?? ''}
      title={whyCustomerData[1].title}
      description={whyCustomerData[1].description}
      titleColor={'#C5FF61'}
      id={whyCustomerData[1].id}
      bushColor={whyCustomerData[1].bushColor}
      branchRef={branchRef2}
    />
  );
};
const Branch3 = ({ branchRef3 }: { branchRef3: RefObject<HTMLDivElement> }) => {
  return (
    <BranchContent
      bushMobile={whyCustomerData[2].bushMobile}
      branch={whyCustomerData[2].branch}
      title={whyCustomerData[2].title}
      description={whyCustomerData[2].description}
      titleColor={'#89F476'}
      id={whyCustomerData[2].id}
      bushColor={whyCustomerData[2].bushColor}
      branchRef={branchRef3}
    />
  );
};
const Branch4 = ({ branchRef4 }: { branchRef4: RefObject<HTMLDivElement> }) => {
  return (
    <BranchContent
      bushMobile={whyCustomerData[3].bushMobile}
      branch={whyCustomerData[3].branch}
      title={whyCustomerData[3].title}
      description={whyCustomerData[3].description}
      titleColor={'#ADFF43'}
      id={whyCustomerData[3].id}
      bushColor={whyCustomerData[3].bushColor}
      branchRef={branchRef4}
    />
  );
};
const Branch5 = ({ branchRef5 }: { branchRef5: RefObject<HTMLDivElement> }) => {
  return (
    <BranchContent
      bushMobile={whyCustomerData[4].bushMobile}
      branch={whyCustomerData[4].branch}
      title={whyCustomerData[4].title}
      image={whyCustomerData[4].image}
      description={whyCustomerData[4].description}
      titleColor={'#81E284'}
      id={whyCustomerData[4].id}
      bushColor={whyCustomerData[4].bushColor}
      branchRef={branchRef5}
    />
  );
};

const Branch6 = ({ branchRef6 }: { branchRef6: RefObject<HTMLDivElement> }) => {
  return (
    <div ref={branchRef6}>
      <Image
        alt="branch"
        src={ICONS.whyWollybee.branch6}
        width={100}
        height={100}
        className="w-full hidden xs:block md:w-[95%] mx-auto"
      />
      <Image
        alt="branch Mobile"
        src={ICONS.whyWollybee.branchMobile6}
        width={100}
        height={100}
        className="w-full xs:hidden mx-auto"
      />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-heyComic lg:text-6xl md:text-4xl text-2xl text-primary-color lg:mb-10">
          Testimonials
        </h1>
        <div className=" xl:w-[70%] w-[80%] scale-75 xl:scale-100">
          <MultipleItemsCarousel
            Component={ReviewCard}
            data={reviewData}
            arrows={{
              left: ICONS.carouselArrows.whiteLeft,
              right: ICONS.carouselArrows.whiteRight,
            }}
            carouselId="why-us-review-carousel"
            defaultSlidesPerView={2}
            slidesPerView={2}
            oneViewOnMobile={true}
            className="md:w-[26px] w-[15px]"
          />
        </div>
      </div>
    </div>
  );
};
const Branch7 = ({ branchRef7 }: { branchRef7: RefObject<HTMLDivElement> }) => {
  return (
    <div>
      <BranchContent
        bushMobile={ICONS.whyWollybee.bushMobile7}
        branch={ICONS.whyWollybee.branch7}
        title={'Social Proof'}
        description={whyCustomerData[0].description}
        titleColor={'white'}
        branchRef={branchRef7}
      />
    </div>
  );
};

const WhyCustomerLoveWollybee = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const branchRef3 = useRef<HTMLDivElement>(null);
  const branchRef2 = useRef<HTMLDivElement>(null);
  const branchRef1 = useRef<HTMLDivElement>(null);
  const branchRef4 = useRef<HTMLDivElement>(null);
  const branchRef5 = useRef<HTMLDivElement>(null);
  const branchRef6 = useRef<HTMLDivElement>(null);
  const branchRef7 = useRef<HTMLDivElement>(null);
  const branchContainer1 = useRef<HTMLDivElement>(null);
  const branchContainer2 = useRef<HTMLDivElement>(null);
  const branchContainer3 = useRef<HTMLDivElement>(null);
  const branchContainer4 = useRef<HTMLDivElement>(null);
  const branchContainer5 = useRef<HTMLDivElement>(null);
  const branchContainer6 = useRef<HTMLDivElement>(null);
  const branchContainer7 = useRef<HTMLDivElement>(null);
  const birdRef1 = useRef<HTMLDivElement>(null);
  const orangeMonsterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: branchContainer1.current,
            start: '-30% center',
            end: 'bottom 80%',
            scrub: true,
          },
        })
        .to(
          birdRef1.current,
          { x: -600, y: -100, duration: 1.5, rotateZ: 10 },
          0.1,
        )
        .from(branchRef1.current, { scale: 0.7 }, 0.1);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: branchContainer2.current,
            start: '-20% center',
            end: 'bottom 80%',
            scrub: false,

            toggleActions: 'play none none reverse',
          },
        })
        .from(branchRef2.current, { scale: 0.7 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: branchContainer3.current,
            start: '-20% center',
            end: 'bottom 80%',
            scrub: false,

            toggleActions: 'play none none reverse',
          },
        })
        .from(branchRef3.current, { scale: 0.7 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: branchContainer4.current,
            start: '-20% center',
            end: 'bottom 80%',
            scrub: false,

            toggleActions: 'play none none reverse',
          },
        })
        .from(branchRef4.current, { scale: 0.7 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: branchContainer5.current,
            start: '-20% center',
            end: 'bottom 80%',
            scrub: false,

            toggleActions: 'play none none reverse',
          },
        })
        .from(branchRef5.current, { scale: 0.7, duration: 0.3 })
        .from(orangeMonsterRef.current, { y: 300, duration: 0.4 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: branchContainer6.current,
            start: '-20% center',
            end: 'bottom 80%',
            scrub: false,

            toggleActions: 'play none none reverse',
          },
        })
        .from(branchRef6.current, { scale: 0.7 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: branchContainer7.current,
            start: '-20% center',
            end: 'bottom 80%',
            scrub: false,

            toggleActions: 'play none none reverse',
          },
        })
        .from(branchRef7.current, { scale: 0.7 });
      ScrollTrigger.refresh();
    });
    return () => {
      context.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const defaultCursorColor = 'bg-primary-color';

  return (
    <div
      className="flex justify-center relative mb-[20%] overflow-x-hidden"
      style={{
        backgroundImage: "url('/backgrounds/whyCustomerBackground.svg')",
        // Here scource was not comming from ICONS object !!
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Cursor cursorRef={cursorRef} defaultCursorColor={defaultCursorColor} />
      <Image
        alt="tree"
        width={100}
        height={100}
        src={ICONS.whyWollybeeTree}
        className="sm:block hidden sm:mt-[23%] xs:mt-[32%] mt-[24%] w-[55%] min-w-[300px] h-full object-cover md:-translate-x-10 -translate-x-3 relative z-[3]"
      />
      <Image
        alt="tree mobile"
        width={100}
        height={100}
        src={ICONS.whyWollybeeTreeMobile}
        className="sm:hidden sm:mt-[23%] xs:mt-[32%] mt-[24%] w-[55%] min-w-[300px] h-full object-cover md:-translate-x-10 -translate-x-3 relative z-[3]"
      />
      <div className="absolute sm:-mt-[15%] -mt-[6%] left-1/2 -translate-x-1/2 w-full z-[5]">
        <Image
          alt="Big Cloud"
          src={ICONS.whyWollybee.upperCloud}
          width={100}
          height={100}
          className="w-full min-w-[300px]"
        />
        <div className="absolute md:top-[40%] xs:top-[20%] top-[20%] left-1/2 -translate-x-1/2 flex flex-col md:gap-4 xs:gap-2 gap-1">
          <h1
            className="font-heyComic xl:text-7xl lg:text-5xl md:text-4xl xs:text-3xl text-xl text-center text-primary-black xs:w-full w-[300px] "
            onMouseEnter={() => {
              if (cursorRef.current) {
                (cursorRef.current as HTMLElement).classList.add(
                  'mix-blend-difference',
                );
                (cursorRef.current as HTMLElement).classList.remove(
                  defaultCursorColor,
                );
                (cursorRef.current as HTMLElement).classList.add(
                  'bg-[#0039b7]',
                );
              }
              gsap.to(cursorRef.current, {
                scale: 6,
                duration: 0.3,
              });
            }}
            onMouseLeave={() => {
              if (cursorRef.current) {
                (cursorRef.current as HTMLElement).classList.remove(
                  'mix-blend-difference',
                );
                (cursorRef.current as HTMLElement).classList.remove(
                  'bg-[#0039b7]',
                );
                (cursorRef.current as HTMLElement).classList.add(
                  defaultCursorColor,
                );
              }
              gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
            }}
          >
            Why Parents &
            <span className="block md:mt-3 xs:mt-2 mt-0 text-nowrap">
              Little Learners ❤️
            </span>
          </h1>
          <h2
            className="font-helveticaRoundedBold xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-3xl text-center text-primary-color"
            onMouseEnter={() => {
              if (cursorRef.current) {
                (cursorRef.current as HTMLElement).classList.add(
                  'mix-blend-difference',
                );
                (cursorRef.current as HTMLElement).classList.remove(
                  defaultCursorColor,
                );
                (cursorRef.current as HTMLElement).classList.add(
                  'bg-[#0039b7]',
                );
              }
              gsap.to(cursorRef.current, {
                scale: 6,
                duration: 0.3,
              });
            }}
            onMouseLeave={() => {
              if (cursorRef.current) {
                (cursorRef.current as HTMLElement).classList.remove(
                  'mix-blend-difference',
                );
                (cursorRef.current as HTMLElement).classList.remove(
                  'bg-[#0039b7]',
                );
                (cursorRef.current as HTMLElement).classList.add(
                  defaultCursorColor,
                );
              }
              gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
            }}
          >
            Wollybee?
          </h2>
        </div>
        <div className="absolute sm:bottom-[37%] xs:bottom-[55%] bottom-[40%] sm:left-[17%] left-[10%] ">
          <Image
            alt="butterfly"
            src={ICONS.whyWollybee.cloudButterfly}
            width={120}
            height={120}
            className="xl:w-[120px] lg:w-[100px] md:w-[80px] sm:w-[70px] xs:w-[40px] w-[40px]"
          />
        </div>
        <div className="absolute -bottom-[11%] right-[20%]" ref={birdRef1}>
          <Image
            alt="bird"
            src={ICONS.whyWollybee.cloudBird}
            width={220}
            height={220}
            className="xl:w-[220px] lg:w-[200px] md:w-[170px] sm:w-[150px] w-[80px]"
            id="bouncy-animation"
          />
        </div>
      </div>
      <div
        className="absolute xl:w-[75%] md:w-[80%] sm:w-[70%] w-[96%] md:top-[6.2%] xs:top-[7%] top-[6.3%]"
        ref={branchContainer1}
      >
        <Branch1 branchRef1={branchRef1} />
      </div>
      <div
        className="absolute xl:w-[75%] md:w-[80%] sm:w-[70%] w-[96%]  md:top-[16%] sm:top-[17%] xs:top-[17.5%] top-[16.3%]"
        ref={branchContainer2}
      >
        <Branch2 branchRef2={branchRef2} />
        <div className="absolute top-[10%] sm:-left-[4%] left-[] z-[10]">
          <Image
            alt="bird"
            src={ICONS.whyWollybee.purpleBird}
            width={200}
            height={200}
            className="xl:w-[200px] lg:w-[180px] md:w-[150px] sm:w-[120px] xs:w-[100px] w-[70px]"
            id="bouncy-animation"
          />
        </div>
      </div>
      <div
        className="absolute xl:w-[75%] md:w-[80%] sm:w-[70%] w-[96%] md:top-[29%] sm:top-[29.5%] xs:top-[31%] top-[29.4%]"
        ref={branchContainer3}
      >
        <Branch3 branchRef3={branchRef3} />
        <div className="absolute xl:top-[3%] -top-[10%] right-[5%] z-[10]">
          <Image
            alt="bird"
            src={ICONS.whyWollybee.blueBird}
            width={210}
            height={210}
            className="xl:w-[210px] lg:w-[190px] md:w-[160px] sm:w-[130px] xs:w-[110px] w-[80px]"
            id="bouncy-animation"
          />
        </div>
      </div>
      <div
        className="absolute xl:w-[75%] md:w-[80%] sm:w-[70%] w-[96%] md:top-[39.1%] sm:top-[39.5%] xs:top-[43%] top-[41.1%] z-[8]"
        ref={branchContainer4}
      >
        <Branch4 branchRef4={branchRef4} />
        <div className="absolute top-[2%] xs:left-[3%] left-[0%] z-[10]">
          <Image
            alt="bird"
            src={ICONS.whyWollybee.yellowBird}
            width={210}
            height={210}
            className="xl:w-[210px] lg:w-[190px] md:w-[160px] sm:w-[130px] xs:w-[110px] w-[80px]"
            id="bouncy-animation"
          />
        </div>
        <div className="absolute xl:right-[16%] xl:-top-[16.5%] lg:-top-[17%] md:-top-[19%] sm:-top-[30%] xs:-top-[15%] -top-[20%] lg:right-[17%] md:right-[15%] sm:right-[11%] xs:right-[20%] right-[11.1%] z-[10] xs:hidden lg:block">
          <Image
            alt="monster"
            src={ICONS.whyWollybee.purpleMonster}
            width={400}
            height={400}
            className="xs:rotate-[8deg] -rotate-[2deg] md:w-[180px] xl:w-[200px] sm:w-[150px] w-[100px]"
          />
        </div>
      </div>
      <div
        className="absolute xl:w-[75%] md:w-[80%] sm:w-[70%] w-[96%] md:top-[49.7%] sm:top-[50%] xs:top-[54.5%] top-[52%] z-[9]"
        ref={branchContainer5}
      >
        <Branch5 branchRef5={branchRef5} />
        <div
          className="absolute xs:-top-[18%] -top-[21%] xs:left-[20%] left-[15%]"
          ref={orangeMonsterRef}
        >
          <Image
            alt="monster"
            src={ICONS.whyWollybee.orangeMonster}
            width={250}
            height={250}
            className="xl:w-[250px] lg:w-[180px] md:w-[150px] sm:w-[120px] xs:w-[100px] w-[125px]"
          />
        </div>
      </div>
      <div
        className="absolute z-[9] xl:w-[75%] md:w-[80%] sm:w-[70%] w-[96%] md:top-[59.8%] sm:top-[61%] xs:top-[66%] top-[65.5%]"
        ref={branchContainer6}
      >
        <Branch6 branchRef6={branchRef6} />
        <div className="absolute sm:top-[8%] top-[2%] right-[1%] z-[10]">
          <Image
            alt="bird"
            src={ICONS.whyWollybee.redBird}
            width={250}
            height={250}
            className="xl:w-[210px] lg:w-[190px] md:w-[160px] sm:w-[130px] xs:w-[110px] w-[80px]"
            id="bouncy-animation"
          />
        </div>
      </div>
      <div
        className="absolute xl:w-[75%] md:w-[80%] sm:w-[70%] w-[96%] md:top-[71%] sm:top-[72%] xs:top-[79%] top-[77%] z-[8]"
        ref={branchContainer7}
      >
        <Branch7 branchRef7={branchRef7} />
        <div className="absolute sm:-top-[18%] -top-[30%] xs:right-[27%] right-[20%] z-[10]">
          <Image
            alt="butterfly"
            src={ICONS.whyWollybee.blueButterfly}
            width={210}
            height={210}
            className="xl:w-[200px] lg:w-[150px] md:w-[130px] sm:w-[90px] xs:w-[110px] w-[80px]"
          />
        </div>
        <div className="absolute bottom-[18%] left-[2%] z-[10]">
          <Image
            alt="bird"
            src={ICONS.whyWollybee.pinkBird}
            width={250}
            height={250}
            className="xl:w-[250px] lg:w-[190px] md:w-[160px] sm:w-[130px] xs:w-[110px] w-[80px]"
            id="bouncy-animation"
          />
        </div>
      </div>

      <div className="absolute top-[3.5%] -left-[2%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud1}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px] "
          id="cloudMoveRight"
        />
      </div>
      <div className="absolute top-[3.5%] -right-[2.8%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud2}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px] "
          id="cloudMoveLeft"
        />
      </div>
      <div className="absolute top-[14%] left-[2%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud3}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px]"
          id="cloudMoveRight"
        />
      </div>
      <div className="absolute top-[12%] -right-[2.5%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud4}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px]"
          id="cloudMoveLeft"
        />
      </div>
      <div className="absolute top-[28%] -right-[4%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud5}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px]"
          id="cloudMoveLeft"
        />
      </div>
      <div className="absolute top-[51%] -right-[9%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud6}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px]"
          id="cloudMoveLeft"
        />
      </div>
      <div className="absolute top-[65%] xs:-left-0 -left-[5%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud8}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px]"
          id="cloudMoveRight"
        />
      </div>
      <div className="absolute top-[79%] right-[0%]">
        <Image
          alt="small cloud"
          src={ICONS.whyWollybee.smallCloud8}
          width={100}
          height={100}
          className="xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[120px] w-[70px]"
          id="cloudMoveLeft"
        />
      </div>
    </div>
  );
};

export default WhyCustomerLoveWollybee;
