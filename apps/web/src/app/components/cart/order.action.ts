'use server';

import { endpoints } from '@repo/ui/lib';
import {
  IOrder,
  IOrderRequestBody,
  IPaymentPayload,
} from '@repo/ui/types/order';
import ax from '../../lib/axios';
import { parseError } from '../../../utils/error-utils';

export async function createOrder(payload: IOrderRequestBody) {
  try {
    const res = await ax({
      method: 'post',
      url: `${endpoints.order}`,
      data: payload,
    });
    return {
      success: true,
      message: 'Order Placed Successfully',
      data: res.data,
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function handlePayment(order: IPaymentPayload) {
  try {
    const response = await ax({
      method: 'post',
      url: `${endpoints.payment}`,
      data: order,
    });

    return {
      success: true,
      message: 'Payment Initiated Successfully',
      data: response.data,
    };
  } catch (err) {
    return await parseError(err);
  }
}
