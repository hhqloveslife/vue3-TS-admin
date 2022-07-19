<template>
  <div class="line-echart">
    <base-echart :options="option"> </base-echart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  xLables: string[]
  values: any[]
}>()
const option: any = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLables
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
