<template>
  <div class="base-echarts">
    <div ref="divRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { useEcharts } from '../hooks/useEcharts'
type EChartsOption = echarts.EChartsOption

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  { width: '100%', height: '400px' }
)
const divRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEcharts(divRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
