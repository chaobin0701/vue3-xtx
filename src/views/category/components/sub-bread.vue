<template>
<XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
        <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{category.sub.name}}</XtxBreadItem>
    </transition>
</XtxBread>
</template>
    
<script setup>
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
const store = useStore()

// 1.获取二级分类的ID,在地址在路由中
// console.log(route.params.id)
// 2.获取vuex中的类目数据
// console.log(store.state)
// 3.通过计算属性得到,二级类目中的名称和ID,一级类目的名称和ID
const category = computed(()=>{
    const obj = {}
    store.state.category.list.forEach(top => {
        top.children && top.children.forEach(sub => {
            if(sub.id === route.params.id){
                // 设置二级类目
                obj.sub = {id:sub.id , name:sub.name}
                // 设置一级类目
                obj.top = {id:top.id , name:top.name}
            }
        })
    });
    return obj
})
</script>
    
<style>
    
</style>