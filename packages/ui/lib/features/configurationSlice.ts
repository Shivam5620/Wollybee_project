import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBanner, IProduct } from '../../types';
import { ICouponResponse } from '../../types/coupon';
import { IConfigurationResponse } from '../../types/configuration';
import { CONFIGURATIONS } from '../constants';
import { ConfigurationType } from '../../enums/configuration';

interface configurationState {
  banners: IBanner[];
  products: IProduct[];
  dealOfTheDayProducts: IProduct[];
  coupons: ICouponResponse[];
  configurations: IConfigurationResponse[];
  shippingCharges: number;
  codCharges: number;
  freeShippingCartValue: number;
  feedbackOptions: string[];
  advertisementBannerArrayItems: string[];
}

const initialState: configurationState = {
  banners: [],
  products: [],
  dealOfTheDayProducts: [],
  coupons: [],
  configurations: [],
  shippingCharges: 50,
  freeShippingCartValue: 499,
  feedbackOptions: [],
  advertisementBannerArrayItems: [
    'Discover Fun & Learning Toys for Your Little Ones!',
    "Brighten Your Child's Day with Our Special Deals!",
    'Join the Adventure: Explore Our New Arrivals for Kids!',
  ],
  codCharges: 70,
};

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<IBanner[]>) => {
      state.banners = action.payload;
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setDealOfTheDay: (state, action: PayloadAction<IProduct[]>) => {
      state.dealOfTheDayProducts = action.payload;
    },
    setCoupons: (state, action: PayloadAction<ICouponResponse[]>) => {
      state.coupons = action.payload;
    },
    setConfigurations: (
      state,
      action: PayloadAction<IConfigurationResponse[]>,
    ) => {
      const feedbackOptions = action.payload.find(
        (a) => a.key === CONFIGURATIONS.FEEDBACK_OPTIONS,
      );
      const shippingChargesFromConfiguration = action.payload.find(
        (a) => a.key === CONFIGURATIONS.SHIPPING_PRICE,
      );
      const codChargesFromConfiguration = action.payload.find(
        (a) => a.key === CONFIGURATIONS.CASH_ON_DELIVERY_CHARGES,
      );
      const freeShippingCartValueFromConfiguration = action.payload.find(
        (a) => a.key === CONFIGURATIONS.FREE_SHIPPING_CART_VALUE,
      );
      const advertisementBannerArray = action.payload.find(
        (a) => a.key === CONFIGURATIONS.ADVERTISEMENT_BANNER_HOMEPAGE,
      );
      if (shippingChargesFromConfiguration) {
        state.shippingCharges = parseInt(
          shippingChargesFromConfiguration.value,
        );
      }
      if (freeShippingCartValueFromConfiguration) {
        state.freeShippingCartValue = parseInt(
          freeShippingCartValueFromConfiguration.value,
        );
      }
      if (codChargesFromConfiguration) {
        state.codCharges = parseInt(codChargesFromConfiguration.value);
      }
      if (
        feedbackOptions &&
        feedbackOptions.type === ConfigurationType.STRING_ARRAY
      ) {
        state.feedbackOptions = JSON.parse(feedbackOptions.value);
      }

      if (
        advertisementBannerArray &&
        advertisementBannerArray.type === ConfigurationType.STRING_ARRAY
      ) {
        state.advertisementBannerArrayItems = JSON.parse(
          advertisementBannerArray.value,
        );
      }

      state.configurations = action.payload;
    },
    reset: (state) => {
      state.banners = [];
      state.products = [];
      state.dealOfTheDayProducts = [];
      state.dealOfTheDayProducts = [];
      state.coupons = [];
      state.configurations = [];
      state.shippingCharges = 50;
      state.freeShippingCartValue = 499;
      state.feedbackOptions = [];
      state.advertisementBannerArrayItems = [
        'Discover Fun & Learning Toys for Your Little Ones!',
        "Brighten Your Child's Day with Our Special Deals!",
        'Join the Adventure: Explore Our New Arrivals for Kids!',
      ];
    },
  },
});

export const {
  setBanners,
  reset,
  setCoupons,
  setProducts,
  setDealOfTheDay,
  setConfigurations,
} = configurationSlice.actions;

export default configurationSlice.reducer;
