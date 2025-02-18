'use client';

import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';
import { ICONS } from '@repo/ui/lib';

const HomePageFooterWave = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  const pathname = usePathname();
  return (
    <div className="relative w-full z-[12]">
      <svg
        viewBox="0 0 1440 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <mask
          id="mask0_3330_561"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1440"
          height="150"
        >
          <rect width="1440" height="150" fill="white" />
        </mask>
        <g mask="url(#mask0_3330_561)">
          <mask
            id="mask1_3330_561"
            maskUnits="userSpaceOnUse"
            x="0"
            y="-33"
            width="1440"
            height="509"
          >
            <path d="M1440 -33H0V475.645H1440V-33Z" fill="white" />
          </mask>
          <g mask="url(#mask1_3330_561)">
            <path
              d="M-83.4428 87.3478C-21.5721 12.8216 138.714 15.8033 172.29 16.4318C273.943 18.3659 284.255 47.6026 406.037 54.0334C505.711 59.3038 506.66 40.1081 623.265 40.0759C758.308 40.0759 781.097 65.7829 907.871 65.8635C1004.45 65.8635 1004.8 50.9873 1131.99 40.0759C1306.83 25.0707 1450.09 12.7894 1518.33 75.5338C1575.5 128.076 1577.89 231.291 1515.59 286.122C1426.08 364.903 1252.92 299.918 968.36 278.611C387.043 235.095 88.9496 429.823 -55.931 296.872C-117.74 240.139 -130.093 143.549 -83.4428 87.3478Z"
              fill={color}
            />
            <path
              d="M-83.4428 87.3478C-21.5721 12.8216 138.714 15.8033 172.29 16.4318C273.943 18.3659 284.255 47.6026 406.037 54.0334C505.711 59.3038 506.66 40.1081 623.265 40.0759C758.308 40.0759 781.097 65.7829 907.871 65.8635C1004.45 65.8635 1004.8 50.9873 1131.99 40.0759C1306.83 25.0707 1450.09 12.7894 1518.33 75.5338C1575.5 128.076 1577.89 231.291 1515.59 286.122C1426.08 364.903 1252.92 299.918 968.36 278.611C387.043 235.095 88.9496 429.823 -55.931 296.872C-117.74 240.139 -130.093 143.549 -83.4428 87.3478Z"
              fill={color}
            />
          </g>
        </g>
      </svg>

      {(pathname.startsWith('/our-story') ||
        pathname.startsWith('/contact-us')) && (
        <div
          className="absolute z-[30] right-[7%] -top-[15%] xs:-top-[20%] md:-top-[24%]"
          id="bouncy-animation"
        >
          <Image
            src={ICONS.footerStars}
            width={450}
            height={450}
            alt="Footer stars"
            className=" w-[200px] md:w-[250px] lg:w-[300px] xl:w-[450px]"
          />
        </div>
      )}

      {pathname.startsWith('/careers') && (
        <>
          <div
            id="bouncy-animation"
            className="absolute z-[30] right-[1%] xs:right-[8%] md:right-[7%] -top-[32%] xs:-top-[20%] md:-top-[60%] w-[180px] xs:w-[200px] md:w-[250px] lg:w-[350px]"
          >
            <Image
              src={ICONS.careersPage.girlWithRocket}
              width={450}
              height={450}
              alt="Girl With Rocket"
              className="w-[180px] xs:w-[200px] md:w-[250px] lg:w-[350px]"
            />
          </div>
          <div
            id="bouncy-animation"
            className="absolute z-[30] left-[5%] xs:left-[10%] -top-[23%] xs:-top-[20%] md:-top-[40%]"
          >
            <Image
              src={ICONS.careersPage.cloudCharacter}
              width={150}
              height={150}
              alt="Cloud Character"
              className="[filter:drop-shadow(2px_-6px_20px_#00000010)]  w-[75px]  md:w-[100px] lg:w-[100px] xl:w-[150px]"
            />
          </div>
        </>
      )}

      {children}
    </div>
  );
};

export default HomePageFooterWave;
