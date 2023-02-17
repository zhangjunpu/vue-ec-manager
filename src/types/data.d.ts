export type LoginData = {
  username: string;
  password: string;
};

export interface LoginRes {
  data: LoginResData;
}

export interface LoginResData {
  code: number;
  msg: string;
  success: boolean;
  token: string;
  username: string;
}
