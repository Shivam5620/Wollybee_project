'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { ICreateProductInterestRequestBody } from '@repo/ui/types';
import { parseError } from '../../lib/error-utils';

export async function deleteProductInterest(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.productInterest}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.productInterests}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createProductInterest(payload: ICreateProductInterestRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.productInterest}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.productInterests}`);
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function editProductInterest({
  id,
  payload,
}: {
  id: number;
  payload: ICreateProductInterestRequestBody;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.productInterest}/${id}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.productInterests}`);
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
