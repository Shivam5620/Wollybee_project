'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { ICouponRequestBody } from '@repo/ui/types/coupon';
import { parseError } from '../../lib/error-utils';

export async function deleteCoupon(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.coupon}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.coupon}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createCoupon(payload: ICouponRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.coupon}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.coupon}`);
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function editCoupon({
  id,
  payload,
}: {
  id: number;
  payload: Partial<ICouponRequestBody>;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.coupon}/${id}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.coupon}`);
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
