import WXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

// axios实例封装
const wxRequest = new WXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    resquestInterceptors: (config) => {
      //token 一般从浏览器缓存或者vuex中取出
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    resquestInterceptorsCatch: (error) => {
      return error
    },
    responseInterceptors: (res) => {
      // 接口成功 状态拦截
      const data = res.data
      if (data.returnCode === '-1001') {
        console.log('returnCode-1001')
      } else {
        return data
      }
    },
    responseInterceptorsCatch: (error) => {
      // 接口失败 状态拦截
      // if (error.response.status === 404) {
      // }
      return error
    }
  }
})

export default wxRequest
