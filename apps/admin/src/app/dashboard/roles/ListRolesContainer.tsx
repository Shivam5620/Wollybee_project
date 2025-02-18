import axios, { AxiosResponse } from 'axios';
import Error from './error';
import ListRoles from './ListRoles';
import ax from '../../lib/axios';
import { endpoints, permissions } from '@repo/ui/lib';
import { IRole } from '@repo/ui/types';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import havePermission from '../../lib/withPermission';
import CustomError from '../../components/common/CustomError';

const ListRolesContainer = async (): Promise<JSX.Element> => {
  let data: IRole[] = [];
  let error: string = '';

  const haveReadRolesPermission = await havePermission(permissions.role.read);
  if(!haveReadRolesPermission){
    return <CustomError text='You do not have permission to access this page' />
  }

  try {
    const res: AxiosResponse<IRole[]> = await ax({
      method: 'get',
      url: endpoints.role,
    });

    data = res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = err.response?.data?.message || err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error) {
    return <Error />;
  }

  return (
  <Suspense fallback={<Loader text="Fetching Roles" />}>
  <ListRoles rolesData={data} />
  </Suspense>)
};

export default ListRolesContainer;
