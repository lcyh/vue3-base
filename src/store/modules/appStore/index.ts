/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionContext } from 'vuex'
import { ElMessage } from 'element-plus'
import { routeModules } from '@/router/common'
import { resetRouter } from '@/router/index'
import UserAction from '@/api/modules/app'
import AppState, { UserInfo } from './types'
import RootStateTypes from '../../types'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import { MenuState } from '@/types/router'

// import { permissionMenuList } from './mockData'
// 获取导航对应的路由对象
function getRouteObj (record: any, routeList: any[] = routeModules) {
  const recursion = (list: MenuState[]): (null|MenuState) => {
    for (let i = 0; i < list.length; i++) {
      const element: any = list[i]
      const routeName = element.componentName || element.name
      const recordName = record.componentName || record.name
      if (recordName === routeName) {
        return element
      } else if (element.children && element.children.length) {
        const value = recursion(element.children)
        if (value) {
          return value
        }
      }
    }
    return null
  }
  return recursion(routeList)
}
// 格式化路由规则:在本地的routeModules文件基础上,过滤出来后端接口返回的权限菜单,最终动态添加到路由里
export function formatRoutes (list: any[], originRoutes: MenuState[]): MenuState[] {
  const recursion = (originRoutes: MenuState[]): MenuState[] => {
    const result: MenuState[] = []
    for (let i = 0; i < originRoutes.length; i++) {
      const element: any = originRoutes[i]
      const permission: any = getRouteObj(element, list)
      if (permission) {
        if (element.children && element.children.length) {
          element.children = recursion(element.children)
          if (element.redirect) {
            element.redirect.name = element.children[0].name
          }
        } else if (element.meta.reportUrl === null) {
          element.meta.reportUrl = permission.reportUrl
        }
        result.push(element)
      }
    }
    return result
  }
  return recursion(originRoutes)
}
// 获取 菜单列表,菜单列表map,需要动态添加的路由
function formatMenu (menuLiist: any[]) {
  const copyMenus = JSON.parse(JSON.stringify(menuLiist))
  const newMenus = (copyMenus: any) => {
    const res: any = []
    copyMenus.forEach((item: any) => {
      const newItem = {
        ...item,
        name: item.componentName,
        meta: getRouteObj(item)?.meta,
        children: newMenus(item.children)
      }
      res.push(newItem)
    })
    return res
  }
  const menu: any = newMenus(copyMenus)
  const map = new Map()
  for (let i = 0; i < menu.length; i++) {
    const menuItem = menu[i]
    if (menuItem.children?.length) {
      map.set(menuItem.componentName, menuItem.children)
    }
  }
  const routes = formatRoutes(copyMenus, routeModules)
  return { menu, map, routes }
}

function handleRouteMap () {
  const map: any = {}
  routeModules.forEach((item: any) => {
    map[item.name] = item
  })
  return map
}
function handleAddRoute (routers: any) {
  // routeModules
  const addRoutes: any = []
  const routeMap = handleRouteMap()
  if (routers.length) {
    routers.forEach((route: any) => {
      const hasRoute = routeMap[route.name]
      if (hasRoute) {
        addRoutes.push(hasRoute)
      }
    })
  }
  addRoutes.push({
    path: '/:path(.*)',
    redirect: '/',
    meta: { hidden: true }
  })
  console.log('addRoutes', addRoutes)

  return { routes: addRoutes }
}

