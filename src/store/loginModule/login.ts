import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  userInfoRequestById,
  userMenusRequestById
} from '@/service/login/login'
import { mapMenusToPermissions, mapMenuToRoutes } from '@/utils/map-menus'
import { IAccount } from '@/service/login/type'
import localCache from '@/utils/cache'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
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
      const routes = mapMenuToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      //获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      //发送初始化请求（获取各个list）
      dispatch('getInitialDataAction', null, { root: true })

      //2.获取用户信息
      const userInfoResult = await userInfoRequestById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.获取用户菜单
      const userMenusResult = await userMenusRequestById(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.跳到首页
      router.push('/main')
    },
    loadLocalLoginData({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化请求（获取各个list）
        dispatch('getInitialDataAction', null, { root: true })
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
