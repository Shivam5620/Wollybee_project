import { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import { IPermission, IRole } from '@repo/ui/types';
import { permissions as permissionConstants } from '@repo/ui/lib/constants';
import { Suspense } from 'react';
import ax from '../../../../lib/axios';
import Error from '../../error';
import Loader from '../../../../components/common/Loader';
import EditRoleContainer from './EditRoleContainer';
import havePermission from '../../../../lib/withPermission';
import CustomError from '../../../../components/common/CustomError';

const EditRole = async ({
  params,
}: {
  params: { roleId: number };
}): Promise<JSX.Element> => {
  let data: IRole | null = null;
  let permissions: IPermission[] = [];
  let error: string = '';

  const haveEditRolePermission = await havePermission(permissionConstants.role.update);
  if(!haveEditRolePermission){  
    return <CustomError text='You do not have permission to access this page' />
  }

  try {
    const resData: AxiosResponse<IRole> = await ax({
      method: 'get',
      url: `${endpoints.role}/${params.roleId}`,
    });

    const resPermission: AxiosResponse<IPermission[]> = await ax({
      method: 'get',
      url: endpoints.permission,
    });
    data = resData.data;
    permissions = resPermission.data;
  } catch (err: unknown) {
    error = 'Error fetching role..';
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Suspense fallback={<Loader text="fetching role..." />}>
        {data && permissions.length > 0 && (
          <EditRoleContainer
            permissions={permissions?.map((a) => {
              return {
                id: a.id,
                module: a.module,
                feature: a.feature,
                availablePermissions: a.allowedPermissions,
                allowedPermissions: {
                  create: false,
                  read: false,
                  update: false,
                  delete: false,
                },
              };
            })}
            role={data}
          />
        )}
      </Suspense>
    </>
  );
};

export default EditRole;
