'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../ui/components/ui/button';
import { Checkbox } from '../../../ui/components/ui/checkbox';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { useAppSelector } from '../../../lib/hooks';

interface Option {
  id: number;
  isSelected: boolean;
  name: string;
  value: any;
}

interface DropdownProps<T extends Option> {
  multiSelect?: boolean;
  color: string;
  placeholder: string;
  textColor: string;
  rightAligned?: boolean;
  onChange?: (value: T[]) => void;
  initialState: T[];
  className?: ClassNameValue;
  fullWidth?: boolean;
}

const Dropdown = <T extends Option>({
  multiSelect = true,
  placeholder,
  color,
  rightAligned = false,
  onChange,
  initialState,
  textColor,
  className = '',
  fullWidth = false,
}: DropdownProps<T>) => {
  const { filter: filterState } = useAppSelector((state) => state.filter);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(initialState);
  const [singleSelectLabel, setSingleSelectLabel] =
    useState<string>(placeholder);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleOptionClick = (option: T, value: boolean) => {
    const currentOptions = options.map((a) =>
      a.id === option.id
        ? { ...a, isSelected: value }
        : multiSelect
          ? a
          : { ...a, isSelected: false },
    );
    if (!multiSelect) {
      const selectedOption = currentOptions.find((a) => a.isSelected);
      if (selectedOption) {
        setSingleSelectLabel(selectedOption.name);
      } else {
        setSingleSelectLabel(placeholder);
      }
    }
    setOptions(currentOptions);
    onChange?.(currentOptions);
  };

  useEffect(() => {
    setOptions(initialState);
  }, [initialState]);

  useEffect(() => {
    const selectedCommonFilter = filterState.common.find((a) => a.isSelected);
    if (selectedCommonFilter && !multiSelect) {
      setSingleSelectLabel(selectedCommonFilter.name);
    } else {
      if (!multiSelect) {
        setSingleSelectLabel('Featured');
      }
    }
  }, [filterState]);

  return (
    <div
      className={`relative flex justify-center font-heyComic z-20 ${fullWidth && 'md:w-full'} `}
      ref={dropdownRef}
    >
      <Button
        onClick={handleToggle}
        className={twMerge(
          `text-white md:w-full justify-between hover:${color} ${color} font-medium rounded-full ${open ? `rounded-3xl rounded-bl-none rounded-br-none` : ''} sm:py-2.5 text-center inline-flex items-center shadow-b-0 text-sm sm:text-lg`,
          className,
        )}
        type="button"
      >
        <p
          className={`text-nowrap ${singleSelectLabel.length > 12 ? ' text-[12px] sm:text-[14px]' : 'text-md'}`}
        >
          {singleSelectLabel}
        </p>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </Button>

      {open && (
        <div
          id="dropdown"
          className={`absolute py-3 min-w-44 sm:min-w-48 top-10 px-2 ${fullWidth && 'md:w-full'}  ${color} ${rightAligned ? 'right-0' : 'left-0'} text-white mt-0 z-10 rounded-3xl ${rightAligned ? 'rounded-tr-none' : 'rounded-tl-none'} shadow`}
        >
          {options?.map((a) => (
            <section
              key={a.id}
              onClick={() => {
                handleOptionClick(a, a.isSelected ? false : true);
              }}
              className="flex py-2 sm:py-2 cursor-pointer items-center"
            >
              <Checkbox
                onCheckedChange={(value: boolean) => {}}
                checked={a.isSelected}
                className={`${textColor} border-2 sm:w-5 sm:h-5 mx-2 font-bold`}
              />
              <label
                className={`font-heyComic text-xs sm:text-base ${textColor} `}
              >
                {a.name}
              </label>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
