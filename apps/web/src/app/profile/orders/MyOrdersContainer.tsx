'use client';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '../../../ui/components/ui/select';
import { Checkbox } from '../../../ui/components/ui/checkbox';
import { IOrder } from '@repo/ui/types/order';
import MyOrderCardClient from './MyOrderCardClient';
import { profileRoutes } from '@repo/ui/lib';
import { useRouter } from 'next/navigation';
import {
  formatDate,
  last30Days,
  last3Months,
  last6Months,
} from '../../../utils/helper';
import { Button } from '../../../ui/components/ui/button';

interface IFilterOption {
  id: number;
  name: string;
  value: string;
  isSelected: boolean;
}

const filterOptions = [
  {
    id: 0,
    name: 'last 30 days',
    value: 'last 30 days',
    isSelected: false,
  },
  {
    id: 1,
    name: 'last 3 months',
    value: 'last 3 months',
    isSelected: false,
  },
  {
    id: 2,
    name: 'last 6 months',
    value: 'last 6 months',
    isSelected: false,
  },
];

const orderStatusOptions = [
  {
    id: 0,
    name: 'Pending Payment',
    value: 'PAYMENT_PENDING',
    isSelected: false,
  },
  {
    id: 1,
    name: 'Paid',
    value: 'PAID',
    isSelected: false,
  },
  {
    id: 2,
    name: 'Cancelled',
    value: 'CANCELLED',
    isSelected: false,
  },
  {
    id: 3,
    name: 'Refunded',
    value: 'REFUNDED',
    isSelected: false,
  },
  {
    id: 4,
    name: 'Expired',
    value: 'EXPIRED',
    isSelected: false,
  },
];

const MyOrdersContainer = ({
  meta,
  links,
  productsMap,
  orders,
}: {
  meta: any;
  links: { [key: string]: string };
  productsMap: any;
  orders: IOrder[];
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<IFilterOption[]>(filterOptions);
  const [selectedFilter, setSelectedFilter] = useState<IFilterOption>(
    filterOptions[0],
  );

  const [startDate, setStartDate] = useState(last30Days());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const endDate = formatDate(tomorrow);

  const handleGetOrders = () => {
    let url = `${profileRoutes.myOrder}?page=${currentPage}`;
    if (selectedFilter) {
      url += `&startDate=${startDate}&endDate=${endDate}&limit=10`;
    }
    router.push(url);
  };

  useEffect(() => {
    handleGetOrders();
  }, [startDate]);

  const handleFilterClick = (a: IFilterOption, value: boolean) => {
    const updatedFilters = filters.map((filter) => {
      if (value) {
        setSelectedFilter(a);
        if (a.name == 'last 30 days') {
          setStartDate(last30Days());
        }
        if (a.name == 'last 3 months') {
          setStartDate(last3Months());
        }
        if (a.name == 'last 6 months') {
          setStartDate(last6Months());
        }
      }
      return {
        ...filter,
        isSelected: a.id == filter.id ? value : false,
      };
    });
    setFilters(updatedFilters);
  };

  return (
    <div className="md:px-[10%] flex-col-reverse justify-between xs:justify-between gap-4 items-center ">
      <div className="flex items-center w-[90%] xs:justify-start justify-between gap-4 mb-2">
        <p className="text-primary-black text-md xs:text-2xl font-heyComic">
          Orders placed in
        </p>

        <Select>
          <SelectTrigger
            className={`shadow-md my-2 h-12 w-44 bg-primary-color text-white rounded-full text-lg`}
          >
            <p className="font-helveticaRoundedBold text-xs sm:text-lg">
              {selectedFilter.name}
            </p>
          </SelectTrigger>
          <SelectContent className="bg-primary-color text-white">
            <SelectGroup>
              {filters?.map((a) => (
                <section
                  onClick={() => {
                    const isFilterSelected = a.isSelected;
                    handleFilterClick(a, !isFilterSelected);
                  }}
                  key={a.id}
                  className="flex py-2 sm:py-2 cursor-pointer items-center "
                >
                  <Checkbox
                    checked={a.isSelected}
                    className={`border-2 sm:w-5 sm:h-5  mx-2 font-bold`}
                  />
                  <label
                    className={`font-helveticaRoundedBold text-md sm:text-md`}
                  >
                    {a.name}
                  </label>
                </section>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col">
        {orders.map((a) => (
          <MyOrderCardClient order={a} key={a.id} productsMap={productsMap} />
        ))}
      </div>

      <div className="flex w-full justify-end gap-3 my-2">
        <Button
          className="bg-secondary-color cursor-pointer rounded-full p-2 h-10 w-10 text-3xl justify-center items-center text-white"
          disabled={links.previous == ''}
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4L7.3357 12.0096L16 19.2813"
              stroke="#BDBDBD"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
        <Button
          className="bg-secondary-color cursor-pointer rotate-180 rounded-full p-2 h-10 w-10 text-3xl text-white"
          disabled={meta.totalPages == 0 || meta.currentPage == meta.totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4L7.3357 12.0096L16 19.2813"
              stroke="#BDBDBD"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default MyOrdersContainer;
