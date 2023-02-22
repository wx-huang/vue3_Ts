import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { WXResquestInterceptors, WXResquestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true

// 创建axios类 方便实例化多个
class WXRequest {
  instance: AxiosInstance
  interceptors?: WXResquestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: WXResquestConfig) {
    // 1、创建axios实例
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 3、初始化拦截器
    this.interceptors = config.interceptors

    // 一、局部拦截器（每个实例）
    // 4、添加请求拦截方法
    this.instance.interceptors.request.use(this.interceptors?.resquestInterceptors, this.interceptors?.resquestInterceptorsCatch)

    // 5、添加响应拦截方法
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptors, this.interceptors?.responseInterceptorsCatch)

    // 二、全局拦截器（所有实例）
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局拦截器 请求成功', this.showLoading)

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中，请稍后.....',
            background: 'rgba(0,0,0,0.3)'
          })
        }
        return config
      },
      (err) => {
        // console.log('全局拦截器 请求失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局拦截器 响应成功')

        this.loading?.close()
        return res
      },
      (err) => {
        // console.log('全局拦截器 响应失败')
        this.loading?.close()
        return err
      }
    )
  }

  // 2、axios请求接口方法
  request<T>(config: WXResquestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 三、单独的拦截器 （实例中单独的接口）
      if (config.interceptors?.resquestInterceptors) {
        config = config.interceptors.resquestInterceptors(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // console.log('请求方法res', res)
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }

          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  //查
  get<T>(config: WXResquestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  //增
  post<T>(config: WXResquestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  // 删
  delete<T>(config: WXResquestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  //改 所有
  put<T>(config: WXResquestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  //改 局部
  patch<T>(config: WXResquestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default WXRequest
