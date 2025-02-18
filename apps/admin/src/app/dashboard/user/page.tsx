import { AxiosResponse } from 'axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { Suspense } from 'react';
import { IUser } from '@repo/ui/types';
import ListUserContainer from './ListUserContainer';
import Error from './error';
import Loader from '../../components/common/Loader';
import ax from '../../lib/axios';
import havePermission from '../../lib/withPermission';
import CustomError from '../../components/common/CustomError';

const ListUser = async (
  {
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }
) => {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? 10;

  let data: IUser[] = [];
  let error: string = '';
  let links = {};
  let meta = {};

  const haveReadUsersPermission = await havePermission(permissions.user.read);
  if(!haveReadUsersPermission){
    return <CustomError text='You do not have permission to read users' />
  }

  try {
    const resData: AxiosResponse<any> = await ax({
      method: 'get',
      url: `${endpoints.user}`,
    });

    data = resData.data.items;
    links = resData.data.links;
    meta = resData.data.meta;
  } catch (err: unknown) {
    error = 'Error fetching Users..';
  }

  if (error) {
    return <Error />;
  }
  return (
    <Suspense fallback={<Loader text="Fetching users.." />}>
      <ListUserContainer meta={meta} links={links} users={data} />
    </Suspense>
  );
};

export default ListUser;
