import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ui from './components/library'
// 重置样式的库
import 'normalize.css'
// 自己项目的重置样式和公共样式
import '@/assets/styles/common.less'
import './mock'

const app = createApp(App)
app.use(router).use(store).use(ui).mount('#app')
