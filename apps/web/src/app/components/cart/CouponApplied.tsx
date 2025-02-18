'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { resetCouponApplied } from '@repo/ui/lib/features/cartSlice';

const CouponApplied = () => {
  const dispatch = useAppDispatch();
  const { isCouponApplied, coupon } = useAppSelector((state) => state.cart);

  if (isCouponApplied) {
    return (
      <section className="items-center text-sm font-heyComic justify-between flex mx-3 mb-2">
        <p>Coupon : </p>

        <p className="text-tertiary-green text-sm font-helveticaRoundedBold">
          {coupon}
          <span
            onClick={() => {
              dispatch(resetCouponApplied());
            }}
            className="ml-2 text-lg text-tertiary-red cursor-pointer"
          >
            x
          </span>
        </p>
      </section>
    );
  }

  return <></>;
};

export default CouponApplied;
