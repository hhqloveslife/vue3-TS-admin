import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '@/store/types'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModuel: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },

  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)

      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)

      const categoryGoodsCountFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsCountFavor.data)

      const addressGoodsSalesult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSalesult.data)
    }
  }
}

export default dashboardModuel
