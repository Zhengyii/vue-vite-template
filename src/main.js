import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import api from './services/api'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Antd)

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3274752_uupqzad18n.js'
})
app.config.globalProperties.$api = api // 接口集

// 全局注册 IconFont 组件
app.component('icon-font', IconFont)

app.mount('#app')
