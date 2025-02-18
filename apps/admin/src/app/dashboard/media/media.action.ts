'use server'

import { dashboardRoutes, endpoints } from "@repo/ui/lib";
import { revalidatePath } from "next/cache";
import axios from "axios";
import ax from "../../lib/axios";
import { parseError } from "../../lib/error-utils";

export async function uploadFile(formData: FormData) {
    try {
      // setting content-type here as ax client might override it to application/json
      await axios.post(`${process.env.BACKEND_URL}${endpoints.file}`, formData, {
        headers : {
          'Content-Type' : 'multipart/form-data',
        }
      })
      revalidatePath(dashboardRoutes.media);
      return {
        success: true,
        message: 'Uploaded Successfully',
      };
    } catch (err) {
      return await parseError(err);
    }
}

export async function deleteImage(id: number) {
  try {
    await ax({
      method: 'delete',
      url: `${endpoints.file}/${id}`,
    });
    revalidatePath(`/dashboard/media`);
    return {
      success: true,
      message: 'Deleted Successfully',
    };
  } catch (err) {
    return await parseError(err);
  }
}





