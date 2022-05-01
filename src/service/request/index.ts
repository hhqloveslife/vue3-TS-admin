import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { HQRequestInterceptors, HQRequestConfig } from './interceptorsType'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

//封装axios主体
class HQRequest {
  //创建一个变量用来保存对象
  instance: AxiosInstance
  interceptors?: HQRequestInterceptors
  loading?: LoadingInstance
  showLoading?: boolean

  constructor(config: HQRequestConfig) {
    //传入一个config用于创建一个axios实例，以确保每次创建出的实例都不一样，不会互相干扰
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true

    //请求拦截器,发送请求时需要手动传参，如果不传则没有
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    //响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有实例都有的拦截器，不用传参也会存在的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器：请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中'
          })
        }
        return config
      },
      (error) => {
        // console.log('所有实例都有的拦截器：请求失败拦截')
        return error
      }
    )
    //返回结果时会先触发下面这个拦截器，所以如果里面不返回数据的话，是没有数据的
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器：响应成功拦截')

        //设置0.5s后将loading移除，为了让用户体验更好，否则一闪而过
        setTimeout(() => {
          this.loading?.close()
        }, 500)
        //将数据返回出去
        const data = res.data
        // if (data.returnCode === '-1001') {
        //   console.log('请求失败')
        // } else {
        //   return data
        // }

        return data
      },
      (error) => {
        // console.log('所有实例都有的拦截器：响应失败拦截')
        return error
      }
    )
  }

  request<T = any>(config: HQRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (!config.showLoading) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          //将showloading设回true，下一个请求就不会受到影响
          this.showLoading = true
          this.loading?.close()

          resolve(res)
        })
        .catch((err) => {
          //将showloading设回true，下一个请求就不会受到影响
          this.showLoading = true
          this.loading?.close()
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HQRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HQRequest
