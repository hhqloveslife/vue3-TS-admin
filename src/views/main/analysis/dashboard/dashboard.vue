<template>
  <div class="dashboard">
    <el-row :gutter="15">
      <el-col :span="8">
        <my-card header="分类商品数量（饼图）"
          ><pie-echart :pieData="categoryGoodsCount"></pie-echart></my-card
      ></el-col>
      <el-col :span="8">
        <my-card header="不同城市商品销量"
          ><map-echart :mapData="addressGoodsSale"></map-echart></my-card
      ></el-col>
      <el-col :span="8">
        <my-card header="分类商品数量（玫瑰图）"
          ><rose-echart :roseData="categoryGoodsCount"></rose-echart></my-card
      ></el-col>
    </el-row>
    <el-row :gutter="15" class="content-row">
      <el-col :span="12">
        <my-card header="分类商品的销量"
          ><line-echart v-bind="categoryGoodsSale"></line-echart></my-card
      ></el-col>
      <el-col :span="12">
        <my-card header="分类商品的收藏"
          ><bar-echart
            v-bind="categoryGoodsFavor"
          ></bar-echart></my-card></el-col
    ></el-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import MyCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'
import { computed } from 'vue'

const store = useStore()
store.dispatch('dashboard/getDashboardDataAction')

const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item: any) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})

const categoryGoodsSale = computed(() => {
  const xLables: string[] = []
  const values: any[] = []
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLables.push(item.name)
    values.push(item.goodsCount)
  }
  return { xLables, values }
})

const categoryGoodsFavor = computed(() => {
  const xLables: string[] = []
  const values: any[] = []
  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
  for (const item of categoryGoodsFavor) {
    xLables.push(item.name)
    values.push(item.goodsFavor)
  }
  return { xLables, values }
})

const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map((item: any) => {
    return {
      name: item.address,
      value: item.count
    }
  })
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
