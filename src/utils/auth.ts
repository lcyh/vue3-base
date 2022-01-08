import Cookie, { CookieAttributes } from 'js-cookie'

const COOKIE_KEY = 'SESSDATA'

// 获取cookie值
export const getCookie = (name?: string) => {
  const cookieName = name || COOKIE_KEY
  return Cookie.get(cookieName)
}
// 设置新的cookie，默认浏览器关闭时移除
export const setCookie = (value: string, config?: CookieAttributes) => {
  Cookie.set(COOKIE_KEY, value, config)
}
// 删除cookie
export const removeCookie = (name?: string, config?: CookieAttributes) => {
  const cookieName = name || COOKIE_KEY
  Cookie.remove(cookieName, config)
}
