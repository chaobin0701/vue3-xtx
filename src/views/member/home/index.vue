<template>
  <div class="member-home">
    <!-- 概况 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem v-for="item in goods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 猜你喜欢 -->
    <GoodsRelevant />
  </div>
</template>

<script setup>
import HomeOverview from './components/home-overview'
import HomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import GoodsItem from '@/views/category/components/goods-item'
import {ref} from 'vue'
import { findCollect } from '@/api/index'

const goods = ref([])
const collectGoods = ref([])
findCollect({
  page: 1,
  pageSize: 4
}).then(data => {
  collectGoods.value = data.result.items
})

findCollect({
  page: 1,
  pageSize: 4
}).then(data => {
  goods.value = data.result.items
})

</script>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}

:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>