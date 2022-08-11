import { createRouter, createWebHashHistory } from "vue-router";
const Layout = () => import("@/views/Layout");
const Home = () => import("@/views/home");
const Goods = () => import("@/views/goods");
const Login = () => import("@/views/login");
const Cart = () => import("@/views/cart");


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
      { path: "/product/:id", component: Goods },
    ],
  },
  {
    path: "/login",
    component: Login,
  },{
    path: "/cart",
    component: Cart,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
