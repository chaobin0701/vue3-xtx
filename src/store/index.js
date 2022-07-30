import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 三个模块
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart, user, category
  },
  // 配置插件
  plugins: [createPersistedState({
    // 本地存储的名字
    key: 'vue3-xtx',
    // 指定需要存储的模板
    paths: ['user', 'cart']
  })]
})
