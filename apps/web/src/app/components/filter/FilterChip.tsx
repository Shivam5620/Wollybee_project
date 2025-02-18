'use client';
import React from 'react';
import FilterChipElement from './FilterChipElement';
import { MultipleItemsCarousel } from '../common/CustomCarousel';
import { ICONS } from '@repo/ui/lib';

interface FilterChipProps<T> {
  filterOptions: T[];
  filterTitle: string;
  defaultSlidesPerView?: number;
  slidesPerView?: number;
  minComponentNeeded: number;
}

const FilterChip = <T,>({
  filterOptions,
  filterTitle,
  defaultSlidesPerView = 3,
  slidesPerView = 3,
  minComponentNeeded = 2,
}: FilterChipProps<T>) => {
  return (
    <div className="xl:w-[1230px] lg:w-[1040px] md:w-[820px] md:mx-auto w-full">
      <div className="hidden md:flex md:flex-row flex-col lg:gap-4 gap-0 justify-start items-center w-full mx-auto py-4">
        <div className="">
          <p
            className={`hidden font-heyComic md:block text-3xl px-2 text-primary-black`}
          >
            {filterTitle}
          </p>
        </div>

        <div className="hidden md:block xl:w-[900px] lg:w-[700px] md:w-[600px]  w-full">
          <MultipleItemsCarousel
            componentLeftAlign={true}
            minComponentNeeded={minComponentNeeded}
            defaultSlidesPerView={defaultSlidesPerView}
            slidesPerView={slidesPerView}
            Component={(data) => (
              <div className="mx-auto w-full flex justify-center">
                <FilterChipElement {...data} />
              </div>
            )}
            data={
              filterOptions?.map((a) => {
                return { item: a };
              }) || []
            }
            leftArrowClassName="hidden"
            rightArrowClassName="hidden"
            arrows={{
              left: ICONS.carouselArrows.grayLeft,
              right: ICONS.carouselArrows.grayRight,
            }}
            carouselId="filter-chip-carousel"
            centerMode={false}
            loop={false}
          />
        </div>
      </div>

      <div className="mt-2 mb-1 md:hidden gap-2 px-2 flex overflow-x-scroll no-scrollbar">
        {filterOptions?.map((a, index) => (
          <div key={index} className="w-30 items-center text-xs">
            <FilterChipElement item={a} className="w-10 px-5 text-base" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChip;
