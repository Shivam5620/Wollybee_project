'use server'

import { endpoints } from "@repo/ui/lib";
import { ISignUpRequestBody, } from "@repo/ui/types";
import ax from "../lib/axios";
import { parseError } from "../../utils/error-utils";

export async function createUser(payload: ISignUpRequestBody) {
    try {
      await ax({
        method: 'post',
        url: `${endpoints.user}`,
        data: payload,
      });

      return {
        success: true,
        message: 'Registered Successfully',
      };
    } catch (err) {
      return await parseError(err);
    }
  }