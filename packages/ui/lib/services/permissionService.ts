import { AxiosResponse } from 'axios';
import { endpoints } from '../constants';
import { IPermission } from '../../types';
import ax from '../axios';


export const fetchAllPermissions = async (): Promise<AxiosResponse<IPermission[]>> => {
  return await ax({
    method: 'get',
    url: endpoints.permission,
  });
};



