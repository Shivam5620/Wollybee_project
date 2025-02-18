'use server';

import { endpoints } from '@repo/ui/lib';
import ax from './axios';
import { AxiosError } from 'axios';

export interface IValidateCoupon {
  items: {
    productId: number;
    quantity: number;
  }[];
  coupon: string;
}

export async function validateCoupon(payload: IValidateCoupon) {
  try {
    const res = await ax({
      method: 'post',
      url: `${endpoints.coupon}/validate`,
      data: payload,
    });
    return {
      success: true,
      data: { ...res.data, coupon: payload.coupon },
      message: 'Coupon Applied',
    };
  } catch (err) {
    // Default message for unknown errors
    const axiosError = err as AxiosError;

    // Check if the error has a response
    const errorMessage = axiosError.response?.data || 'Invalid Coupon';

    return { error: { message: JSON.stringify(errorMessage) } };
  }
}
