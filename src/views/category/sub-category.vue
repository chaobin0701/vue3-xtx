<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @sort-change="changeFilter" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
      <SubSort @filter-change="changeSort"/>
        <!-- 列表 -->
        <ul>
          <li v-for="good in goodsList" :key="good.id">
            <GoodsItem :goods="good" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading  
        :loading="loading" 
        :finished="finished" 
        @infinite="getData"></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>
    
<script>export default { name:'SubCategory' }</script>
<script setup>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
const route = useRoute()

// 1.基础布局
// 2.无限加载组件
// 3.动态加载数据且渲染
// 4.任何筛选条件变化需要更新列表
const loading = ref(false)
const finished = ref(false)
const goodsList = ref([])
// 查询参数
let reqParams = {
  page:1,
  pageSize:20
}

// 获取数据函数
const getData = () => {
  loading.value = true
  reqParams.categoryId = route.params.id
  findSubCategoryGoods(reqParams).then(({result}) => {
    if(result.items.length) {
      goodsList.value.push(...result.items)
      reqParams.page++
    } else {
      // 加载完毕
      finished.value = true
    }
    // 请求结束
    loading.value = false
  })
}


// 切换二级分类重新加载
watch(()=>route.params.id,(newVal)=>{
  if(newVal && route.path === ('/category/sub/' + newVal)){
    goodsList.value = []
    reqParams = {
      page:1,
      pageSize:20
    }
    getData()
    finished.value = false
  }
},{immediate:true})

// 监听筛选区改变
const changeFilter = (filterParams) => {
  reqParams = {...reqParams,...filterParams}
  reqParams.page = 1
  goodsList.value = []
  finished.value = false
  getData()
}

// 监听排序改变
const changeSort = (sortParams) => {
  reqParams = {...reqParams,...sortParams}
  reqParams.page = 1
  goodsList.value = []
  finished.value = false
  getData()
}
</script>
    
<style lang="less">
  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px;

      li {
        margin-right: 20px;
        margin-bottom: 20px;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
</style>