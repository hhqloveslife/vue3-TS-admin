<template>
  <div class="page-echarts">
    <base-echart :options="option"> </base-echart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import { IDataType } from '../types'

const props = defineProps<{
  pieData: IDataType[]
}>()
const option: any = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
