'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { parseError } from '../../lib/error-utils';

export async function deleteFaqCategory(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.faqCategory}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.faqCategory}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createFaqCategory(payload: {
  name: string;
  imageKey: string;
  imageUrl: string;
}) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.faqCategory}`,
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

export async function editFaqCategory({
  id,
  name,
  imageUrl,
  imageKey,
}: {
  id: number;
  name: string;
  imageUrl: string;
  imageKey: string;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.faqCategory}/${id}`,
      data: {
        name,
        imageUrl,
        imageKey,
      },
    });
    revalidatePath(`${dashboardRoutes.faqCategory}`);
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
