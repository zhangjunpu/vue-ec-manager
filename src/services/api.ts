import request from "./request";
import type { LoginData, LoginRes } from "@/types/data";

export const requestLogin = (data: LoginData): Promise<LoginRes> => {
  return request({
    url: "/login",
    method: "post",
    data,
  });
};
