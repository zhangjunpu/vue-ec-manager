import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import { requestGoodsList, requestUserList, requestRoleList, requestAuthList } from "@/services/api";
import type { GoodsRes, UserRes, RoleRes, AuthRes } from "@/types/resp";

export type HomeState = {
  goodsList: GoodsRes[];
  userList: UserRes[];
  roleList: RoleRes[];
  authList: AuthRes[];
};

export const useHomeStore = defineStore("home", () => {
  const state = reactive<HomeState>({
    goodsList: [],
    userList: [],
    roleList: [],
    authList: [],
  });

  async function getGoodsList() {
    const res = await requestGoodsList();
    state.goodsList = res.data;
  }

  async function getUserList() {
    const res = await requestUserList();
    state.userList = res.data;
  }

  async function getRoleList() {
    const res = await requestRoleList();
    state.roleList = res.data;
  }

  async function getAuthList() {
    const res = await requestAuthList();
    state.authList = res.data;
  }

  return { ...toRefs(state), getGoodsList, getUserList, getRoleList, getAuthList };
});
