import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterClient } from '../../types';

const initialState: { filter: IFilterClient; filtersAvailable: boolean } = {
  filter: {
    categories: [],
    interests: [],
    ages: [],
    prices: [
      {
        id: 0,
        name: '0 - 1000',
        value: {
          min: 0,
          max: 1000,
        },
        isSelected: false,
      },
    ],
    common: [
      {
        id: 0,
        name: 'Best Sellers',
        value: 'Best Sellers',
        isSelected: false,
      },
      {
        id: 1,
        name: 'Price High to Low',
        value: 'Price High to Low',
        isSelected: false,
      },
      {
        id: 2,
        name: 'Price Low to High',
        value: 'Price Low to High',
        isSelected: false,
      },
      {
        id: 3,
        name: 'Most Rated',
        value: 'Most Rated',
        isSelected: false,
      },
      {
        id: 4,
        name: 'New Arrivals',
        value: 'New Arrivals',
        isSelected: false,
      },
    ],
  },
  filtersAvailable: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setProductFilters: (state, action: PayloadAction<IFilterClient>) => {
      state.filter = action.payload;
      state.filtersAvailable = true;
    },
    resetAllProductFilters: (state) => {
      state.filter = initialState.filter;
    },
  },
});

export const { setProductFilters, resetAllProductFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
