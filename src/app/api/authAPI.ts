import { IUser, IUserServerResponse } from 'app/types/user';
import { apiWrapper } from './axiosClient';
import userAPI from './userAPI';

const authAPIBaseUrl = '/auth';

//#region Types export for outside
export type TLoginArgs = {
  email: string;
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
//#endregion

//#region API Types
type ApiLoginArgs = {
  email: string;
  password: string;
};
type ApiLoginRes = IUserServerResponse;

// type ApiGetMeArgs = {}
type ApiGetMeRes = IUserServerResponse;
//#endregion

const login = async (params: TLoginArgs): Promise<TLoginRes> => {
  const body: ApiLoginArgs = {
    email: params.email,
    password: params.password,
  };
  const result = await apiWrapper.post<ApiLoginArgs, ApiLoginRes>(`${authAPIBaseUrl}/login`, body);

  console.log({ result, params });

  return {
    user: result.data,
    token: result.data.accessToken,
  };
};

const getMe = async (): Promise<TGetMeRes> => {
  const result = await apiWrapper.get<ApiGetMeRes>(`${authAPIBaseUrl}/current`);

  return userAPI.mappingServerDataUnderUserView(result.data);
};

const authAPI = { login, getMe };

export default authAPI;
