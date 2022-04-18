import type { AxiosRequestConfig, AxiosResponse } from "axios";

//axios拦截器接口
export interface HQRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}
//定义一个接口，继承axios里的配置，再新增一个自定义的配置，就是上面的接口 HQRequestInterceptors
export interface HQRequestConfig extends AxiosRequestConfig {
  interceptors?: HQRequestInterceptors;
}
