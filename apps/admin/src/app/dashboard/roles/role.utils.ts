import { IRole } from '@repo/ui/types';
import { IRolesFormValues } from './RolesContainer';
import { AllowedPermission } from '@repo/ui/enums';

export function createPermissionsData(
  permissions: IRolesFormValues[],
  role: IRole,
) {
  let formV: IRolesFormValues[];
  if (role.rolePermissions) {
    formV = role.rolePermissions
      .filter((b) => {
        return b.permission;
      })
      .map((a) => {
        const permission = a.permission;
        const allowedPermissions = {
          [AllowedPermission.CREATE] : false,
          [AllowedPermission.READ] : false,
          [AllowedPermission.UPDATE] : false,
          [AllowedPermission.DELETE] : false
        };
        
        for (let i = 0; i < a.allowedPermissions.length; i++) {
            if(a.allowedPermissions[i] == AllowedPermission.CREATE){
              allowedPermissions[AllowedPermission.CREATE] = true;
            }
            if(a.allowedPermissions[i] == AllowedPermission.READ){
              allowedPermissions[AllowedPermission.READ] = true;
            }
            if(a.allowedPermissions[i] == AllowedPermission.UPDATE){
              allowedPermissions[AllowedPermission.UPDATE] = true;
            }
            if(a.allowedPermissions[i] == AllowedPermission.DELETE){
              allowedPermissions[AllowedPermission.DELETE] = true;
            }
        }


        return {
          availablePermissions: a.allowedPermissions,
          id: permission?.id ?? -1,
          module: permission?.module ?? '',
          feature: permission?.feature ?? '',
          allowedPermissions,
        };
      });
  } else {
    formV = [];
  }

  const parsedData = permissions?.map((a) => {
    const findExistingPermission: number = formV.findIndex((b) => b.id == a.id);

    if (findExistingPermission != -1) {
      const data: IRolesFormValues = formV[findExistingPermission];
      return {
        ...data,
      };
    }

    return {
      id: a.id,
      module: a.module,
      feature: a.feature,
      availablePermissions: a.availablePermissions,
      allowedPermissions: {
        [AllowedPermission.CREATE] : false,
        [AllowedPermission.READ] : false,
        [AllowedPermission.UPDATE] : false,
        [AllowedPermission.DELETE] : false
      },
    };
  });

  return parsedData;
}
