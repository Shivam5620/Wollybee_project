import { ICONS } from '@repo/ui/lib';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const PlanetsSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const imagesRef1 = useRef<HTMLImageElement>(null);
  const imagesRef2 = useRef<HTMLImageElement>(null);
  const imagesRef3 = useRef<HTMLImageElement>(null);
  const imagesRef4 = useRef<HTMLImageElement>(null);
  const imagesRef5 = useRef<HTMLImageElement>(null);

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
        .to(imagesRef1.current, { y: -450 }, 0.1)
        .to(imagesRef2.current, { y: -255 }, 0.2)
        .to(imagesRef3.current, { y: -255 }, 0.3)
        .to(imagesRef4.current, { y: -255 }, 0.4)
        .to(imagesRef5.current, { y: -255 }, 0.5);
    });
    return () => context.revert();
  }, []);

  return (
    <div
      id="planet-section"
      className="grid md:grid-cols-4 grid-cols-5 gap-x-2 items-center px-[7%] "
      ref={container}
    >
      <div className="z-[10]  md:hidden col-span-3 row-span-2 w-full">
        <Image
          alt="Girl with Rocket"
          src={ICONS.rocketGirlMobile}
          width={100}
          height={100}
          className="md:hidden block w-full min-w-[200px]"
          ref={imagesRef1}
        />
      </div>
      <div className="z-[10] w-full md:col-span-1 md:row-span-1 col-span-2 blue flex justify-center">
        <Image
          alt="Blue monster on planet"
          src={ICONS.blueMonsterPlanet}
          width={100}
          height={100}
          className="xl:w-[350px] lg:w-[250px] md:w-[200px] xl:h-[350px] lg:h-[250px] md:h-[200px] w-[50%]"
          ref={imagesRef2}
        />
      </div>
      <div className="z-[10] md:col-span-1 md:row-span-1 col-span-2 flex md:justify-center md:items-start  justify-end items-end orange">
        <Image
          alt="Planet"
          src={ICONS.orangePlanet}
          width={100}
          height={100}
          className="xl:w-[220px] lg:w-[180px] md:-mt-[50%] md:w-[150px xl:h-[220px] lg:h-[180px] md:h-[150px] w-[60%]"
          ref={imagesRef3}
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
          ref={imagesRef4}
        />
        {/* Saturn (Mobile)  */}
        <Image
          alt="Saturn Planet"
          src={ICONS.saturn}
          width={100}
          height={100}
          className="xl:w-[400px] md:hidden lg:w-[300px] md:w-[200px]  xl:h-[400px] lg:h-[300px] md:h-[200px] w-[100%]"
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
          ref={imagesRef5}
        />
        {/* Earth (Mobile) */}
        <Image
          alt="Earth"
          src={ICONS.earth}
          width={100}
          height={100}
          className="rotate-45 md:hidden md:rotate-0 xl:w-[300px] lg:w-[250px] md:w-[180px] xl:h-[300px] lg:h-[250px] md:h-[180px] w-[60%]"
        />
      </div>
    </div>
  );
};
