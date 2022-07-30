<template>
    <div>
        <!-- 顶部通栏 -->
        <nav></nav>
        <!-- 头部组件 -->
        <header></header>
        <!-- 内容容器 -->
        <div class="main">
            <router-view></router-view>
        </div>
        <!-- 底部组件 -->
        <footer></footer>
    </div>
</template>

<script>
export default {
    name: "Layout",
};
</script>

<style scoped lang="less">
</style>