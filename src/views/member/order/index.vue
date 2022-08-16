<template>
    <div class="member-order-page">
        <!-- tab组件 -->
        <XtxTabs v-model="activeName" @tab-click="tabClick">
            <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">
            </XtxTabsPanel>
        </XtxTabs>
        <!-- 订单列表 -->
        <div class="order-list" v-if="!!orderList">
            <div v-if="loading" class="loading"></div>
            <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
            <OrderItem v-for="item in orderList" :key="item.id" :order="item" @on-cancel-order="onCancelOrder(item)"
                @on-delete-order="onDeleteOrder(item)" @on-confirm-order="onConfirmOrder(item)" />
        </div>
        <!-- 分页组件 -->
        <XtxPagination v-if="total > requestParams.pageSize" @current-change="requestParams.page = $event"
            :total="total" :page-size="requestParams.pageSize" :current-page="requestParams.page" />
        <!-- 取消原因组件 -->
        <OrderCancel ref="orderCancelCom" />
        <!-- 查看物流组件 -->
        <OrderLogistics ref="orderLogisticsCom" />
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import Message from '@/components/library/Message'
import { orderStatus } from '@/api/constants'
import { findOrderList, delteOrder, confirmOrder } from '@/api/order'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel.vue'
import OrderLogistics from './components/order-logistics.vue'
import confirm from '@/components/library/confirm'
const activeName = ref('all')

// 查询订单参数
const requestParams = reactive({
    page: 1,
    pageSize: 5,
    orderState: 0
})
// 订单列表
const orderList = ref([])
const total = ref(0)
const loading = ref(true) //加载状态

// 使用侦听器，监听 requestParams 的改变
const findOrderListFn = () => {
    loading.vlaue = true
    findOrderList(requestParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
    })
}

watch(requestParams, () => {
    findOrderListFn()
}, { immediate: true })

// 查询订单
findOrderList(requestParams).then(data => {
    orderList.value = data.result.items
})
// 点击选项卡
const tabClick = ({ index }) => {
    // 此时：tab.index 就是订单的状态
    requestParams.orderState = index
    requestParams.page = 1
}

// 封装逻辑-取消订单
const orderCancelCom = ref(null)
const onCancelOrder = (item) => {
    // item 就是你要取消的订单
    orderCancelCom.value.open(item)
}

// 删除订单
const onDeleteOrder = (item) => {
    confirm({ text: '您确认删除该条订单吗？' }).then(() => {
        delteOrder([item.id]).then(() => {
            Message({ text: '删除订单成功', type: 'success' })
            findOrderListFn()
        })
    }).catch(e => { })
}

// 逻辑封装-确认收货
const  onConfirm = (item) => {
    confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
        confirmOrder(item.id).then(() => {
            Message({ text: '确认收货成功', type: 'success' })
            // 确认收货后状态变成 待评价
            item.orderState = 4
        })
    })
}

// 封装逻辑-查看物流
const logisticsOrderCom = ref(null)
const onLogisticsOrder = (item) => {
    logisticsOrderCom.value.open(item)
}


</script>

<style scoped lang="less">
.order-list {
    background: #fff;
    padding: 20px;
}

.order-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;

    .head {
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        padding: 0 20px;
        overflow: hidden;

        span {
            margin-right: 20px;

            &.down-time {
                margin-right: 0;
                float: right;

                i {
                    vertical-align: middle;
                    margin-right: 3px;
                }

                b {
                    vertical-align: middle;
                    font-weight: normal;
                }
            }
        }

        .del {
            margin-right: 0;
            float: right;
            color: #999;
        }
    }

    .body {
        display: flex;
        align-items: stretch;

        .column {
            border-left: 1px solid #f5f5f5;
            text-align: center;
            padding: 20px;

            >p {
                padding-top: 10px;
            }

            &:first-child {
                border-left: none;
            }

            &.goods {
                flex: 1;
                padding: 0;
                align-self: center;

                ul {
                    li {
                        border-bottom: 1px solid #f5f5f5;
                        padding: 10px;
                        display: flex;

                        &:last-child {
                            border-bottom: none;
                        }

                        .image {
                            width: 70px;
                            height: 70px;
                            border: 1px solid #f5f5f5;
                        }

                        .info {
                            width: 220px;
                            text-align: left;
                            padding: 0 10px;

                            p {
                                margin-bottom: 5px;

                                &.name {
                                    height: 38px;
                                }

                                &.attr {
                                    color: #999;
                                    font-size: 12px;

                                    span {
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }

                        .price {
                            width: 100px;
                        }

                        .count {
                            width: 80px;
                        }
                    }
                }
            }

            &.state {
                width: 120px;

                .green {
                    color: @xtxColor;
                }
            }

            &.amount {
                width: 200px;

                .red {
                    color: @priceColor;
                }
            }

            &.action {
                width: 140px;

                a {
                    display: block;

                    &:hover {
                        color: @xtxColor;
                    }
                }
            }
        }
    }

    .order-list {
        padding: 20px;
        position: relative;
        min-height: 400px;
    }

    .loading {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, .9) url(../../../assets/images/loading.gif) no-repeat center;
    }

    .none {
        height: 400px;
        text-align: center;
        line-height: 400px;
        color: #999;
    }
}
</style>