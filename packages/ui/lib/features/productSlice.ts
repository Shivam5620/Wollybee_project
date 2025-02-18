import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../types';

const initialState: {
  products: IProduct[];
  productsAvailable: boolean;
  product: IProduct | null;
  accordionLocation: number;
} = {
  products: [],
  productsAvailable: false,
  product: null,
  accordionLocation: 20,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      state.productsAvailable = true;
    },
    setAccordionLocation: (state, action: PayloadAction<number>) => {
      state.accordionLocation = action.payload;
    },
    resetProducts: (state) => {
      state.products = [];
      state.productsAvailable = false;
    },
  },
});

export const { setProducts, resetProducts, setProduct, setAccordionLocation } = productSlice.actions;

export default productSlice.reducer;
