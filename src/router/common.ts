/**
 * 公共路由配置
 */
/* eslint-disable */
import { MenuState } from '@/types/router'
function importModules (files: any) {
  const routeModules: MenuState[] = []
  files.keys().forEach((key: string) => {
    // console.log(files(key).default)
    routeModules.push(...files(key).default)
  })
  // 根据 key进行菜单排序,数据看板排在第一个菜单
  routeModules.sort((a: any, b: any) => Number(a.key) - Number(b.key))
  return routeModules
}
export const routeModules = importModules(require.context('./modules', false, /\.ts$/))

// 静态路由
export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'@/views/login/index.vue')
  },
  {
    path: '/403',
    name: 'notAuth',
    component: () => import(/* webpackChunkName: "notAuth" */ '@/views/exceptions/403.vue')
  },
  {
    path: '/404',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/exceptions/404.vue')
  }
]
