<template>
<div class="home-entry">
    <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory/>
        <!-- 轮播图 -->
        <HomeBanner/>
        <!-- 新鲜好物 -->
        <HomeNew/>
        <!-- 人气推荐 -->
        <HomeHot/>
        <!-- 热门品牌 -->
        <HomeBrand />
    </div>
</div>
</template>
<script>export default { name: 'xtx-home-page' }</script>
<script setup>
// 组件引入
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'


</script>

<style scoped lang="less">

</style>