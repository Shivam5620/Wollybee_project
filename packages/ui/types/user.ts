import { IRole } from './role';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile: string;
  salt: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUserClient
  extends Omit<
    IUser,
    | 'id'
    | 'salt'
    | 'role'
    | 'createdAt'
    | 'updatedAt'
    | 'isActive'
    | 'isDeleted'
  > {
  name: string;
  email: string;
  password: string;
  roleId: number;
}
