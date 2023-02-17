<template>
  <div>
    <el-container>
      <el-header>
        <img src="@/assets/img/ic_logo.svg" alt="" />
        <h1 class="title">后台管理系统</h1>
        <a href="#" class="logout">退出登录</a>
      </el-header>

      <el-container>
        <el-aside>
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <el-icon><document /></el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.el-header {
  position: relative;
  height: 64px;
  line-height: 64px;
  color: #fff;
  background: linear-gradient(#007ffb, #4b92ff);

  img {
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
    height: 20px;
    line-height: 20px;
    padding: 5px;
    color: #fff;
    font-size: 14px;
  }
}
</style>
