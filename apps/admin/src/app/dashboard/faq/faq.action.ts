'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { IFaqRequestPayload } from '@repo/ui/types/faq';
import { parseError } from '../../lib/error-utils';

export async function deleteFaq(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.faq}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.faq}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createFaq(payload: IFaqRequestPayload) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.faq}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.faq}`);
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function editFaq({
  id,
  payload,
}: {
  id: number;
  payload: IFaqRequestPayload;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.faq}/${id}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.faq}`);
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
