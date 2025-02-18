import { AllowedPermission } from "../enums/permission";
import { IPermission } from "./permission";
import { IRole } from "./role";

export interface IRolePermission {
  id: number;
  allowedPermissions: AllowedPermission[];
  role?: IRole;
  permission?: IPermission;
  createdAt: Date;
  updatedAt: Date;
}
