'use server';

import { endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { parseError } from '../../../utils/error-utils';

export async function getProducts() {
  try {
    const res = await ax({
      method: 'get',
      url: `${endpoints.product}`,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return await parseError(err);
  }
}