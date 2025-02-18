'use server';

import { dashboardRoutes, endpoints } from '@repo/ui/lib';
import ax from '../../lib/axios';
import { revalidatePath } from 'next/cache';
import { ICreateRoleRequestBody } from '@repo/ui/types';
import { parseError } from '../../lib/error-utils';

export async function deleteRole(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.role}/${id}`,
    });
    revalidatePath(`${dashboardRoutes.roles}`);
    revalidatePath(`${dashboardRoutes.roles}/${id}`);
    revalidatePath(`${dashboardRoutes.roles}/edit/${id}`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function createRole(payload: ICreateRoleRequestBody) {
  try {
    await ax({
      method: 'post',
      url: `${endpoints.role}`,
      data: payload,
    });
    revalidatePath('${dashboardRoutes.roles}');
    return {
      success: true,
      message: 'Created Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}

export async function editRole({
  id,
  payload,
}: {
  id: number;
  payload: ICreateRoleRequestBody;
}) {
  try {
    await ax({
      method: 'put',
      url: `${endpoints.role}/${id}`,
      data: payload,
    });
    revalidatePath(`${dashboardRoutes.roles}`);
    revalidatePath(`${dashboardRoutes.roles}/${id}`);
    revalidatePath(`${dashboardRoutes.roles}/edit/${id}`);
    return {
      success: true,
      message: 'Edited Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}
