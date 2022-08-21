<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[1].id">{{ goods.categories[1].name }}</XtxBreadItem>        
        <XtxBreadItem :to="'/category/sub/' + goods.categories[0].id">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem :to="'/product/' + goods.id">{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 名字组件 -->
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择 -->
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
          <XtxButton type="primary" style="margin-top:20px;" @click="insertCart()">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant  :goodsId="goods.id"></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn/>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import GoodsRelevant from './components/goods-relevant.vue'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'

import { nextTick, ref, watch,provide , getCurrentInstance} from 'vue';
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'

const store = useStore()
const useGoods = () => {
  // 出现路由地址商品ID发生变化,但是不会重新初始化组件
  const goods = ref(null)
  console.log(goods)
  provide('goods', goods)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为null然后使用v-if的组件可以重新销毁和创建
        goods.value = null
        data.result.skus.forEach(sku => {
           const sortSpecs = []
            data.result.specs.forEach(spec => {
              sortSpecs.push(sku.specs.find(item => item.name === spec.name))
            })
            sku.specs = sortSpecs
        });
        // 赋值
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
const goods = useGoods()

const changeSku = (sku) => {
  if(sku.skuId){
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
    currSku.value = sku
  } else {
    currSku.value = null
  }
}

// 选择的数量
const num = ref(1)

// 加入购物车逻辑
let currSku = ref(null)
const instance = getCurrentInstance()
const insertCart = () => {
  // 约定加入购物车字段必须和后端保持一致
  // 他们是：id skuId name picture price nowPrice count attrsText selected stock isEffective
  if (!currSku.value){
    return instance.proxy.$message({text:'请选择商品规格'})
  }
  if(num.value > goods.inventory){
    return instance.proxy.$message({text:'库存不足'})
  }
  store.dispatch('cart/insertCart',{
    id:goods.value.id,
    skuId:currSku.value.skuId,
    name: goods.value.name,
    picture: goods.value.mainPictures[0],
    price: currSku.value.price,
    nowPrice: currSku.value.price,
    count: num.value,
    attrsText: currSku.value.specsText,
    selected: true,
    isEffective: true,
    stock: currSku.value.inventory
  }).then(() => {
    return instance.proxy.$message({text:'加入购物车成功',type:'success'})
  })
}

</script>
    
<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}

.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>