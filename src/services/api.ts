import request from "./request";
import type { LoginReq, BaseResp, GoodsRes, LoginRes, UserRes, RoleRes, AuthRes } from "@/types/resp";

export const requestLogin = (data: LoginReq): Promise<LoginRes> => {
  return request({
    url: "/login",
    method: "post",
    data,
  });
};

/**
 * 商品列表
 */
export const requestGoodsList = (): Promise<BaseResp<GoodsRes[]>> => {
  return request.get("/getGoodsList");
};

/**
 * 用户列表
 */
export const requestUserList = (): Promise<BaseResp<UserRes[]>> => {
  return request.get("/getUserList");
};

/**
 * 角色列表
 */
export const requestRoleList = (): Promise<BaseResp<RoleRes[]>> => {
  return request.get("/getRoleList");
};

/**
 * 权限列表
 */
export const requestAuthList = (): Promise<BaseResp<AuthRes[]>> => {
  return request.get("/getAuthorityList");
};
