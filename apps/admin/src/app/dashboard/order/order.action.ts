'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { parseError } from '../../lib/error-utils';

export async function updateOrder(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.order}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.order}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}