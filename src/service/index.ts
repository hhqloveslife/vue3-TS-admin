//service统一出口文件
import HQRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const hqRequest = new HQRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // interceptors: {
  //   requestInterceptor: (config) => {
  //     console.log("请求成功的响应");
  //     return config;
  //   },
  //   requestInterceptorCatch: (error) => {
  //     console.log("请求失败的响应");
  //     return error;
  //   },
  //   responseInterceptor: (config) => {
  //     console.log("响应成功的拦截");
  //     return config;
  //   },
  //   responseInterceptorCatch: (error) => {
  //     console.log("响应失败的拦截");
  //     return error;
  //   },
  // },
});

export default hqRequest;
