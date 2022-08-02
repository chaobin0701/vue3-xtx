// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'


// 指令
// 原理:在图片可见的时候,动态的给img标签的src赋值,让元素可见的时候再去加载图片
const defineDirective = (app) => {
    // 图片懒加载指令
    app.directive('lazyload', {
      mounted (el, binding) {
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
          if (isIntersecting) {
            observer.unobserve(el)
            el.onerror = () => {
                el.src = defaultImg
            }  
            el.src = binding.value
          }
        }, {
          threshold: 0.01
        })
        observer.observe(el)
      }
    })
  }

export default {
    install(app){
        // 在app上进行扩展,app提供component directive 函数
        // 如果要挂载原型 app.config.globalProperties  方法
        app.component(XtxCarousel.name, XtxCarousel)
        app.component(XtxSkeleton.name, XtxSkeleton)
        app.component(XtxMore.name, XtxMore)
        defineDirective(app)
    }
}