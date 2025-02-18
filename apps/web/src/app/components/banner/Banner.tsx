'use client';
import { IBanner } from '@repo/ui/types';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { SimpleCarousel } from '../common/CustomCarousel';
import { setBanners } from '@repo/ui/lib/features/bannerSlice';
import { useAppDispatch } from '../../../lib/hooks';
import Link from 'next/link';
import { BannerType } from '@repo/ui/enums/banner';

const Banner = ({
  bannerData,
  filter,
}: {
  bannerData: IBanner[];
  filter?: BannerType;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBanners(bannerData));
  }, []);

  return (
    <>
      <div className="hidden sm:block mx-1 md:mx-1 mb-2 max-h-[745px] overflow-hidden">
        <SimpleCarousel
          pagination={true}
          carouselId="banner-carousel"
          data={bannerData.filter((a) => {
            if (filter) {
              return a.type === filter;
            } else {
              return true;
            }
          })}
          Component={(a) => (
            <Link href={a.url ?? '#'}>
              <Image
                key={a.file.url}
                className="w-full cursor-pointer"
                width={1440}
                height={728}
                alt="banner"
                src={a.file.url}
              />
            </Link>
          )}
        />
      </div>
      <div className="sm:hidden mx-1 md:mx-1 mb-2">
        <SimpleCarousel
          carouselId="banner-carousel"
          data={bannerData.filter((a) => {
            if (filter) {
              return a.type === filter;
            } else {
              return true;
            }
          })}
          Component={(a) => (
            <Link href={a.url ?? '#'}>
              <Image
                key={a.mobileFile.url}
                className="w-full cursor-pointer"
                width={420}
                height={100}
                alt="banner"
                src={a.mobileFile?.url}
              />
            </Link>
          )}
        />
      </div>
    </>
  );
};

export default Banner;
