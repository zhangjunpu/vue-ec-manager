<template>
  <div>
    <el-button class="btn-submit" type="primary" @click="handleSubmit">提交修改</el-button>
    <el-tree
      ref="treeRef"
      :data="authList"
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="role?.authority"
      :props="{ label: 'name', children: 'roleList' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores/home";

const treeRef = ref();

const store = useHomeStore();
const { roleList, authList } = storeToRefs(store);

// init authList
if (!authList.value || authList.value.length === 0) store.getAuthList();

// init role
const route = useRoute();
const roleId = route.params.id;
const role = computed(() => roleList.value.find((item) => item.roleId === Number(roleId)));

// events
const handleSubmit = () => {
  if (role.value && role.value.authority) {
    const newAuthList: number[] = treeRef.value?.getCheckedKeys().sort((a: number, b: number) => a - b);
    role.value.authority = newAuthList;
  }
};
</script>

<style lang="less" scoped>
.btn-submit {
  margin-bottom: 20px;
}
</style>
