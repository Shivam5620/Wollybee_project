'use server';

import { endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { ICartItemRequestBody } from '@repo/ui/types';
import { IFeedbackRequestBody } from '@repo/ui/types/feedback';
import { parseError } from '../../../utils/error-utils';

export async function deleteCartItem(productId: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.cartItem}/${productId}`,
    });
    return {
      success: true,
      message: 'Removed Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function deleteCart() {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.cartItem}`,
    });
    return {
      success: true,
      message: 'Removed Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function addCartItem(payload: Omit<ICartItemRequestBody, 'id'>) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.cartItem}`,
      data: payload,
    });
    return {
      success: true,
      message: 'Added to Basket',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function getCartItems() {
  try {
    const res = await ax({
      method: 'get',
      url: `${endpoints.cartItem}`,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function bulkAddCartItem(
  payload: Omit<ICartItemRequestBody, 'id'>[],
) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.cartItem}/bulk`,
      data: {
        items: payload,
      },
    });
    return {
      success: true,
      message: 'Items added to basket',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createFeedback(payload: IFeedbackRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.feedback}`,
      data: payload,
    });
    return {
      success: true,
      message: 'Feedback given Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
