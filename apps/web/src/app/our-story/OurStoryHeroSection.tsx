import { ICONS } from '@repo/ui/lib';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const OurStoryHeroSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const heroImageRefMobile = useRef<HTMLImageElement>(null);
  const imagesRef1 = useRef<HTMLImageElement>(null);
  const imagesRef2 = useRef<HTMLImageElement>(null);
  const imagesRef3 = useRef<HTMLImageElement>(null);
  const imagesRef4 = useRef<HTMLImageElement>(null);
  const imagesRef1Mobile = useRef<HTMLImageElement>(null);
  const imagesRef2Mobile = useRef<HTMLImageElement>(null);
  const imagesRef3Mobile = useRef<HTMLImageElement>(null);
  const imagesRef4Mobile = useRef<HTMLImageElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const ourVisionRef = useRef<HTMLDivElement>(null);
  const hillsRef = useRef<HTMLDivElement>(null);
  const hills2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to(heroImageRef.current, { y: -250 }, 0.2)
        .to(heroImageRefMobile.current, { y: -55 }, 0.2)
        .to(imagesRef1.current, { y: -255 }, 0.3)
        .to(imagesRef1Mobile.current, { y: -55 }, 0.3)
        .to(imagesRef2.current, { y: -255 }, 0.4)
        .to(imagesRef2Mobile.current, { y: -55 }, 0.4)
        .to(imagesRef3.current, { y: -255 }, 0.5)
        .to(imagesRef3Mobile.current, { y: -85 }, 0.5)
        .to(imagesRef4.current, { y: -355 }, 0.5)
        .to(imagesRef4Mobile.current, { y: -85 }, 0.5)
        .to(ourVisionRef.current, { y: -55 }, 0.6)
        .to(ourVisionRef.current, { scale: 1.3 }, 0.6);
    });
    return () => context.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="w-full h-full flex justify-center md:flex-row flex-col px-[7%] ">
        <div className="mx-auto flex flex-col md:gap-6 gap-1 md:w-[65%] text-left xl:pt-20 lg:pt-16 pt-6">
          <h1 className="text-nowrap md:text-left text-center text-primary-color font-cheri lg:text-6xl text-[35px]">
            What is Wollybee ?
          </h1>
          <h2 className="md:text-left text-center text-tertiary-green mb-1 md:mb-2 xl:text-[33px] lg:text-3xl md:text-2xl text-[14px] font-heyComic xl:leading-10">
            Wollybee is an all-in-one learning ecosystem where we're on a
            mission to make{' '}
            <span className="text-nowrap">learning AWESOME!</span>
          </h2>
          <p className="text-white md:text-left text-center xl:text-2xl lg:text-lg  md:text-base text-[12px] xl:leading-9 font-helveticaRoundedBold md:mb-0 mb-10">
            Forget boring textbooks – here's a world of epic games, mind-bending
            activities, and stories that come alive! We're talking laughter,
            exploration, and adventures that make learning feel like a super fun
            playground. So,whether your little genius is a math whiz in the
            making, a science superstar in training, or a bookworm ready to
            hatch, we've got something to spark their creativity and get those
            gears turning! Let's together revolutionize learning through PLAY!
            Join the Wollybee family and empower your child's awesome journey!
          </p>
        </div>

        <div className="md:w-[50%] flex justify-end">
          <Image
            alt="Girl with Rocket"
            src={ICONS.rocketGirl}
            width={200}
            height={200}
            className="md:block hidden w-[60%]"
            ref={heroImageRef}
          />
        </div>
      </div>
      {/* Planet section  */}
      <div
        id="planet-section"
        className="grid md:grid-cols-4 grid-cols-5 gap-x-2 items-center px-[7%] "
        ref={container}
      >
        <div className="z-[10]  md:hidden col-span-3 row-span-2 w-full">
          {/* Girl with Rocket (Mobile) */}
          <Image
            alt="Girl with Rocket"
            src={ICONS.rocketGirlMobile}
            width={100}
            height={100}
            className="md:hidden block w-full min-w-[200px]"
            ref={heroImageRefMobile}
          />
        </div>
        <div className="z-[10] w-full md:col-span-1 md:row-span-1 col-span-2 blue flex justify-center">
          {/* Blue Monster on Planet(Desktop) */}
          <Image
            alt="Blue monster on planet"
            src={ICONS.blueMonsterPlanet}
            width={100}
            height={100}
            className="xl:w-[350px] lg:w-[250px] md:w-[200px] xl:h-[350px] lg:h-[250px] md:h-[200px] hidden md:block w-[50%]"
            ref={imagesRef1}
          />

          {/* Blue Monster on Planet(Mobile) */}
          <Image
            alt="Blue monster on planet"
            src={ICONS.blueMonsterPlanet}
            width={100}
            height={100}
            className="md:hidden w-[50%]"
            ref={imagesRef1Mobile}
          />
        </div>
        <div className="z-[10] md:col-span-1 md:row-span-1 col-span-2 flex md:justify-center md:items-start  justify-end items-end orange">
          {/* Orange Planet (Desktop) */}
          <Image
            alt="Planet"
            src={ICONS.orangePlanet}
            width={100}
            height={100}
            className="xl:w-[220px] lg:w-[180px] md:-mt-[50%] md:w-[150px xl:h-[220px] lg:h-[180px] md:block hidden md:h-[150px] w-[60%]"
            ref={imagesRef2}
          />

          {/* Orange Planet (Mobile) */}
          <Image
            alt="Planet"
            src={ICONS.orangePlanet}
            width={100}
            height={100}
            className="md:hidden w-[60%]"
            ref={imagesRef2Mobile}
          />
        </div>

        <div className="z-[10] md:-mt-[40%] md:col-span-1 md:row-span-1 col-span-2 saturn">
          {/* Earth (Desktop) */}
          <Image
            alt="Earth"
            src={ICONS.earth}
            width={100}
            height={100}
            className="rotate-45 md:block hidden md:rotate-0 xl:w-[300px] lg:w-[250px] md:w-[180px] xl:h-[300px] lg:h-[250px] md:h-[180px] w-[60%]"
            ref={imagesRef3}
          />
          {/* Saturn (Mobile)  */}
          <Image
            alt="Saturn Planet"
            src={ICONS.saturn}
            width={100}
            height={100}
            className="xl:w-[400px] md:hidden lg:w-[300px] md:w-[200px]  xl:h-[400px] lg:h-[300px] md:h-[200px] w-[100%]"
            ref={imagesRef3Mobile}
          />
        </div>

        <div className="z-[10] md:col-span-1 md:row-span-1 col-span-2 flex justify-end items-start  earth">
          {/* Saturn (Desktop) */}
          <Image
            alt="Saturn Planet"
            src={ICONS.saturn}
            width={100}
            height={100}
            className="xl:w-[400px] md:block hidden lg:w-[300px] md:w-[200px]  xl:h-[400px] lg:h-[300px] md:h-[200px] w-[100%]"
            ref={imagesRef4}
          />
          {/* Earth (Mobile) */}
          <Image
            alt="Earth"
            src={ICONS.earth}
            width={100}
            height={100}
            className="rotate-45 md:hidden md:rotate-0 xl:w-[300px] lg:w-[250px] md:w-[180px] xl:h-[300px] lg:h-[250px] md:h-[180px] w-[60%]"
            ref={imagesRef4Mobile}
          />
        </div>
      </div>

      {/* Our Vision Section  */}

      <div className="flex justify-end">
        <div
          className="flex flex-col md:gap-6 gap-2 w-full mx-auto text-center md:pt-20 xl:px-[7%] xs:px-[11%]"
          ref={ourVisionRef}
        >
          <h1 className="text-primary-color font-cheri lg:text-6xl text-4xl">
            our Vision
          </h1>
          <h2 className="text-white md:text-3xl text-base font-heyComic">
            Wollybee envisions a future where every child{' '}
            <br className="hidden lg:block" /> unlocks their potential through
            joyful learning adventures.
          </h2>
        </div>
      </div>
      <div className="w-full sm:-translate-y-0  md:mt-4 mt-10" ref={hillsRef}>
        <Image
          alt="Tonny"
          src={ICONS.mountains}
          width={100}
          height={100}
          className="w-full hidden md:block"
        />
        <Image
          alt="Tonny"
          src={ICONS.mountainsMobile}
          width={100}
          height={100}
          className="w-full md:hidden"
        />
      </div>
    </div>
  );
};
