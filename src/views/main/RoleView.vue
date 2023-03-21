<template>
  <div>
    <el-button class="add-role" type="primary" @click="addRole">添加角色</el-button>

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="名称" width="180" />
      <el-table-column label="权限">
        <template #default="scope">
          <el-button link type="primary" @click="handleAuth(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores/home";
import type { RoleRes } from "@/types/resp";
import { ElMessage, ElMessageBox } from "element-plus";

const store = useHomeStore();
const { roleList: list } = storeToRefs(store);

if (!list.value || list.value.length === 0) store.getRoleList();

const addRole = () => {
  ElMessageBox.prompt("请输入角色名称", "添加角色", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputPattern: /\S/,
    inputErrorMessage: "角色名不能为空",
  })
    .then(({ value }) => {
      if (value) {
        ElMessage({
          type: "success",
          message: `新角色名为:${value}`,
        });
        list.value.push({
          roleId: list.value.length + 1,
          roleName: value,
          authority: [],
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消创建",
      });
    });
};

const router = useRouter();
const handleAuth = (role: RoleRes) => {
  router.push({
    name: "auth",
    params: {
      id: role.roleId,
    },
  });
};
</script>

<style lang="less" scoped>
.add-role {
  margin-bottom: 20px;
}
</style>
