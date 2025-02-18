import { AxiosResponse } from 'axios';
import { endpoints, permissions } from '@repo/ui/lib';
import Error from '../error';
import ax from '../../../lib/axios';
import { Suspense } from 'react';
import Loader from '../../../components/common/Loader';
import { IRole, IUser } from '@repo/ui/types';
import CreateUserContainer from './CreateUserContainer';
import havePermission from '../../../lib/withPermission';
import CustomError from '../../../components/common/CustomError';

const CreateUser = async () => {
  let data: IRole[] = [];
  let error: string = '';

  const haveCreateUserPermission = await havePermission(permissions.user.create);
  if(!haveCreateUserPermission){
    return <CustomError text='You do not have permission to create users' />
  }

  try {
    const resData: AxiosResponse<IRole[]> = await ax({
      method: 'get',
      url: `${endpoints.role}`,
    });

    data = resData.data;
  } catch (err: unknown) {
    error = 'Error fetching Roles..';
  }

  if (error) {
    return <Error />;
  }
  return (
    <Suspense fallback={<Loader text="Fetching roles.." />}>
      <CreateUserContainer roles={data} />
    </Suspense>
  );
};

export default CreateUser;
