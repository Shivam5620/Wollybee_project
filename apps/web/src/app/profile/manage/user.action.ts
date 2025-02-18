'use server';

import { endpoints, profileRoutes } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { parseError } from '../../../utils/error-utils';
import { IUserClient } from '@repo/ui/types';

export async function updateProfile(id: number, payload: Partial<IUserClient>) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.user}/${id}`,
      data: payload,
    });
    revalidatePath(`${profileRoutes.manageProfile}`);
    return {
      success: true,
      message: 'User details updated successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
