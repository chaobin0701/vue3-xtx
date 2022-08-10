 // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息

// 购物车状态
export default {
  namespaced: true,
  state: () => {
    return {
      // 购物车商品列表
      list: []
    }
  },
  mutations:{
    insertCart(state,goods){
      const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId) // 查询购物车中是否有商品
      // // 约定加入购物车字段必须和后端保持一致
      // 他们是：id skuId name picture price nowPrice count attrsText selected stock isEffective
      // 插入数据规则：
      // 1.先找下是否有相同商品
      // 2.如果有相同的商品，查询它的数量，累加到payload上，再保存最新位置
      // 3.如果没有相同商品，保存在最新位置即可

      // 逻辑：有相同的给goods累加数量，删除相同skuId的商品
      if(sameIndex >= 0) {
        goods.count = state.list[sameIndex].count + goods.count
        state.list.splice(sameIndex,1)
      }
      state.list.unshift(goods)
    }
  },
  actions:{
    insertCart(ctx,goods){
      return new Promise((resolve,reject) => {
        if(ctx.rootState.user.token) {
          // 以登录

        } else {
          // 未登录
          ctx.commit('insertCart',goods)
          resolve()
        }
      })
    }
  }
}
