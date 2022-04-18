import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HQRequestInterceptors, HQRequestConfig } from './interceptorsType'

//封装axios主体
class HQRequest {
  //创建一个变量用来保存对象
  instance: AxiosInstance
  interceptors?: HQRequestInterceptors

  constructor(config: HQRequestConfig) {
    //传入一个config用于创建一个axios实例，以确保每次创建出的实例都不一样，不会互相干扰
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

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
        console.log('所有实例都有的拦截器：请求成功拦截')
        return config
      },
      (error) => {
        console.log('所有实例都有的拦截器：请求失败拦截')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        console.log('所有实例都有的拦截器：响应成功拦截')
        return config
      },
      (error) => {
        console.log('所有实例都有的拦截器：响应失败拦截')
        return error
      }
    )
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res.data)
    })
  }
}

export default HQRequest
