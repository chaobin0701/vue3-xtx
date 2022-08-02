import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合，依赖topCategory重新设置，保证初始化主要数据，不至于白屏
      list: topCategory.map(item => ({name:item}))
    }
  },
  mutations:{
    // 修改分类函数
    setList (state,payload) {
      state.list = payload
    },
    // 修改当前以及分类下的open数据为true
    show(state,item){
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide(state,item){
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions:{
    // 获取分类函数
    async getList ({commit}) {
      // 获取分类数据
      const {result} = await findAllCategory()
      result.forEach(item => {
        item.open = false
      });
      // 修改分类数据
      commit('setList',result)
    }
  }
}
