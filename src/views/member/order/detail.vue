<template>
    <div class="order-detail-page" v-if="order">
        <!-- 操作栏 -->
        <DetailAction :order="order" />
        <!-- 步骤条-->
        <DetailStep :order="order" />
        <!-- 物流栏 -->
        <!-- Suspense 协调对异步依赖的处理 -->
        <!-- https://cn.vuejs.org/guide/built-ins/suspense.html#suspense -->
        <Suspense v-if="[3, 4, 5].includes(order.orderState)">
            <!-- 组件加载完毕 -->
            <template #default>
                <DetailLogistics :order="order" />
            </template>
            <!-- 组件加载中显示 -->
            <template #fallback>
                <div class="loading">loading</div>
            </template>
        </Suspense>
        <!-- 订单商品信息 -->
        <OrderInfo :order="order" />
    </div>
</template>
<script setup>
import DetailAction from './components/detail-action'
import DetailStep from './components/detail-step.vue'
import DetailLogistics from './components/detail-logistics'
import OrderInfo from './components/order-info.vue'
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'

const order = ref(null)
const route = useRoute()
findOrder(route.params.id).then(data => {
    order.value = data.result
})
</script>


<style scoped lang="less">
.order-detail-page {
    background: #fff;
}
</style>