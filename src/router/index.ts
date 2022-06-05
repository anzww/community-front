import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/login/register.vue"),
    meta: {
      title: "注册"
    }
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/tabbar/home.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("@/views/tabbar/mine.vue"),
    meta: {
      title: "我的"
    }
  }
];

const router = createRouter({
  // history 模式,hash模式:createWebHashHistory()
  history: createWebHashHistory(),
  routes
});

export default router;
