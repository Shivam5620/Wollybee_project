'use server';

import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { IUserClient } from '@repo/ui/types';
import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import { parseError } from '../../lib/error-utils';

export async function deleteUser(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.user}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.user}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createUser(payload: IUserClient) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.user}`,
      data: payload,
    });
    revalidatePath(dashboardRoutes.user);
    return {
      success: true,
      message: 'User Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function updateUser(id: number, payload: Partial<IUserClient>) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.user}/${id}`,
      data: payload,
    });
    revalidatePath(dashboardRoutes.user);
    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
