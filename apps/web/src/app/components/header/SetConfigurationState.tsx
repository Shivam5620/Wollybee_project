'use client';
import { IBanner, IProduct } from '@repo/ui/types';
import { IConfigurationResponse } from '@repo/ui/types/configuration';
import { ICouponResponse } from '@repo/ui/types/coupon';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../lib/hooks';
import { setBanners, setConfigurations, setCoupons, setDealOfTheDay, setProducts } from '@repo/ui/lib/features/configurationSlice';

interface ISetConfigurationState {
    banners: IBanner[];
    products: IProduct[];
    dealOfTheDayProducts: IProduct[];
    coupons: ICouponResponse[];
    configurations: IConfigurationResponse[];
}

const SetConfigurationState = ({
  banners,
  products,
  dealOfTheDayProducts,
  coupons,
  configurations,
}: ISetConfigurationState) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBanners(banners));
    dispatch(setProducts(products));
    dispatch(setDealOfTheDay(dealOfTheDayProducts));
    dispatch(setCoupons(coupons));
    dispatch(setConfigurations(configurations));
  }, [banners, products, dealOfTheDayProducts, coupons, configurations]);

  return (
    <></>
  );
};

export default SetConfigurationState;
