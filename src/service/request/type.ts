import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface WXResquestInterceptors<T = AxiosResponse> {
  resquestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  resquestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

export interface WXResquestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WXResquestInterceptors<T>
  showLoading?: boolean
}
