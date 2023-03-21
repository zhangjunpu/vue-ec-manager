import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import cache from "@/utils/cache";
import { ACCESS_TOKEN } from "@/common/constant";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/MainView.vue"),
    redirect: "/main/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/main/HomeView.vue"),
        meta: {
          isShow: true,
          title: "首页",
        },
      },
      {
        path: "goods",
        name: "goods",
        component: () => import("../views/main/GoodsView.vue"),
        meta: {
          isShow: true,
          title: "商品列表",
        },
      },
      {
        path: "user",
        name: "user",
        component: () => import("../views/main/UserView.vue"),
        meta: {
          isShow: true,
          title: "用户列表",
        },
      },
      {
        path: "role",
        name: "role",
        component: () => import("../views/main/RoleView.vue"),
        meta: {
          isShow: true,
          title: "角色列表",
        },
      },
      {
        path: "auth/:id",
        name: "auth",
        component: () => import("../views/main/AuthView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = cache.getCache(ACCESS_TOKEN);
  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
