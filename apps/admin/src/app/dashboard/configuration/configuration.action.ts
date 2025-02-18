'use server';

import { IConfiguration } from '@repo/ui/types/configuration';
import ax from '../../lib/axios';
import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import { revalidatePath } from 'next/cache';
import { parseError } from '../../lib/error-utils';

export async function updateConfiguration({
  id,
  payload,
}: {
  id: number;
  payload: IConfiguration;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.configuration}/${id}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.configuration}`);
    return {
      success: true,
      message: 'Configuration Updated Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
