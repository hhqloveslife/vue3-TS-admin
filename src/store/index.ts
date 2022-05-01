import { createStore } from 'vuex'
import login from './loginModule/login'
import IRootState from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 0
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLoginData')
}

export default store
