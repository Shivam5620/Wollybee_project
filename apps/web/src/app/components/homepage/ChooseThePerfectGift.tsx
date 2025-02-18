'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { ICONS, navBarRoutesClient } from '@repo/ui/lib';
import { Button } from '../../../ui/components/ui/button';
import { IFilterClient } from '@repo/ui/types';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { setProductFilters } from '@repo/ui/lib/features/filterSlice';
import ChooseThePerfectGiftDropdown from './ChooseThePerfectGiftDropdown';
import { FilterType } from '@repo/ui/enums';

interface IChooseThePerfectGiftProps {
  filterData: IFilterClient;
}

const ChooseThePerfectGift = ({ filterData }: IChooseThePerfectGiftProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filter.filter);

  const [savedAgesFilters, setAgesSavedFilters] =
    useState<IFilterClient>(filterState);
  const [savedInterestsFilters, setInterestsSavedFilters] =
    useState<IFilterClient>(filterState);

  useLayoutEffect(() => {
    dispatch(setProductFilters(filterData));
  }, []);

  useEffect(() => {
    setAgesSavedFilters(filterState);
    setInterestsSavedFilters(filterState);
  }, [filterState]);

  const mergeFilters = () => {
    const mergedFilters = { ...filterState };
    mergedFilters.ages = savedAgesFilters.ages;
    mergedFilters.categories = savedInterestsFilters.categories;
    return mergedFilters;
  };

  return (
    <div className="overflow-hidden relative text-white mx-auto w-full h-full -mt-3">
      <h1 className="text-white lg:mb-6 md:mb-14 xl:mt-[150px] lg:mt-20 md:mt-12 xs:mt-8 font-cheri xl:text-7xl lg:text-6xl md:text-5xl xs:text-3xl text-[28px] text-center capitalize">
        Choose the perfect gift
      </h1>

      <div className="flex md:flex-row flex-col items-center justify-center mx-auto md:-mt-10 xl:mt-10 xs:mt-0 mt-2 mb-40 lg:gap-10 gap-2">
        <Image
          alt="cloud"
          id="bouncy-animation"
          className="hidden md:block md:p-8 xl:p-4 md:w-[250px] lg:w-auto"
          src={ICONS.santaDesktop}
          width={350}
          height={400}
        />

        <div className="relative md:px-0 px-6">
          <Image
            alt="cloud"
            id="zoom-animation"
            className="h-full xl:w-[700px] md:min-w-[500px] w-[90%] hidden md:block "
            src={ICONS.cloud}
            width={740}
            height={470}
          />
          <Image
            alt="cloud"
            className="md:hidden min-w-[300px] xs:w-[400px] w-[300px] max-w-[440px]"
            src={ICONS.cloudWithSanta}
            width={540}
            height={470}
          />

          <div className="min-w-[500px] md:min-w-max md:w-[80%] absolute md:top-1/2 top-[68%] left-1/2 md:left-[45%] xl:left-1/2 transform -translate-x-1/2 -translate-y-1/2 xs:gap-5 md:flex md:flex-col text-center md:px-2 lg:px-0 ">
            <div className="font-heyComic flex flex-col md:flex-row items-center justify-between xs:gap-3">
              <p className="xs:text-xl xl:text-3xl text-left text-primary-purple flex flex-col md:flex-row">
                I am making a choice for
              </p>

              <ChooseThePerfectGiftDropdown
                className="text-pale-purple lg:w-[60%] md:w-[50%] xs:w-[60%] w-[45%] md:bg-white bg-light-skin-color lg:h-14  md:h-12 xs:h-14 h-9 px-6 xs:text-lg text-sm"
                filterType={FilterType.ages}
                label="Age"
                textColor="text-pale-purple border-pale-purple"
                setSavedFilters={setAgesSavedFilters}
              />
            </div>

            <div className="font-heyComic py-1 flex flex-col md:flex-row justify-between  items-center gap-1">
              <p className="xs:text-xl xl:text-3xl text-left text-primary-purple flex flex-col md:flex-row gap-3">
                They are excited about
              </p>
              <ChooseThePerfectGiftDropdown
                className="text-pale-purple lg:w-[60%] md:w-[50%] xs:w-[60%] w-[45%] md:bg-white bg-light-skin-color lg:h-14  md:h-12 xs:h-14 h-9 px-6 xs:text-lg  text-sm"
                filterType={FilterType.categories}
                label="Categories"
                textColor="text-pale-purple border-pale-purple"
                setSavedFilters={setInterestsSavedFilters}
              />
            </div>
            <Button
              onClick={() => {
                dispatch(setProductFilters(mergeFilters()));
                router.push(navBarRoutesClient.shopAll);
              }}
              className="sm:py-3 xs:text-xl text-sm lg:py-2 xs:w-44 md:w-auto lg:w-44 md:py-1 py-2 h-auto ml-auto mr-0 bg-primary-color hover:bg-primary-color hover:scale-110 transition-all text-white font-heyComic rounded-full"
            >
              Choose gift
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseThePerfectGift;
