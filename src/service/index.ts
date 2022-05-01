//service统一出口文件
import HQRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const hqRequest = new HQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token
      const token = localCache.getCache('token')
      if (token) {
        // 设置token
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default hqRequest
