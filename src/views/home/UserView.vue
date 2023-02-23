<template>
  <div>
    <el-form :inline="true" :model="data.filter" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input v-model="data.filter.nameWord" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="data.filter.roleId" placeholder="请选择角色">
          <el-option label="全部" :value="0" />
          <el-option :label="item.roleName" :value="item.roleId" v-for="item in roleList" :key="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitFilter">筛选</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="data.list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="昵称" width="180" />
      <el-table-column label="角色">
        <template #default="scope">
          <el-tag v-for="item in scope.row.role" :key="item.role">{{ item.roleName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改角色">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="data.isShow" title="编辑用户信息">
      <el-form :model="data.activeUser">
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="data.activeUser.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-checkbox-group v-model="data.activeUser.role">
            <el-checkbox :label="item.roleId" v-for="item in roleList" :key="item.roleId">{{
              item.roleName
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleActive(false)">取消</el-button>
          <el-button type="primary" @click="handleActive(true)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { isEmpty } from "lodash";
import { useHomeStore } from "@/stores/home";
import type { UserRes } from "@/types/resp";

interface UserData {
  filter: {
    nameWord: string;
    roleId: number;
  };
  list: UserRes[];
  isShow: boolean;
  activeUser: {
    id: number;
    nickName: string;
    userName: string;
    role: number[];
  };
}

const data = reactive<UserData>({
  filter: {
    nameWord: "",
    roleId: 0,
  },
  list: [],
  isShow: false,
  activeUser: {
    id: 0,
    nickName: "",
    userName: "",
    role: [],
  },
});

const store = useHomeStore();
const { userList, roleList } = storeToRefs(store);
data.list = userList.value;

// init data
if (isEmpty(roleList.value)) store.getRoleList();
if (isEmpty(userList.value)) {
  store.getUserList();
  watch(userList, () => (data.list = userList.value));
}

// events
const onSubmitFilter = () => {
  const { nameWord, roleId } = data.filter;
  if (!nameWord && roleId === 0) {
    data.list = userList.value;
    return;
  }
  let arr = userList.value;
  if (nameWord) {
    arr = arr.filter((item) => item.nickName.indexOf(nameWord) !== -1);
  }
  if (roleId !== 0) {
    arr = arr.filter((item) => item.role.find((it) => it.role === roleId));
  }
  data.list = arr;
};

const handleEdit = (user: UserRes) => {
  const { id, nickName, userName, role } = user;
  data.activeUser = {
    id,
    nickName,
    userName,
    role: role.map((item) => item.role),
  };
  data.isShow = true;
};

// show edit dialog
const handleActive = (flag: boolean) => {
  data.isShow = false;
  if (flag) {
    const { id, nickName, role } = data.activeUser;
    const activeRole = roleList.value
      .filter((item) => role.find((it) => it === item.roleId))
      .map((item) => ({
        role: item.roleId,
        roleName: item.roleName,
      }));
    const user = data.list.find((item) => item.id === id);
    if (user) {
      user.nickName = nickName;
      user.role = activeRole;
    }
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-right: 10px;
}
</style>
