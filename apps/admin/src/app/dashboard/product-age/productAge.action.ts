'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { ICreateProductAgeRequestBody } from '@repo/ui/types';
import { parseError } from '../../lib/error-utils';

export async function deleteProductAge(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.productAge}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.productAges}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createProductAge(payload: ICreateProductAgeRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.productAge}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.productAges}`);
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function editProductAge({
  id,
  payload,
}: {
  id: number;
  payload: ICreateProductAgeRequestBody;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.productAge}/${id}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.productAges}`);
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
