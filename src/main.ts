import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import { globalRegister } from './global'
import { setupStore } from '@/store'

import 'normalize.css'
import '@/assets/css/index.less'

import * as Icons from '@element-plus/icons-vue'

// import wxResquest from './service'
// wxResquest.request({
//   url: 'http://httpbin.org/post',
//   method: 'POST',
//   interceptors: {
//     resquestInterceptors: (config) => {
//       console.log('单独的请求拦截器')
//       return config
//     },
//     responseInterceptors: (res) => {
//       console.log('单独的响应拦截')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// wxResquest
//   .post<DataType>({
//     url: 'http://httpbin.org/post',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res, '---res')
//   })

const app = createApp(App)
globalRegister(app) //全局注册方法
setupStore() //vuex数据持久化

app.use(router)
app.use(store)
app.mount('#app')

// 注册全局组件 icon
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
