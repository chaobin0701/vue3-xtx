// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息

import { getNewCartGoods } from "@/api/cart";

// 购物车状态
export default {
  namespaced: true,
  state: () => {
    return {
      // 购物车商品列表
      list: [],
    };
  },
  mutations: {
    // 商品加入购物车
    insertCart(state, goods) {
      // 查询购物车(state.list)中是否有商品,如果有返回index
      const sameIndex = state.list.findIndex(
        (item) => item.skuId === goods.skuId
      );

      // 逻辑：如果存在skuId相同的商品,就给它的数量进行叠加,并删除原本的元素
      if (sameIndex >= 0) {
        goods.count = state.list[sameIndex].count + goods.count;
        state.list.splice(sameIndex, 1);
      }
      state.list.unshift(goods);
    },
    // 修改购物车商品
    updateCart(state, goods) {
      // goods中字段有可能不完整,goods中有的信息才去修改
      // 1.goods中必须有skuId,才能找到对应的商品信息
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId);
      for (const key in goods) {
        if (
          goods[key] !== null &&
          goods[key] !== undefined &&
          goods[key] !== ""
        ) {
          updateGoods[key] = goods[key];
        }
      }
    },
    // 删除购物车商品
    deleteCart(state,skuId){
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index,1)
    }
  },
  actions: {
    insertCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.token) {
          // 以登录
        } else {
          // 未登录
          ctx.commit("insertCart", goods);
          resolve();
        }
      });
    },
    // 获取购物车列表
    findCartList(ctx){
      return new Promise((resolve,reject) => {
        if(ctx.rootState.user.profile.token){
          // 登陆TODO
        } else {
          // 本地
          // Promise.all() 可以并列发送多个请求,等所有请求成功,调用then
          // promise.race() 可以并列发送多个请求,等最快的请求成功,调用then
          // 穿参数promise数组
          const promiseArr = ctx.state.list.map(item => {
            // 返回接口函数的调用
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr).then(dataArr => {
            dataArr.forEach((data,i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          }).catch(err => reject(err))
        }
      })
    },
    // 删除购物车商品
    deleteCart(ctx,skuId){
      return new Promise((resolve,reject) => {
        if(ctx.rootState.user.profile.token){
          // 登陆TODO
        } else {
          // 本地
          ctx.commit('deleteCart',skuId)
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    // 有效商品件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0);
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return (
        getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
      );
    },
    // 无效商品列表
    invaliList(state){
      return state.list.filter(item => !(tiem.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
    },
    // 是否全选
    isCheckAll(state,getters){
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }

  },
};
