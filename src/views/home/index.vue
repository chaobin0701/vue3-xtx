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
    </div>
</div>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
export default {
    name:'HomePage',
    components:{HomeCategory,HomeBanner,HomeNew , HomeHot},
    setup(){

    }
}
</script>

<style scoped lang="less">

</style>