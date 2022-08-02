<template>
    <div>
        <!-- 顶部通栏 -->
        <nav>
            <AppNavbar/>
        </nav>
        <!-- 头部组件 -->
        <header>
            <AppHeader/>
            <!-- 头部吸顶组件 -->
            <AppHeaderSticky/>
        </header>
        <!-- 内容容器 -->
        <div class="main">
            <router-view></router-view>
        </div>
        <!-- 底部组件 -->
        <footer>
            <AppFooter/>
        </footer>
    </div>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue';
import AppHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue';
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex';
export default {
    name: "Layout",
    components:{ AppNavbar, AppHeader , AppFooter , AppHeaderSticky },
    setup(){
        const store = useStore() 
        // 获取分类数据
        store.dispatch('category/getList')
        
    }
};
</script>

<style scoped lang="less">
    .main{
        min-height: 600px;
    }
</style>