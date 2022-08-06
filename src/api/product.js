import request from '@/utils/request'

/*
    获取商品详情
*/ 
export const findGoods = (id) => {
    return request('/goods','get',{id})
}