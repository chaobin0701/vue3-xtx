// 接口函数
import request from '@/utils/request'

/**
 * 获取商品同类推荐-未传入ID为猜喜欢
 * */ 
export const findRelGoods = (id,limit = 16) => {
    return request('goods/relevant','get',{id,limit})
}

/**
 * 获取热榜商品
 * */ 
export const findHotGoods = (id,type,limit = 3) => {
    return request('/goods/hot','get',{id,type,limit})
}

/**
 * 获取商品的评价统计信息
 * */ 
export const findCommentInfoByGoods = (id) => {
    return request(`/goods/${id}/evaluate`,'get',{},true)
}


/**
 * 查询商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 商品ID
 * @returns
 */
 export const findGoodsCommentList = (id, params) => {
    return request(`/goods/${id}/evaluate/page`, 'get', params,true)
  }