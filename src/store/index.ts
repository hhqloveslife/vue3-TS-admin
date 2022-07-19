import { createStore } from 'vuex'
import login from './loginModule/login'
import system from './main/system/system'
import { IRootState } from './types'
import { getPageListData } from '@/service/main/system/system'
import dashboard from './main/anaylsis/dashboard'

const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 0,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //获取部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      commit('changeEntireDepartment', departmentList)

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireRole', roleList)

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLoginData')
}

export default store
