import { Module } from 'vuex'

import { ILoginState } from './type'
import { IRootState } from '../type'
import { IAccount } from '@/service/login/type'

import localCache from '@/utils/cache'

import { mapMenuToRoutes } from '@/utils/map-menus'
import router from '@/router'

import { accountLoginRequest, requestUserInfoById, requestUserMenus } from '@/service/login/login'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 1、userMenus => routes 映射
      const routes = mapMenuToRoutes(userMenus)

      // 2、routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    // 登录
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1、获取token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult?.data || {}
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2、获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3、获取权限树
      const userMenusResult = await requestUserMenus(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4、路由跳转
      router.push('/main')
    },

    // 退出
    accountLoginOut() {
      localCache.clearCache()
      router.push('/')
    },

    // vuex数据持久化
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
