'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { parseError } from '../../lib/error-utils';

export async function deleteFeedback(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.feedback}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.feedback}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}