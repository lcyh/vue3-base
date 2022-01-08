/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { configure, start, done } from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCookie } from '@/utils/auth'
import Redirect from '@/utils/redirect'
import constantRoutes from './common'
import store from '../store'

configure({
  showSpinner: false
})

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: constantRoutes as RouteRecordRaw[]
})
const whiteList = ['/login', '/403', '/404', '/redirect']
router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  start()
  // Determine whether the user has logged in
  if (getCookie()) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      done()
    } else {
      // Check whether the user has obtained his permission roles
      // console.log('store.state.appModule?.userInfo-1', store.state.appModule?.userInfo);
      if (store.state.appModule?.userInfo?.role?.length === 0) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await store.dispatch('appModule/setUserInfo')
          const { role, id } = store.state.appModule.userInfo
          // Generate accessible routes map based on role
          await store.dispatch('appModule/setUserPermission', { role, id })
          // Dynamically add accessible routes
          // console.log('store.state.appModule.addRouters', store.state.appModule.addRouters);

          store.state.appModule.addRouters.forEach((route:RouteRecordRaw) => {
            router.addRoute(route)
          })
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          console.error('---err---', err)
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
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      done()
    }
  }
})
// 全局路由后置守卫
router.afterEach((to) => {
  console.log('afterEach-to', to)
  // 显示还是隐藏左侧导航
  // store.dispatch('setNavSide', to.meta.showNavSide)
  done()
})
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function resetRouter () {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher // reset router
}
export default router
