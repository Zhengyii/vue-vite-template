import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import LoginLayout from '../layouts/login-layout.vue'

const routerHistory = createWebHashHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const routes = [
  {
    path: '/',
    component: LoginLayout,
    meta: {
      sightseeing: true // 无需登录仅浏览页面
    },
    redirect: '/login',
    children: [
      {
        path: '/login',
        component: () => import('../pages/Login/index.vue'),
        meta: {
          sightseeing: true // 无需登录仅浏览页面
        }
      }
    ]
  }
]

const router = createRouter({
  history: routerHistory,
  routes: [...routes]
})

export default router
