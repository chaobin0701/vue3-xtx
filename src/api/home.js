// 接口函数
import request from '@/utils/request'

/*获取首页品牌推荐数据*/ 
export const findBrand = (limit) => {
    return request('/home/brand', 'get', {limit})
  }

/* 获取广告图 */ 
export const findBanner = () => {
  return request('/home/banner','get')
}

/* 获取新鲜好物数据 */ 
export const findNew = () => {
  return request('home/new', 'get')
}

/* 获取人气推荐数据 */ 
export const findHot = () => {
  return request('home/hot', 'get')
}