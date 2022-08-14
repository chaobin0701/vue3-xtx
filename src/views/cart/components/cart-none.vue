<template>
<div class="cart-none">
    <img src="@/assets/images/none.png" alt="" />
    <p>购物车内展示没有商品</p>
    <div class="btn">
        <XtxButton type="paimary" @click="$router.push('/')">继续逛逛</XtxButton>
    </div>
</div>
</template>
    
<script setup>
    
</script>
    
<style lang="less">
.cart-none {
    text-align: center;
    padding: 150px 0;
    background: #fff;
    img{
        width: 180px;
    }
    p{
        color: #999;
        padding: 20px 0;
    }    
}
</style>