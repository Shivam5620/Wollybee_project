'use server';
import { dashboardRoutes, endpoints } from '@repo/ui/lib/constants';
import { revalidatePath } from 'next/cache';
import { ProductReviewStatus } from '@repo/ui/enums/productReview';
import ax from '../../lib/axios';
import { parseError } from '../../lib/error-utils';

export async function updateReviewStatus({
  id,
  status,
}: {
  id: number;
  status: ProductReviewStatus;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.productReview}/${id}`,
      data: {
        status,
      },
    });
    revalidatePath(`${dashboardRoutes.reviews}`);
    return {
      success: true,
      message: 'Review Updated Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function deleteReview({ id }: { id: number }) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.productReview}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.reviews}`);
    return {
      success: true,
      message: 'Review deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
