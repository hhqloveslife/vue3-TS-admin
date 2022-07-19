<template>
  <div class="map-echart"><base-echart :options="option"></base-echart></div>
</template>

<script setup lang="ts">
import BaseEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import { convertData } from '../utils/convert-data'
import { IDataType } from '../types'

const props = defineProps<{
  mapData: IDataType[]
}>()
const option: any = computed(() => {
  return {
    backgroundColor: '#fff',
    legend: {
      orient: 'vertical',
      right: 20,
      top: 10,
      data: ['商品销量'],
      textStyle: {
        color: '#000000'
      }
    },
    visualMap: {
      min: 0,
      max: 30000,
      left: 0,
      bottom: 0,
      calculable: false,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#000000'
      }
    },
    geo: {
      map: 'china',
      roam: 'scale',
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: 'rgb(19, 91, 153)',
          borderColor: 'rgb(9, 54, 95)'
        },
        emphasis: {
          areaColor: 'rgb(10, 105, 187)'
        }
      }
    },
    series: [
      {
        name: '商品销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
    // dataset: {source: mapdata}
  }
})
</script>

<style scoped></style>
