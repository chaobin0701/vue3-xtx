<template>
<div class="home-product" ref="target">
    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
        <template #right>
            <div class="sub">
                <router-link v-for="sub in cate.children" :key="sub.id"  :to="`/category/sub/${sub.id}`"> {{sub.name}}</router-link>
            </div>
            <XtxMore></XtxMore>
        </template>
        <template #main>
            <div class="box">
            <router-link :to="`/category/${cate.id}`" class="cover">
                <img alt=""  v-lazyload="cate.picture" />
                <strong class="label">
                    <span>{{cate.name}}</span>
                    <span>{{cate.saleInfo}}</span>
                </strong>
            </router-link>
            <ul class="goods-list">
                <li v-for="item in cate.goods" :key="item.id">
                    <HomeGoods :goods="item"></HomeGoods>
                </li>
            </ul>
        </div>
        </template>
    </HomePanel>
</div>
</template>
    
<script setup>
import { ref } from 'vue';
import HomePanel from './home-panel.vue';
import HomeGoods from './home-goods.vue'
import { findGoods } from "@/api/home";
import { useLazyData } from '@/hooks';

const {target,result:list} = useLazyData(findGoods)
</script>
    
<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>