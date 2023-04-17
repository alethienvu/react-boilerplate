export enum UserRole {
  SuperAdmin = 'SUPER_ADMIN',
  Admin = 'ADMIN',
  User = 'USER',
}

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
}
export interface IUserServerData {
  id: string;
  email: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
}

export interface IUserServerResponse {
  data: IUserServerData;
  metadata: any;
}
