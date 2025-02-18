'use server';

import { endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { ICreateProductCategoryRequestBody, IProductCategory } from '@repo/ui/types';
import { parseError } from '../../lib/error-utils';

export async function deleteProductCategory(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.productCategory}/${id}`,
    });
    revalidatePath('/dashboard/product-category');
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createProductCategory(payload: ICreateProductCategoryRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.productCategory}`,
      data: payload,
    });
    revalidatePath('/dashboard/product-category');
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function editProductCategory({
  id,
  payload,
}: {
  id: number;
  payload: Partial<IProductCategory>;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.productCategory}/${id}`,
      data: payload,
    });
    revalidatePath('/dashboard/product-category');
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
