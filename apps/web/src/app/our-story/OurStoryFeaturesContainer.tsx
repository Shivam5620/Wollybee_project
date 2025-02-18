import React, { useLayoutEffect, useRef } from 'react';
import ImageContainer from '../components/common/ImageContainer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OurStoryFeaturesContainer = () => {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer1Ref = useRef<HTMLDivElement>(null);
  const imageContainer2Ref = useRef<HTMLDivElement>(null);
  const imageContainer3Ref = useRef<HTMLDivElement>(null);
  const imageContainer4Ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top 60%',
            end: 'bottom top',
            toggleActions: 'play none none reset',
          },
        })
        .to(imageContainer1Ref.current, {
          scale: 1.2,
          duration: 0.15,
          yoyo: true,
          ease: 'power1.inOut',
          repeat: 1,
          lazy: false,
        })
        .to(imageContainer2Ref.current, {
          scale: 1.2,
          duration: 0.15,
          yoyo: true,
          ease: 'power1.inOut',
          repeat: 1,
          lazy: false,
        })
        .to(imageContainer3Ref.current, {
          scale: 1.2,
          duration: 0.15,
          yoyo: true,
          ease: 'power1.inOut',
          repeat: 1,
          lazy: false,
        })
        .to(imageContainer4Ref.current, {
          scale: 1.2,
          duration: 0.15,
          yoyo: true,
          ease: 'power1.inOut',
          repeat: 1,
          lazy: false,
        });
    });
    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="w-full px-[2%] bg-primary-color" ref={container}>
      <h1 className="text-white font-cheri md:text-6xl xs:text-5xl text-4xl text-center pt-7 lg:mb-20 mb-10">
        Why Choose Wollybee?
      </h1>

      <div className="flex flex-wrap md:flex-nowrap lg:gap-12 md:gap-2 xs:gap-10 gap-x-4 gap-y-8 justify-center md:pb-20 pb-7  md:justify-between lg:justify-center">
        <div
          ref={imageContainer1Ref}
          className=" xl:max-w-[300px] lg:max-w-[230px] xs:max-w-[200px]  max-w-[150px]"
        >
          <ImageContainer
            color="pirmary-color"
            text="Trusted by Parents,
Loved by Kids!"
            image="/our-story/whyChooseWolly1.svg"
            className="p-0"
          />
        </div>
        <div
          ref={imageContainer2Ref}
          className=" xl:max-w-[300px] lg:max-w-[230px] xs:max-w-[200px]  max-w-[150px]"
        >
          <ImageContainer
            color="primary-color"
            text="Building Values
Through Play!"
            image="/our-story/whyChooseWolly2.svg"
            className="p-0"
          />
        </div>
        <div
          ref={imageContainer3Ref}
          className=" xl:max-w-[300px] lg:max-w-[230px] xs:max-w-[200px]  max-w-[150px]"
        >
          <ImageContainer
            color="primary-color"
            text="Learning that Grows
with Your Child! "
            image="/our-story/whyChooseWolly3.svg"
            className="p-0"
          />
        </div>
        <div
          ref={imageContainer4Ref}
          className=" xl:max-w-[300px] lg:max-w-[230px] xs:max-w-[200px]  max-w-[150px]"
        >
          <ImageContainer
            color="primary-color"
            text="Expert-Approved 
Fun"
            image="/our-story/whyChooseWolly4.svg"
            className="p-0"
          />
        </div>
      </div>
    </div>
  );
};

export default OurStoryFeaturesContainer;
