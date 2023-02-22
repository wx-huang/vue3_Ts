import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { ISystemState } from './type'

import { requestUserList } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any): Promise<any> {
      // 1、获取url及入参
      const { pageName, queryInfo } = payload
      const pageUrl = `/${pageName}/list`

      // 2、发送请求
      const pageResult = await requestUserList(pageUrl, queryInfo)

      // 3、获取数据 提交
      const { list, total } = pageResult.data
      const pageNameUp = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      console.log(`change${pageNameUp}List`, list)
      commit(`change${pageNameUp}List`, list)
      commit(`change${pageNameUp}Count`, total)
    }
  }
}

export default systemModule
