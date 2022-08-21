<template>
  <Transition name="down">
     <!-- 绑定样式 -->
    <div class="xtx-message" :style="style[type]" v-show="visible">
      <!-- 绑定图标 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <!-- 绑定文字 -->
      <span class="text">{{text}}</span>
    </div>
  </Transition>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'XtxMessage',
  props: {
    type: { 
      type: String,
      default: 'warn',
      desc:'描述弹窗的状态，有三个值 warn(警告|默认) success(成功) error(错误)'
    },
    text: {
      type: String,
      default: '',
      desc:'文本框的文字'
    }
  },
  setup () {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    // 分别对应三种不同的样式（图表、字体颜色、背景颜色、边框颜色）
    const style = {
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    // 控制元素显示隐藏
    const visible = ref(false)
    onMounted(() => {
      visible.value = true // 当组件显示加载完成，让元素进行显示
    })
    return { style, visible }
  }
}
</script>
<style scoped lang="less">
.down {
  &-enter {
    &-from {  // 进入动画的初态
      transform: translate3d(0,-75px,0);
      opacity: 0;
    }
    &-active { // 进入动画的起始状态
      transition: all 0.5s;
    }
    &-to { // 进入动画的终态
      transform: none;
      opacity: 1;
    }
  }
}
.xtx-message { //基础样式
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
