import { AxiosResponse } from 'axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { Suspense } from 'react';
import { IRole, IUser } from '@repo/ui/types';
import EditUserContainer from './EditUserContainer';
import Error from '../../error';
import Loader from '../../../../components/common/Loader';
import ax from '../../../../lib/axios';
import havePermission from '../../../../lib/withPermission';
import CustomError from '../../../../components/common/CustomError';

const EditUser = async ({ params }: { params: { userId: number } }) => {
  let data: IRole[] = [];
  let userData: IUser | null = null;
  let error: string = '';

  const haveEditUserPermission = await havePermission(permissions.user.update);
  if(!haveEditUserPermission){
    return <CustomError text='You do not have permission to edit users' />
  }

  try {
    const resData: AxiosResponse<IRole[]> = await ax({
      method: 'get',
      url: `${endpoints.role}`,
    });
    const resUserData: AxiosResponse<IUser> = await ax({
      method: 'get',
      url: `${endpoints.user}/${params.userId}`,
    });

    data = resData.data;
    userData = resUserData.data;
  } catch (err: unknown) {
    error = 'Error fetching User..';
  }

  if (error) {
    return <Error />;
  }
  return (
    <Suspense fallback={<Loader text="Fetching User.." />}>
      {userData && (
        <EditUserContainer
          roles={data}
          userDetail={userData}
        />
      )}
    </Suspense>
  );
};

export default EditUser;
