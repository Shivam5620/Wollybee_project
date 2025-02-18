'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '../../../ui/components/ui/select';
import { Checkbox } from '../../../ui/components/ui/checkbox';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { IProductReviewFilterOption } from '@repo/ui/types';

const SortReviewDropDown = ({
  label,
  className,
  filterOptions,
  setFilterOptions,
}: {
  label: string;
  className?: ClassNameValue;
  filterOptions: IProductReviewFilterOption[];
  setFilterOptions: (values: IProductReviewFilterOption[]) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOptionClick = (id: number, value: boolean) => {
    const updatedFilterOptions = filterOptions.map((a) => {
      if (a.id == id) {
        return {
          ...a,
          isSelected: value,
        };
      }
      return { ...a, isSelected: false };
    });
    setFilterOptions(updatedFilterOptions);
  };

  return (
    <Select>
      <SelectTrigger
        className={twMerge(
          `shadow-md my-2 h-12 bg-white rounded-full text-lg`,
          className,
        )}
      >
        <p
          className="font-heyComic text-secondary-color"
          onClick={() => setOpen(!open)}
        >
          {label}
        </p>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filterOptions?.map((a) => (
            <section className="flex py-2 sm:py-2 cursor-pointer items-center">
              <Checkbox
                onCheckedChange={(value: boolean) => {
                  handleOptionClick(a.id, value);
                }}
                checked={a.isSelected}
                className={`border-2 sm:w-5 sm:h-5 border-primary-gray mx-2 font-bold`}
              />
              <label className="font-helveticaRoundedBold text-md sm:text-md text-secondary-color">
                {a.name}
              </label>
            </section>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortReviewDropDown;
