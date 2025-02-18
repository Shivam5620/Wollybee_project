'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Sandwich from '../common/Sandwich';
import { Checkbox } from '../../../ui/components/ui/checkbox';
import { Chipbox } from '../../../ui/components/ui/chipbox';
import { ICONS } from '@repo/ui/lib';
import { IFilterClient, IProductInterestSelector } from '@repo/ui/types';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { setProductFilters } from '@repo/ui/lib/features/filterSlice';
import { FilterType } from '@repo/ui/enums';
import { Button } from '../../../ui/components/ui/button';

interface IFilterItemProps {
  id: number;
  color: string;
  text: string;
  image: string;
  isSelected?: boolean;
  data: IProductInterestSelector[];
  onChange: (value: IProductInterestSelector[]) => void;
}

const FilterItem = ({
  id,
  color,
  text,
  image,
  data,
  isSelected = false,
  onChange,
}: IFilterItemProps) => {
  const handleCheckChange = () => {
    const updatedData = data.map((a) => {
      if (a.id == id) {
        return { ...a, isSelected: !isSelected };
      }
      return a;
    });
    onChange(updatedData);
  };

  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <div
        style={{
          backgroundColor: color,
        }}
        className="relative w-24 h-24 rounded-full cursor-pointer"
        onClick={handleCheckChange}
      >
        <Checkbox
          checked={isSelected}
          className="absolute top-0 right-0 w-5 h-5 rounded-full data-[state=checked]:bg-primary-color text-white"
        />
        <div className="absolute top-1 right-1"></div>
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={image}
            alt="Filter-image"
            width={100}
            height={100}
            className="object-cover p-3"
          />
        </div>
      </div>
      <p className="text-center font-heyComic text-primary-gray text-sm">
        {text}
      </p>
    </div>
  );
};

const Header = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="shadow-[0px_2px_23px_0px_#cacaca] pt-6 pb-3 relative">
      <h1 className="text-primary-color font-cheri text-4xl text-center">
        Filters
      </h1>

      <Image
        alt="close"
        src={ICONS.closeIcon}
        className="absolute right-[5%] top-5 cursor-pointer"
        onClick={() => onClose()}
        width={40}
        height={40}
      />
    </div>
  );
};

const Footer = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="shadow-[0px_2px_23px_0px_#cacaca] bg-white rounded-t-2xl py-5 flex justify-center">
      <Button
        className="bg-secondary-color text-white font-heyComic text-2xl rounded-full py-2 w-[230px] h-[42px]"
        onClick={() => onClose()}
      >
        Apply Filters
      </Button>
    </div>
  );
};

const Content = () => {
  const dispatch = useAppDispatch();

  const { filter: filterState } = useAppSelector((state) => state.filter);

  const setFilterState = (value: IFilterClient) => {
    dispatch(setProductFilters(value));
  };

  const availableHexColors: string[] = [
    '#FFC648',
    '#FBC3AA',
    '#F47673',
    '#8584BC',
    '#8AC48A',
  ];

  const getRandomColor = (num: number) => {
    return availableHexColors[num % availableHexColors.length];
  };

  const handleCheckChange = (
    id: number,
    value: boolean,
    module: FilterType,
  ) => {
    const updatedData = filterState[`${module}`].map((a) => {
      if (a.id == id) {
        return { ...a, isSelected: value };
      }
      return a;
    });
    setFilterState({ ...filterState, [`${module}`]: updatedData });
  };

  return (
    <div className="px-[5%]">
      <div className="my-5">
        <h1 className="text-[20px] font-heyComic my-3 text-primary-black">
          Shop by Interest -
        </h1>
        <div className="grid grid-cols-3 gap-2 text-primary-gray">
          {filterState.interests.map((item) => (
            <FilterItem
              id={item.id}
              data={filterState.interests}
              isSelected={item.isSelected}
              onChange={(value) => {
                setFilterState({ ...filterState, interests: value });
              }}
              key={item.id}
              color={item.color}
              text={item.name}
              image={item.file.url}
            />
          ))}
        </div>
      </div>

      <div className="my-5">
        <h1 className="text-[20px] font-heyComic my-3 text-primary-black">
          Shop by Age -
        </h1>
        <div className="flex flex-wrap gap-4">
          {filterState.ages.map((a) => (
            <section
              key={a.id}
              className="flex gap-1 items-center font-heyComic text-primary-gray"
            >
              <Checkbox
                style={{
                  borderColor: a.color,
                  backgroundColor: a.isSelected ? a.color : 'transparent',
                }}
                checked={a.isSelected}
                onCheckedChange={(value: boolean) => {
                  handleCheckChange(a.id, value, FilterType.ages);
                }}
                className={`w-7 h-7 rounded-full border-[2px] text-white`}
              />
              <p className="text-sm pl-1">{a.name}</p>
            </section>
          ))}
        </div>
      </div>

      <div className="my-5">
        <h1 className="text-[20px] text-primary-black font-heyComic my-3">
          Product Categories -
        </h1>
        <div className="grid grid-cols-12 gap-4">
          {filterState.categories
            .map((a, index) => ({ ...a, color: getRandomColor(index) }))
            .map((a) => (
              <Chipbox
                style={{
                  borderColor: a.color,
                  backgroundColor: a.isSelected ? a.color : 'transparent',
                  color: a.isSelected ? 'white' : a.color,
                }}
                key={a.id}
                checked={a.isSelected}
                onCheckedChange={(value: boolean) => {
                  handleCheckChange(a.id, value, FilterType.categories);
                }}
                label={a.name}
                className="font-heyComic border-[2px] col-span-4 w-full text-xs h-8 rounded-full data-[state=checked]:text-white"
              />
            ))}
        </div>
      </div>

      <div className="my-5">
        <h1 className="text-[20px] font-heyComic my-3 text-primary-black">
          Price Range -
        </h1>
        <div className="grid grid-cols-12 gap-x-3 gap-y-1 font-heyComic">
          {filterState.prices
            .map((a, index) => ({ ...a, color: getRandomColor(index) }))
            .map((a) => (
              <Chipbox
                style={{
                  borderColor: a.color,
                  backgroundColor: a.isSelected ? a.color : 'transparent',
                  color: a.isSelected ? 'white' : a.color,
                }}
                key={a.id}
                checked={a.isSelected}
                onCheckedChange={(value: boolean) => {
                  handleCheckChange(a.id, value, FilterType.prices);
                }}
                label={a.name}
                className={`col-span-4 border-[2px] m-1 w-full text-xs h-8 rounded-full data-[state=checked]:text-white`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const FilterModal = ({
  data,
  onClose,
}: {
  data: IFilterClient;
  onClose: () => void;
}) => {
  return (
    <div className="h-screen w-screen">
      <Sandwich
        header={<Header onClose={() => onClose()} />}
        content={<Content />}
        footer={<Footer onClose={() => onClose()} />}
      />
    </div>
  );
};

export default FilterModal;
