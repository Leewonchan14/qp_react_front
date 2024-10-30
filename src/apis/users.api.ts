import { SuccessResponse } from '../types/success.response';
import api from './common.api';

const userApi = {
  signup: (code: string) => {
    return api.request<
      SuccessResponse<{
        userId: number;
        accessToken: string;
        refreshToken: string;
      }>
    >({
      method: 'post',
      url: 'api/users/login/kakao',
      data: {
        code,
      },
    });
  },

  refresh: <T>(refreshToken: string) => {
    return api.request<T>({
      method: 'post',
      url: 'api/users/refresh',
      data: {
        refreshToken,
      },
    });
  },

  findUser: (userId: number) => {
    return api.request<SuccessResponse<UsersResponse>>({
      url: `api/users/${userId}`,
    });
  },

  autoLogin: () => {
    return api.request<SuccessResponse<{ userId: number }>>({
      url: 'api/users/auto-login',
    });
  },
};

export default userApi;

export interface UsersResponse {
  userId: number;
  username: string;
  profileImage: string;
  email: string;
  gender: Gender;
  point: number;
  role: Role;
  isDeleted: boolean;
}
export enum Gender {
  DEFAULT = 'DEFAULT',
  MAIL = 'MAIL',
  FEMAIL = 'FEMAIL',
}
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CHILD = 'CHILD',
  EXPERT = 'EXPERT',
}
