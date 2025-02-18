'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CustomDialog from '../common/CustomDialog';
import FilterModal from './FilterMobileScreen';
import { ICONS } from '@repo/ui/lib';
import Dropdown from './Dropdown';
import { IFilterClient, IProduct } from '@repo/ui/types';
import ProductSelectedFilterView from './ProductSelectedFilterView';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { setProductFilters } from '@repo/ui/lib/features/filterSlice';
import { getFilteredProducts, IsFiltersSelected } from './filter.utils';

interface IProductFilterProps {
  refreshFilters?: boolean;
  filterData: IFilterClient;
  setProducts: (values: IProduct[]) => void;
  products: IProduct[];
}

const ProductFilter = ({
  refreshFilters,
  filterData,
  setProducts,
  products,
}: IProductFilterProps) => {
  const dispatch = useAppDispatch();

  const { filter: filterState, filtersAvailable } = useAppSelector(
    (state) => state.filter,
  );

  const [filter, setFilter] = useState(false);

  const setFilterState = (value: IFilterClient) => {
    dispatch(setProductFilters(value));
  };

  const handleOnClick = (e: any) => {
    setFilter(true);
  };

  useEffect(() => {
    if (!IsFiltersSelected(filterState, true)) {
      // Reset
      setProducts(products);
    }
  }, [filterState]);

  useEffect(() => {
    if (IsFiltersSelected(filterState, true)) {
      // filter the products
      const filteredProducts: IProduct[] = getFilteredProducts(
        filterState,
        products,
      );
      setProducts(filteredProducts);
    }
  }, [filterState]);

  useEffect(() => {
    if (!filtersAvailable || refreshFilters) {
      dispatch(setProductFilters(filterData));
    }
  }, [filtersAvailable]);

  return (
    <>
      <section className="hidden text-3xl px-[5%] text-primary-black font-heyComic w-full mx-auto md:flex justify-between">
        <p>Filter by</p>
        <p>Sort by</p>
      </section>

      <div className="w-full mx-auto px-[5%] flex flex-row-reverse justify-between pt-4">
        <div className=" sm:w-auto flex gap-2 items-center">
          <p className="font-heyComic md:hidden xs:text-xl">Sort by</p>
          <Dropdown
            multiSelect={false}
            className="w-32 sm:text-[22px] mt-1 h-auto sm:py-3.5 sm:px-4"
            rightAligned={true}
            color="bg-primary-color"
            placeholder="Featured"
            textColor="text-white border-white"
            initialState={filterState.common}
            onChange={(value) => {
              setFilterState({ ...filterState, common: value });
            }}
          />
        </div>

        <div className="md:flex gap-3 hidden">
          <Dropdown
            className="sm:text-[22px] md:gap-6 gap-2 h-auto sm:py-3.5 sm:px-4"
            color="bg-primary-color"
            placeholder="Age"
            textColor="text-white border-white"
            initialState={filterState.ages.map((a) => {
              return {
                id: a.id,
                isSelected: a.isSelected,
                name: a.name,
                value: a.name,
              };
            })}
            onChange={(value: any[]) => {
              setFilterState({ ...filterState, ages: value });
            }}
          />

          <Dropdown
            className="sm:text-[22px] h-auto sm:py-3.5 sm:px-4"
            color="bg-tertiary-red"
            placeholder="Category"
            textColor="text-white border-white"
            initialState={filterState.categories.map((a) => {
              return {
                id: a.id,
                isSelected: a.isSelected,
                name: a.name,
                value: a.name,
              };
            })}
            onChange={(value: any[]) => {
              setFilterState({ ...filterState, categories: value });
            }}
          />

          <Dropdown
            className="sm:text-[22px] h-auto sm:py-3.5 sm:px-4"
            color="bg-secondary-color"
            placeholder="Interest"
            textColor="text-white border-white"
            initialState={filterState.interests.map((a) => {
              return {
                id: a.id,
                isSelected: a.isSelected,
                name: a.name,
                value: a.name,
              };
            })}
            onChange={(value: any[]) => {
              setFilterState({ ...filterState, interests: value });
            }}
          />

          <Dropdown
            className="sm:text-[22px] h-auto sm:py-3.5 sm:px-4"
            color="bg-tertiary-green"
            placeholder="Price"
            textColor="text-white border-white"
            initialState={filterState.prices}
            onChange={(value) => {
              setFilterState({ ...filterState, prices: value });
            }}
          />
        </div>

        <section
          className="md:hidden bg-white flex gap-2 items-center text-2xl"
          onClick={handleOnClick}
        >
          <Image
            src={ICONS.filterIcon}
            alt="Filter Icon"
            width={30}
            height={30}
          />
          <span className="font-heyComic text-[17px] xs:text-xl">Filters</span>
        </section>

        <CustomDialog
          className="h-screen md:h-[537px] w-screen md:w-[946px]"
          Component={
            <FilterModal
              data={filterState}
              onClose={() => {
                setFilter(false);
              }}
            />
          }
          open={filter}
        />
      </div>

      <ProductSelectedFilterView data={filterState} />
    </>
  );
};

export default ProductFilter;
