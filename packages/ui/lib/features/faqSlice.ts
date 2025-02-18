import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IFaq, IFaqCategory } from '../../types/faq';

const initialState: { faqCategories: IFaqCategory[] } = {
  faqCategories: [],
};

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    reset: (state) => {
      state.faqCategories = [];
    },
    setFaqCategories: (state, action: PayloadAction<IFaqCategory[]>) => {
      state.faqCategories = action.payload;
    },
  },
});

export const { setFaqCategories, reset } = faqSlice.actions;

export default faqSlice.reducer;
