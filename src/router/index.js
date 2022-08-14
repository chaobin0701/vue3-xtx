import { createRouter, createWebHashHistory } from "vue-router";
import store from '@/store'
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

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息 token
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录 引导其去登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router;
