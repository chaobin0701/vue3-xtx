<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
        <!-- 主要内容 -->
        <template #main>
            <div ref="target" style="position:relative; height: 426px;">
                <transition name="fade">
                    <ul v-if="goods.length" ref="pannel" class="goods-list">
                        <li v-for="item in goods" :key="item.id">
                            <RouterLink to="/">
                                <img :src="item.picture" alt="">
                                <p class="name">{{ item.title }}</p>
                                <p class="desc">{{ item.alt }}</p>
                            </RouterLink>
                        </li>
                    </ul>
                    <HomeSkeleton v-else></HomeSkeleton>
                </transition>
            </div>
        </template>
    </HomePanel>
</template>

<script>export default { name: 'HomeHot' }</script>
<script setup>
import HomeSkeleton from './home-skeleton.vue' //骨架屏组件
import HomePanel from './home-panel.vue' // 框架组件
 
import {useLazyData} from '@/hooks' // useLazyData => 懒加载方法
import { ref } from 'vue'
import { findHot } from '@/api/home' // 获取人气推荐数据
const { target,result } = useLazyData(findHot)
const goods = ref(result)
</script>
    

<style scoped lang='less'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;

    li {
        width: 306px;
        height: 406px;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
        }

        .desc {
            color: #999;
            font-size: 18px;
        }
    }
}
</style>