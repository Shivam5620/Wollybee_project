import { AllowedPermission } from '../enums/permission';
import { IRolePermission } from './rolePermission';

export interface IRole {
  id: number;
  name: string;
  description: string;
  rolePermissions?: IRolePermission[];
  createdBy?: number;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRoleRequestBody {
  name: string;
  description: string;
  permissions?: {
    permissionId: number;
    allowedPermissions: AllowedPermission[];
  }[];
}

