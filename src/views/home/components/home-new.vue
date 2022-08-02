<template>
    <div class="home-new">
        <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" ref="box">
            <!-- 查看全部 -->
            <template #right>
                <XtxMore path="/"></XtxMore>
            </template>
            <!-- 主要内容 -->
            <template #main>
                <div ref="target" style="position: relative; height: 406px;">
                    <transition class="fade">
                        <ul v-if="goods.length" ref="panel" class="goods-list">
                            <li v-for="item in goods" :key="item.id">
                                <!-- <RouterLink :to="`/product/${item.id}`"> -->
                                <RouterLink to="/">
                                    <img :src="item.picture" alt="">
                                    <p class="name ellipsis">{{ item.name }}</p>
                                    <p class="price">&yen;{{ item.price }}</p>
                                </RouterLink>
                            </li>
                        </ul>
                        <HomeSkeleton v-else></HomeSkeleton>
                    </transition>
                </div>
            </template>
        </HomePanel>
    </div>
</template>
    
<script>export default { name: 'HomeNew' }</script>
<script setup>
import HomeSkeleton from './home-skeleton.vue' //骨架屏组件
import HomePanel from './home-panel.vue'  // 框架组件

import { ref } from 'vue'
import {useLazyData} from '@/hooks' // useLazyData => 懒加载方法
import { findNew } from '@/api/home' // 获取新鲜好物数据
const { target, result} = useLazyData(findNew)
const goods = ref(result)


</script>
    
<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }

        .price {
            color: @priceColor;
        }
    }
}
</style>