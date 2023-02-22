import { createStore } from 'vuex'

import login from './login/index'
import system from './main/system/index'

import { IRootState } from './type'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: '你好，詹姆斯',
      age: 12
    }
  },
  mutations: {
    changeName(state) {
      state.name = '科比'
    }
  },
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
