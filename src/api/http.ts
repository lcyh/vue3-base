/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { getCookie } from '@/utils/auth'
import router from '@/router'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('process.env.VUE_APP_API_BASE_URL', process.env.VUE_APP_API_BASE_URL)

// 返回数据格式
export interface ResponseData<T> {
  code: number
  data: T
  message: string
}

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : '',
  timeout: 10000,
  withCredentials: true
})

// 检查权限
export function validateAuth (): boolean {
  const token = getCookie()
  if (!token) {
    return false
  }
  instance.defaults.headers.common.Authorization = token
  return true
}

// 添加请求时拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const isNeedAuth = config.auth || false
  if (isNeedAuth) {
    const hasToken = validateAuth()
    if (!hasToken) {
      const error = new Error('暂无权限')
      return Promise.reject(error)
    }
  }
  return config
})

// 添加响应时的拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      const { code } = response.data
      if (code === 200 || code === 1 || code === 0) {
        return response
      }
      // if (code === 0) {
      //   router.replace('/login')
      // }
      if (code === 403) {
        // 用户无权限
        router.replace('/403')
      }
      return Promise.reject(response)
    }
    return Promise.reject(response)
  },
  (error: any) => Promise.reject(error)
)

export default class Http {
  // 封装 GET、POST、PATCH、PUT、DELETE 等请求的配置参数
  static async create (config: AxiosRequestConfig): Promise<ResponseData<any>> {
    const res = await instance(config)
    const result: ResponseData<any> = this.successResponse(res)
    return Promise.resolve(result)
  }

  // 返回数据格式
  private static successResponse (res: AxiosResponse) {
    return {
      code: res.data.code || res.status,
      data: res.data.data || res.data,
      message: res.data.message || res.statusText
    }
  }
}
