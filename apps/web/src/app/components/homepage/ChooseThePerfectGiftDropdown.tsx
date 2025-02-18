'use client';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '../../../ui/components/ui/select';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { FilterType } from '@repo/ui/enums';
import { Checkbox } from '../../../ui/components/ui/checkbox';
import { setProductFilters } from '@repo/ui/lib/features/filterSlice';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { IFilterClient } from '@repo/ui/types';
import { ChevronDown } from 'lucide-react';

const ChooseThePerfectGiftDropdown = ({
  label,
  filterType,
  className,
  textColor,
  setSavedFilters,
}: {
  label: string;
  filterType: FilterType;
  className?: ClassNameValue;
  textColor?: string;
  setSavedFilters: (filterState: IFilterClient) => void;
}) => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filter.filter);

  const [open, setOpen] = useState(false);
  const [localFilterState, setLocalFilterState] = useState(filterState);

  useEffect(() => {
    setLocalFilterState(filterState);
  }, [filterState]);

  const handleOptionClick = (option: any, value: boolean) => {
    const currentOptions = localFilterState[`${filterType}`].map((a) =>
      a.id === option.id ? { ...a, isSelected: value } : a,
    );
    const filtersObject = {
      ...localFilterState,
      [`${filterType}`]: currentOptions,
    };
    setSavedFilters(filtersObject);
    setLocalFilterState(filtersObject);
  };

  return (
    <Select onOpenChange={setOpen}>
      <SelectTrigger
        arrows={false}
        className={twMerge(
          `shadow-md my-2 h-12 bg-white rounded-full text-lg`,
          className,
        )}
      >
        <p className="font-heyComic" onClick={() => setOpen(!open)}>
          {label}
        </p>

        <ChevronDown
          className={`h-4 w-4 opacity-50 ${open ? 'rotate-180 transition transition-all' : ''}`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {localFilterState[`${filterType}`]?.map((a) => (
            <section
              key={a.id}
              className="flex cursor-pointer py-2 sm:py-2 items-center "
              onClick={() => {
                handleOptionClick(a, !a.isSelected);
              }}
            >
              <Checkbox
                checked={a.isSelected}
                className={`border-2 w-5 h-5  mx-2 font-bold ${textColor}`}
              />
              <label
                className={`font-helveticaRoundedBold text-md cursor-pointer sm:text-md ${textColor}`}
              >
                {a.name}
              </label>
            </section>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChooseThePerfectGiftDropdown;
