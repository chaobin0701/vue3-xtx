import { createRouter, createWebHashHistory } from "vue-router";
const Layout = () => import("@/views/Layout");
const Home = () => import("@/views/home");
const Goods = () => import('@/views/goods/index')

import TopCategory from "@/views/category";
import SubCategory from "@/views/category/sub-category";

const routes = [
  // 一级路由
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home,
      },
      { path: "/category/:id", component: TopCategory },
      { path: "/category/sub/:id", component: SubCategory },
      {path:"/product/:id",component:Goods}
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(){
    return { left:0,top:0}
  }
});

export default router;
