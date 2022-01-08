/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { getCookie } from '@/utils/auth'
import router from '@/router'

// 返回数据格式
export interface ResponseData<T> {
  code: number
  data: T
  message: string
}

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
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
      // 兼容返回的是二进制文件
      if (response.config.responseType === 'blob') {
        return response
      }
      if (code === 200 || code === 0) {
        return response
      }
      if (code === -101) {
        // 用户未登录
        router.replace('/login')
      }
      if (code === 403) {
        // 用户无权限
        router.replace('/403')
      }
      return Promise.reject(response)
    }
    return Promise.reject(response)
  },
  (error: any) => {
    // 判断请求异常信息中是否含有超时timeout/Network字符串
    if (error.message.includes('timeout') || error.message.includes('Network')) {
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
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