const appModule = {
  namespaced: true,
  state: {
    token: getCookie() || '',
    userInfo: {
      id: '',
      role: [],
      roleName: '',
      userName: '',
      email: ''
    }, // 用户信息
    collapsed: false, // 左侧导航是否折叠
    showNavSide: true, // 是否显示左侧导航
    showGameSelect: false, // 是否显示游戏下拉框
    menuMap: new Map(), // 一二级导航集合
    activedMenu: 'Home', // 当前选中的一级导航
    permission: {
      dynamicRoutes: []
    },
    hasAddRoute: false
  },
  mutations: {
    TOGGLE_COLLAPSED (state: AppState, value: boolean) {
      if (value !== undefined) {
        state.collapsed = value
        return
      }
      state.collapsed = !state.collapsed
    },
    SET_NAV_SIDE (state: AppState, value: boolean | undefined) {
      state.showNavSide = value
    },
    SET_SHOW_GAME_SELECT (state: AppState, value: boolean) {
      state.showGameSelect = value
    },
    SET_ACTIVED_MENU (state: AppState, value: string) {
      state.activedMenu = value
    },
    SET_USER_INFO (state: AppState, value: UserInfo) {
      state.userInfo = value
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SET_ADD_ROUTERS: (state: AppState, routers: any[]) => {
      const { routes }: any = handleAddRoute(routers)
      state.permission.dynamicRoutes = routes
      console.log('state.permission.dynamicRoutes-1', state.permission.dynamicRoutes)
      state.hasAddRoute = true
    }
  },
  actions: {
    toggleCollapsed ({ commit }: ActionContext<AppState, RootStateTypes>, value: boolean) {
      commit('TOGGLE_COLLAPSED', value)
    },
    setNavSide ({ commit }: ActionContext<AppState, RootStateTypes>, value: boolean) {
      commit('SET_NAV_SIDE', value)
    },
    setShowGameSelect ({ commit }: ActionContext<AppState, RootStateTypes>, value: boolean) {
      commit('SET_SHOW_GAME_SELECT', value)
    },
    async setLogin (
      { commit }: ActionContext<AppState, RootStateTypes>,
      userInfo: { username: string, password: string }
    ) {
      // eslint-disable-next-line prefer-const
      let { username, password } = userInfo
      username = username.trim()
      await UserAction.loginRequest({ username, password }).then((res: any) => {
        if (res?.code === 200 && res.data.accessToken) {
          setCookie(res.data.accessToken)
        }
      }).catch((err: any) => {
        console.log('err', err)
      })
    },
    setLogout ({ commit }: ActionContext<AppState, RootStateTypes>) {
      removeCookie()
      resetRouter()
    },
    setUserInfo ({ commit }: ActionContext<AppState, RootStateTypes>) {
      return new Promise<void>((resolve, reject) => {
        UserAction.getUserInfo()
          .then((res: any) => {
            if (res.data) {
              const { data } = res
              commit('SET_USER_INFO', {
                id: data.id,
                role: data.role,
                roleName: data.roleName,
                userName: data.userName,
                email: data.email
              })
              resolve()
            } else {
              reject(new Error('用户信息获取失败'))
            }
          })
          .catch((err) => {
            const msg = err.message || '请求异常'
            ElMessage.error(msg)
            reject(err)
          })
      })
    },
    setUserPermission ({ commit, state }: ActionContext<AppState, RootStateTypes>) {
      return new Promise<any>((resolve, reject) => {
        UserAction.getUserPermission({
          userId: state.userInfo?.id
        })
          .then((res: any) => {
            if (res.data) {
              const { data } = res
              const { list } = data
              // const result = {
              //   menu: list,
              //   map: list,
              //   routes: list,
              // }
              // commit('SET_MENU_LIST', result.menu)
              // commit('SET_MENU_MAP', result.map)
              const { routes } = handleAddRoute(list)
              commit('SET_ADD_ROUTERS', routes)
              resolve(routes)
            } else {
              reject(new Error('用户菜单列表获取失败'))
            }
          })
          .catch((err: any) => {
            const msg = err.message || '用户菜单列表获取失败'
            ElMessage.error(msg)
            reject(err)
          })
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setRemoveToken ({ commit, state }: ActionContext<AppState, RootStateTypes>) {
      removeCookie()
      commit('SET_USER_INFO', '')
    }
  }
}
export default appModule
