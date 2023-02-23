export type LoginReq = {
  username: string;
  password: string;
};

export interface LoginRes {
  data: {
    code: number;
    msg: string;
    success: boolean;
    token: string;
    username: string;
  };
}

export interface BaseResp<T> {
  code: number;
  message: string;
  data: T;
}

export interface GoodsRes {
  userId: number;
  id: number;
  title: string;
  introduce: string;
}

export interface UserRes {
  id: number;
  nickName: string;
  userName: string;
  role: {
    role: number;
    roleName: string;
  }[];
}

export interface RoleRes {
  roleId: number;
  roleName: string;
  authority: number[];
}

// Generated by https://quicktype.io

export interface AuthRes {
  name: string;
  roleId: number;
  viewRole: string;
  roleList: AuthResRoleList[];
}

export interface AuthResRoleList {
  name: string;
  roleId: number;
  viewRole?: string;
  roleList?: {
    name: string;
    roleId: number;
  }[];
}
