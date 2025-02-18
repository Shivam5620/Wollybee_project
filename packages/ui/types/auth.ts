import { IUser } from './user';

export interface ISignInRequestBody {
  email: string;
  password: string;
}

export interface ISignUpRequestBody {
  email: string;
  password: string;
  name: string;
  mobile: string;
  roleId?: number;
}

export interface IJwtPayload {
  user: IUser;
  permissions: string[];
  iat?: number;
  exp?: number;
}

export interface IRefreshJwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

export interface ISignInResponseBody {
  accessToken: string;
  refreshToken: string;
}

export interface ISession {
  status: string;
  data: null | {
    user: IUser;
    expires: string;
    permissions: string[];
    accessToken: string;
  };
}
