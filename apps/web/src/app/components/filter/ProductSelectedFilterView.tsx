'use client';
import { IFilterClient } from '@repo/ui/types';
import React from 'react';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { FilterType } from '@repo/ui/enums';
import { setProductFilters } from '@repo/ui/lib/features/filterSlice';

const SelectedFilterChip = ({
  name,
  filterType,
  data,
}: {
  name: string;
  filterType: FilterType;
  data: IFilterClient;
}) => {
  const dispatch = useAppDispatch();

  const filterState = useAppSelector((state) => state.filter);

  const handleRemoveFilter = () => {
    const currentFilters = filterState.filtersAvailable
      ? filterState.filter
      : data;
    const copySelectedFilter = [...currentFilters[`${filterType}`]];
    const modifiedFilters = {
      ...currentFilters,
      [`${filterType}`]: copySelectedFilter.map((a) => {
        if (a.name == name) {
          return {
            ...a,
            isSelected: false,
          };
        }
        return a;
      }),
    };
    dispatch(setProductFilters(modifiedFilters));
  };

  return (
    <section className="flex text-xs rounded-full border text-primary-black px-2 font-helveticaRoundedBold items-center">
      {name}
      <Image
        onClick={handleRemoveFilter}
        className="cursor-pointer"
        alt="close"
        src={ICONS.closeIcon}
        height={30}
        width={30}
      />
    </section>
  );
};

const ProductSelectedFilterView = ({ data }: { data: IFilterClient }) => {
  return (
    <div className="px-[5%] flex gap-2 flex-wrap py-5">
      {data.ages
        .filter((a) => a.isSelected)
        .map((a) => (
          <SelectedFilterChip
            key={a.id}
            data={data}
            filterType={FilterType.ages}
            name={a.name}
          />
        ))}

      {data.categories
        .filter((a) => a.isSelected)
        .map((a) => (
          <SelectedFilterChip
            key={a.id}
            data={data}
            filterType={FilterType.categories}
            name={a.name}
          />
        ))}

      {data.interests
        .filter((a) => a.isSelected)
        .map((a) => (
          <SelectedFilterChip
            key={a.id}
            data={data}
            filterType={FilterType.interests}
            name={a.name}
          />
        ))}

      {data.prices
        .filter((a) => a.isSelected)
        .map((a) => (
          <SelectedFilterChip
            key={a.id}
            data={data}
            filterType={FilterType.prices}
            name={a.name}
          />
        ))}

      {data.common
        .filter((a) => a.isSelected)
        .map((a) => (
          <SelectedFilterChip
            key={a.id}
            data={data}
            filterType={FilterType.common}
            name={a.name}
          />
        ))}
    </div>
  );
};

export default ProductSelectedFilterView;
