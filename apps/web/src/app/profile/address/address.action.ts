'use server';

import { endpoints, profileRoutes } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { IAddress } from '@repo/ui/types/address';
import { parseError } from '../../../utils/error-utils';
import { revalidatePath } from 'next/cache';

export async function removeAddress(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.address}/${id}`,
    });
    revalidatePath(profileRoutes.address, 'page');
    return {
      success: true,
      message: 'Removed Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function setAsDefault(id: number) {
  try {
    await ax({
      method: 'patch',
      url: `${endpoints.address}/${id}/set-default`,
    });
    revalidatePath(profileRoutes.address);
    return {
      success: true,
      message: 'Default address set successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function updateAddress(id: number, payload: Partial<IAddress>) {

  try {
    await ax({
      method: 'put',
      url: `${endpoints.address}/${id}`,
      data: payload,
    });
    revalidatePath(profileRoutes.address);
    return {
      success: true,
      message: 'Address updated successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function getUserAddress() {

  try {
    const res = await ax({
      method: 'get',
      url: `${endpoints.address}`,
    });
    return {
      data: res.data,
      success: true,
      message: 'Address retrieved successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function addAddress(payload: IAddress) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.address}`,
      data: payload,
    });
    revalidatePath(profileRoutes.address);
    return {
      success: true,
      message: 'Address added successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
