import { AllowedPermission } from "../enums/permission";

export interface IPermission {
  id: number;
  module: string;
  feature: string;
  allowedPermissions: AllowedPermission[];
  createdAt: Date;
  updatedAt: Date;
}
