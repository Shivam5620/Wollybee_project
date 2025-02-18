'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { IProductRequestBody } from '@repo/ui/types';
import { parseError } from '../../lib/error-utils';

export async function deleteProduct(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.product}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.products}`);
    revalidatePath(`${dashboardRoutes.products}/${id}`);
    revalidatePath(`${dashboardRoutes.products}/edit/${id}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
export async function createProduct(payload: IProductRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.product}`,
      data: payload,
    });
    revalidatePath(dashboardRoutes.products);
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function editProduct({
  id,
  payload,
}: {
  id: number;
  payload: Partial<IProductRequestBody>;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.product}/${id}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.products}`);
    revalidatePath(`${dashboardRoutes.products}/${id}`);
    revalidatePath(`${dashboardRoutes.products}/edit/${id}`);
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    console.log(err);
    return await parseError(err);
  }
}
