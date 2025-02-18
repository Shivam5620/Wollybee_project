'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { IBannerRequestBody } from '@repo/ui/types';
import { parseError } from '../../lib/error-utils';

export async function deleteBanner(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.banner}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.banner}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createBanner(payload: IBannerRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.banner}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.banner}`);
    revalidatePath(`${dashboardRoutes.banner}/create`);
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
