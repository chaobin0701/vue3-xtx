<template>
    <div class="home-new">
        <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
            <!-- 查看全部 -->
            <template #right>
                <XtxMore path="/"></XtxMore>
            </template>
            <!-- 主要内容 -->
            <template #main>
            <ul class="goods-list">
                <li v-for="item in goods" :key="item.id">
                    <!-- <RouterLink :to="`/product/${item.id}`"> -->
                    <RouterLink to="/">
                        <img :src="item.picture" alt="">
                        <p class="name ellipsis">{{ item.name }}</p>
                        <p class="price">&yen;{{ item.price }}</p>
                    </RouterLink>
                </li>
            </ul>
            </template>
        </HomePanel>
    </div>
</template>
    
<script>export default { name: 'HomeNew' }</script>
<script setup>
import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import { findNew } from '@/api/home'
const goods = ref([])
findNew().then(data => {
    goods.value = data.result
})

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