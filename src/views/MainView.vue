<template>
  <div>
    <el-container>
      <el-header class="header">
        <img class="logo" src="@/assets/img/ic_logo.svg" alt="" />
        <h1 class="title">后台管理系统</h1>
        <el-button class="logout" link type="primary" @click="handleLogout">退出登录</el-button>
      </el-header>

      <el-container>
        <el-aside class="aside">
          <el-menu class="menu-container" :default-active="route.path" router>
            <el-menu-item :index="/main/ + item.path" v-for="item in childrenRoutes" :key="item.path">
              <span>{{ item.meta?.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ACCESS_TOKEN } from "@/common/constant";
import cache from "@/utils/cache";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const childrenRoutes = router
  .getRoutes()
  .find((item) => item.name === "main")
  ?.children?.filter((item) => item.meta?.isShow === true);

// events
const handleLogout = () => {
  cache.removeCache(ACCESS_TOKEN);
  router.replace("/login");
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 64px;
  line-height: 64px;
  color: #fff;
  background: linear-gradient(#007ffb, #4b92ff);

  .logo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    margin: auto 0;
    height: 18px;
  }

  .title {
    position: absolute;
    left: 150px;
  }

  .logout {
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
}

.aside {
  width: 200px;
  box-shadow: 2px 0 8px #ddd;

  .menu-container {
    width: 200px;
    height: calc(100vh - 64px);
  }
}
</style>
