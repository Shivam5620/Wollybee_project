'use client';

import React, { useLayoutEffect, useRef } from 'react';
import ImageContainer from './ImageContainer';
import gsap from 'gsap';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface MultipleImageCardProps {
  showBgColor?: boolean;
  label: string;
  imageStyling?: ClassNameValue;
  data: {
    image?: string;
    text: string;
    color: string;
  }[];
}

const MultipleImageCard = ({
  label,
  data,
  showBgColor = true,
  imageStyling,
}: MultipleImageCardProps) => {
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const container = useRef<HTMLDivElement>(null);

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
        .to(imagesRef.current[0], {
          scale: 1.2,
          duration: 0.18,
          yoyo: true,
          ease: 'power1.inOut',
          repeat: 1,
        })
        .to(imagesRef.current[1], {
          scale: 1.2,
          duration: 0.18,
          yoyo: true,
          ease: 'power1.inOut',
          repeat: 1,
        })
        .to(imagesRef.current[2], {
          scale: 1.2,
          duration: 0.18,
          yoyo: true,
          ease: 'power1.inOut',
          repeat: 1,
        });
    });
    return () => context.revert();
  }, []);

  return (
    <div className=" mx-auto sm:px-0 px-[2%] flex flex-col md:justify-between gap-2 md:mt-20 xs:mt-16 mt-8">
      <h1 className="px-1 text-primary-color xs:mb-12 mb-4  font-cheri xl:text-7xl lg:text-6xl xs:text-5xl text-2xl text-center  md:w-[80%] w-[98%] mx-auto">
        {label}
      </h1>
      <div
        className={` flex text-center flex-wrap ${showBgColor ? 'gap-8' : 'gap-x-8 gap-y-4'}   md:gap-32 sm:gap-16 justify-center font-heyComic lg:text-4xl md:text-3xl text-[22px]`}
      >
        {data.map((a, i) => (
          <div
            className="flex  xs:max-w-[250px] lg:max-w-[300px] max-w-[130px] items-center flex-col md:gap-8 gap-4 "
            ref={container}
          >
            <div ref={(el: any) => (imagesRef.current[i] = el)}>
              <ImageContainer
                image={a.image}
                color={a.color}
                showBgColor={showBgColor}
              />
            </div>
            <p className={`text-${a.color}`}>{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleImageCard;
