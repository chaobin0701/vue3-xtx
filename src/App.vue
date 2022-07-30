<template>
  <div>
    <div>{{ $store.state.user.profile.nickname }}</div>
    <button @click="$store.commit('user/setName', 'zhangsan')">
      点我改变名字
    </button>
  </div>
</template>

<script>
</script>

<style lang="less">
</style>
