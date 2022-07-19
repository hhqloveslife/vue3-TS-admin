<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #img="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          hide-on-click-modal
          close-on-press-escape
          :initial-index="4"
        />
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
