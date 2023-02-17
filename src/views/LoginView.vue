<template>
  <div class="input-root">
    <el-form ref="ruleFormRef" :model="data" status-icon :rules="rules" label-width="70px" class="rule-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="data.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button class="btn" type="primary" :loading="isLoading" @click="handleSubmit(ruleFormRef)">登录</el-button>
        <el-button class="btn" :disabled="isLoading" @click="handleReset(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { LoginData, LoginRes } from "@/types/data";
import { requestLogin } from "@/services/api";
import { ACCESS_TOKEN } from "@/common/constant";
import cache from "@/utils/cache";

const data = reactive<LoginData>({
  username: "",
  password: "",
});

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 3,
      max: 10,
      message: "密码长度必须在3-10之间",
      trigger: "blur",
    },
  ],
});

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const isLoading = ref<boolean>(false);

const handleSubmit = (formEl?: FormInstance) => {
  formEl?.validate(async (valid: boolean) => {
    if (valid) {
      isLoading.value = true;
      try {
        const res = await requestLogin(data);
        console.log(res);
        const { token } = res.data;
        cache.setCache(ACCESS_TOKEN, token);
        router.push("/home");
      } catch (error) {
        const err = error as LoginRes;
        const message = err.data.msg;
        //@ts-ignore
        ElMessage.error(message);
      } finally {
        isLoading.value = false;
      }
    }
  });
};

const handleReset = (formEl?: FormInstance) => {
  formEl?.resetFields();
};
</script>

<style lang="less" scoped>
.input-root {
  padding-top: 200px;
  background-color: #fff;

  .rule-form {
    width: 400px;
    margin: 0 auto;

    .btn {
      width: 48%;
    }
  }
}
</style>
