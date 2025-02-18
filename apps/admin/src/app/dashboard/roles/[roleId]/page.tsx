import ax from '../../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import ViewRolesContainer from './ViewRolesContainer';
import Error from '../error';
import { IPermission, IRole } from '@repo/ui/types';
import { Suspense } from 'react';
import Loader from '../../../components/common/Loader';
import { AxiosResponse } from 'axios';
import { createPermissionsData } from '../role.utils';
import {permissions as permissionConstants} from '@repo/ui/lib/constants'; 
import havePermission from '../../../lib/withPermission';
import CustomError from '../../../components/common/CustomError';

const ViewRoles = async ({
  params,
}: {
  params: { roleId: number };
}): Promise<JSX.Element> => {
  let data: IRole | null = null;
  let permissions: IPermission[] = [];
  let error: string = '';

  const haveRolesReadPermission = await havePermission(permissionConstants.role.read);
  if(!haveRolesReadPermission){
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
      <Suspense fallback={<Loader text="Fetching role..." />}>
        {data && permissions.length > 0 && (
          <ViewRolesContainer
            options={createPermissionsData(
              permissions?.map((a) => {
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
              }),
              data,
            )}
            role={data}
          />
        )}
      </Suspense>
    </>
  );
};

export default ViewRoles;
