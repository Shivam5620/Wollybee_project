import { configureStore } from '@reduxjs/toolkit';
import bannerSlice from '@repo/ui/lib/features/bannerSlice';
import filterSlice from '@repo/ui/lib/features/filterSlice';
import productSlice from '@repo/ui/lib/features/productSlice';
import cartSlice from '@repo/ui/lib/features/cartSlice';
import configurationSlice from '@repo/ui/lib/features/configurationSlice';
import faqSlice from '@repo/ui/lib/features/faqSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      faq: faqSlice,
      filter: filterSlice,
      product: productSlice,
      banner: bannerSlice,
      cart: cartSlice,
      configuration: configurationSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
