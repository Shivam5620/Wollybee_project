import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBanner } from '../../types';

const initialState: { banners: IBanner[] } = {
  banners: [],
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<IBanner[]>) => {
      state.banners = action.payload;
    },
    resetBanners: (state) => {
      state.banners = [];
    },
  },
});

export const { setBanners, resetBanners } = bannerSlice.actions;

export default bannerSlice.reducer;
