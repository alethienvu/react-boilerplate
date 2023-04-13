import { IUser, IUserServerResponse } from 'app/types/user';
import { apiWrapper } from './axiosClient';
import userAPI from './userAPI';

const authAPIBaseUrl = '/auth';

/* Types export for outside */
/* ==================== START ==================== */
export type TLoginArgs = {
  username: string;
  password: string;
};
export type TLoginRes = {
  user: IUser;
  token: string;
};
export type TLoginError = {
  message: string;
};

// export type TGetMeArgs = {}
export type TGetMeRes = IUser;
/* ==================== END ==================== */

/* API Types */
/* ==================== START ==================== */
type ApiLoginArgs = {
  username: string;
  password: string;
};
type ApiLoginRes = {
  user: IUserServerResponse;
  token: string;
};

// type ApiGetMeArgs = {}
type ApiGetMeRes = IUserServerResponse;
/* ==================== END ==================== */

const login = async (params: TLoginArgs): Promise<TLoginRes> => {
  const body: ApiLoginArgs = {
    username: params.username,
    password: params.password,
  };
  const result = await apiWrapper.post<ApiLoginArgs, ApiLoginRes>(`${authAPIBaseUrl}/login`, body);

  console.log({ result, params });

  return {
    user: userAPI.mappingServerDataUnderUserView(result.user),
    token: result.token,
  };
};

const getMe = async (): Promise<TGetMeRes> => {
  const result = await apiWrapper.get<ApiGetMeRes>(`${authAPIBaseUrl}/me`);

  return userAPI.mappingServerDataUnderUserView(result);
};

const authAPI = { login, getMe };

export default authAPI;
