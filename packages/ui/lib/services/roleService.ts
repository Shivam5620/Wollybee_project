import { AxiosResponse } from 'axios';
import { endpoints } from '../constants';
import { ICreateRoleRequestBody, IRole } from '../../types';
import ax from '../axios';


export const fetchAllRoles = async (): Promise<AxiosResponse<IRole[]>> => {
  return await ax({
    method: 'get',
    url: endpoints.role,
  });
};

export const fetchRolesById = async (id : number): Promise<AxiosResponse<IRole>> => {
  return await ax({
    method: 'get',
    url: `${endpoints.role}/${id}`,
  });
};


export const createRole = async (payload : ICreateRoleRequestBody): Promise<AxiosResponse<IRole>> => {
  return await ax({
    method: 'post',
    url: `${endpoints.role}`,
    data : payload
  });
};

export const editRole = async ({id, payload} : {id: number, payload : ICreateRoleRequestBody}): Promise<AxiosResponse<IRole>> => {
  return await ax({
    method: 'put',
    url: `${endpoints.role}/${id}`,
    data : payload
  });
};


export const deleteRole = async (id : number): Promise<AxiosResponse<any>> => {
  return await ax({
    method: 'delete',
    url: `${endpoints.role}/${id}`
  });
};
