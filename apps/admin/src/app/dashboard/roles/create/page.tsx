import { AxiosResponse } from 'axios';
import ax from '../../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import { permissions as permissionsConstants } from '@repo/ui/lib/constants';
import CreateRoleContainer from './CreateRoleContainer';
import Error from '../error';
import { IPermission } from '@repo/ui/types';
import { Suspense } from 'react';
import Loader from '../../../components/common/Loader';
import havePermission from '../../../lib/withPermission';
import CustomError from '../../../components/common/CustomError';

const CreateRole = async (): Promise<JSX.Element> => {
  let permissions: IPermission[] = [];
  let error: string = '';

  const haveCreateRolePermission = await havePermission(permissionsConstants.role.create);
  if(!haveCreateRolePermission){  
    return <CustomError text='You do not have permission to access this page' />
  }

  try {
    const resPermission: AxiosResponse<IPermission[]> = await ax({
      method: 'get',
      url: endpoints.permission,
    });

    permissions = resPermission.data;
  } catch (err: unknown) {
    error = 'Error fetching permissions..';
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Suspense fallback={<Loader text="Loading Permissions..." />}>
        {permissions.length > 0 && (
          <CreateRoleContainer
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
          />
        )}
      </Suspense>
    </>
  );
};

export default CreateRole;
