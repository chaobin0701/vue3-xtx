// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息

import { getNewCartGoods,findCartList,
  insertCart as _insertCart , deleteCart as _deleteCart , updateCart as _updateCart , checkAllCart
} from "@/api/cart";
// 购物车状态
import { mergeLocalCart as _mergeLocalCart } from '@/api/cart'

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
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== "") {
          updateGoods[key] = goods[key];
        }
      }
    },
    // 删除购物车商品
    deleteCart(state,skuId){
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index,1)
    },
    // 设置购物车列表
    setCartList(state,list){
      state.list = list
    }
  },
  actions: {
    insertCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录TODO
          _insertCart(goods).then(() => {
            // 获取商品列表
            return findCartList()
          }).then((data) => {
            ctx.commit('setCartList',data.result)
            resolve()
          })
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
          findCartList().then(data => {
            ctx.commit('setCartList',data.result)
            resolve()
          })
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
          _deleteCart([skuId]).then(() => {
            return findCartList()
          }).then((data) => {
            ctx.commit('setCartList',data.result)
          })
        } else {
          // 本地
          ctx.commit('deleteCart',skuId)
          resolve()
        }
      })
    },
    // 修改购物车商品
    updateCart(ctx,goods){
      // goods中,必须有skuId,其他想修改的属性 selected count
      return new Promise((resolve,reject) => {
        if(ctx.rootState.user.profile.token){
          // 登陆TODO
          _updateCart(goods).then(() => {
            return findCartList()
          }).then(data => {
            ctx.commit('setCartList',data.result)
            resolve()
          })
        } else {
          // 本地
          ctx.commit('updateCart',goods)
          resolve()
        }
      })
    },
    // 做有效商品的全选&反选
    checkAllCart(ctx,selected){
      return new Promise((resolve,reject) => {
        if(ctx.rootState.user.profile.token){
          // 登陆TODO
          const ids = ctx.getters.validList.map(item => item.skuId)
          checkAllCart({selected,ids}).then(() => {
            return findCartList()
          }).then( data => {
            ctx.commit('setCartList',data.result)
            resolve()
          })
        } else {
          // 本地
          // 1.获取有效的商品列表,遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart',{skuId:item.skuId,selected})
          })
        }
        resolve()
      })
    },
    // 批量删除选中的商品
    batchDeleteCart(ctx,isClear){
      return new Promise((resolve,reject) => {
        if(ctx.rootState.user.profile.token){
          // 以登录
          // 得到需要删除的商品列表(失效,选中)的skuId集合
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
          _deleteCart(ids).then(() => {
            return findCartList()
          }).then((data) => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
        } else {
          // 本地
          // 1.获取选中商品列表,进行遍历调用deleteCart mutations函数
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart',item.skuId)
          })
          resolve()
        }
      })
    },
    // 修改sku规格函数 
    updateCartSku(ctx,{oldSkuId,newSku}) {
      return new Promise((resolve,reject) => {
        if(ctx.rootState.user.profile.token) {
          // 登陆TODO
          // 1.获取原先商品的数量
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2.删除原先商品
          _deleteCart([oldSkuId]).then(() => {
          // 3.获取修改的skuId 和原先商品数量 做一个加入购物车操作
            return _insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(() => {
          // 4.更新列表
            return findCartList()
          }).then((data) => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
        } else {
          // 本地
          // 但你修改了sku的时候其实skuId需要更改,相当于把原来的信息移除,创建一条新的商品信息
          // 1.获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2.删除旧的商品
          ctx.commit('deleteCart',oldSkuId)
          // 3.合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 去插入即可
          ctx.commit('insertCart', newGoods)
        }
      })
    },
    // 合并本地购物车
    async mergeLocalCart(ctx) {
      // 存储token后调用合并API接口函数进行购物合并
      const cartList = ctx.getters.validList.map(({skuId,selected,count}) => {
        return {skuId,selected,count}
      })
      await _mergeLocalCart(cartList)
      // 合并成功将本地购物车删除
      ctx.commit('setCartList',[])
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
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
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
    },

  },
};
