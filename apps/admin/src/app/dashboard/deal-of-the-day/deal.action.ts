'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { IDealOfTheDayRequestBody } from '@repo/ui/types/dealOfTheDay';
import { parseError } from '../../lib/error-utils';

export async function deleteDeal(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.dealOfTheDay}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.dealOfTheDay}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createDeal(payload : IDealOfTheDayRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.dealOfTheDay}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.dealOfTheDay}`);
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function updateDeal(id : number, payload : IDealOfTheDayRequestBody) {
    try {
      await ax({
        method: 'put',
        url: `${endpoints.dealOfTheDay}/${id}`,
        data: payload,
      });
      revalidatePath(`${dashboardRoutes.dealOfTheDay}`);
      return {
        success: true,
        message: 'Created Successfully',
      };
    } catch (err) {
      return await parseError(err);
    }
  }
