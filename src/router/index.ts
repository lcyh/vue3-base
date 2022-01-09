/* eslint-disable @typescript-eslint/no-explicit-any */
import { configure, start, done } from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCookie } from '@/utils/auth'
import constantRoutes from './common'
import store from '../store'

configure({
  showSpinner: false
})

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: constantRoutes as RouteRecordRaw[]
})
const whiteList = ['/login', '/403', '/404']
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
  start()
  if (getCookie()) {
    if (to.path === '/login') {
      next({ path: '/' })
      done()
    } else {
      if (!store.state.appModule?.userInfo?.id) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await store.dispatch('appModule/setUserInfo')
          const { role, id } = store.state.appModule.userInfo
          // Generate accessible routes map based on role
          await store.dispatch('appModule/setUserPermission', { role, id })
          // Dynamically add accessible routes
          store.state.appModule.addRouters.forEach((route: any) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (err) {
          // Remove token and redirect to login page
          store.dispatch('appModule/setRemoveToken')
          ElMessage.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          done()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      done()
    }
  }
})
// 全局路由后置守卫
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to) => {
  // 显示还是隐藏左侧导航
  // store.dispatch('setNavSide', to.meta.showNavSide)
  done()
})
export function resetRouter () {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}
export default router
